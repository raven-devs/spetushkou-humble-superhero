import { IncomingMessage, ServerResponse } from 'http';
import pino, { LevelWithSilent } from 'pino';
import { Options } from 'pino-http';
import { EnvSatisfy } from '../../env/env.satisfy';
import { GitCommitHashService } from '../../git/git.commit.hash.service';
import { HttpMethodSatisfy } from '../../httpMethod/http.method.satisfy';
import { HttpStatusCodeSatisfy } from '../../httpStatusCode/http.status.code.satisfy';
import { PinoLoggerTransportConsole } from './transport/pino.logger.transport.console';

interface Props {
  enabled?: boolean;
  nodeEnv?: string;
  appName: string;
  appVersion: string;
  redactPaths?: string[];
}

interface MetaBindings {
  hostname: string;
  pid: number;
  node_version: string;
  app_version: string;
  commit_hash: string;
}

const NESTED_KEY = 'payload';
const CENSOR = '[Redacted]';

function get({ enabled = true, nodeEnv, appName, appVersion, redactPaths = [] }: Props): Options {
  return {
    // set to false to disable logging
    enabled,

    // the name of the logger
    name: appName,

    // any objects that are logged to be placed under a key whose name is the value of nestedKey
    nestedKey: NESTED_KEY,

    // set to true to logs newline delimited JSON with \r\n instead of \n.
    crlf: false,

    // timestamp format
    timestamp: pino.stdTimeFunctions.isoTime,

    // custom request id (RequestIdMiddleware should be enabled), will be injected as `req.id`
    genReqId: function (req): string {
      return 'requestId' in req && req.requestId ? (req.requestId as string) : '';
    },

    // the minimum log level to log: (lower) fatal -> error -> warn -> info -> debug -> trace (higher) | silent
    level: EnvSatisfy.production(nodeEnv) ? 'info' : 'trace',

    // http logs for request, response, error
    customLogLevel: function (
      req: IncomingMessage,
      res: ServerResponse<IncomingMessage>,
      err?: Error,
    ): LevelWithSilent {
      const statusCode = res.statusCode;

      if (err) {
        // log error
        return 'error';
      } else if (HttpStatusCodeSatisfy.serverError(statusCode)) {
        // log request / response if 'server error'
        return 'error';
      } else if (HttpStatusCodeSatisfy.clientError(statusCode)) {
        // log request / response if 'client error'
        return 'warn';
      } else if (
        HttpStatusCodeSatisfy.redirection(statusCode) ||
        HttpStatusCodeSatisfy.succesful(statusCode) ||
        HttpStatusCodeSatisfy.informational(statusCode)
      ) {
        // do not log request / response if 'redirect', 'success', 'info'
        return 'silent';
      }

      // log request / response in all other cases
      return 'info';
    },

    // redact options
    redact: {
      paths: redactPaths,
      censor: CENSOR,
      remove: false,
    },

    // do not log request body of POST / PUT / PATCH requests in prod
    // (customLogLevel prop should return log level 'info' for HttpStatusCodeSatisfy.succesful() code)
    serializers: {
      req(req): Request {
        if (EnvSatisfy.production(nodeEnv)) {
          return req;
        }

        if (HttpMethodSatisfy.mutationWithBody(req.method)) {
          return req;
        }

        // include request body into the log
        req.body = req.raw?.body;

        return req;
      },
    },

    formatters: {
      bindings: function (bindings): MetaBindings {
        return {
          ...bindings,
          hostname: bindings.hostname,
          pid: bindings.pid,
          node_version: process.version,
          app_version: appVersion,
          commit_hash: GitCommitHashService.get(),
        };
      },
      level: (label): { level: string } => {
        return { level: label.toUpperCase() };
      },
    },

    // usefull for implementing a custom rate limiter or a custom log sampling
    // hooks: {
    //   logMethod(inputArgs, method, level): void {
    //     // example: if log level is 'fatal' then do not log
    //     if (level === 60) {
    //       return;
    //     }

    //     // required to return this
    //     return method.apply(this, inputArgs);
    //   },
    // },

    // important: 'stream' and 'transport' options cannot be used together
    // writing logs to stdout, files, or custom streams
    // runs in the main thread
    // example: Custom writable streams
    // stream: PinoLoggerStreamFileRotate(),

    // important: 'stream' and 'transport' options cannot be used together
    // sending logs to external services, transforming logs
    // spawns a worker thread for non-blocking logging
    // examples: pino-pretty, WebSocket, HTTP endpoints
    // transport: PinoLoggerTransportConsole(nodeEnv),
    transport: PinoLoggerTransportConsole(),
  };
}

export const PinoLoggerOptions = {
  get,
};
