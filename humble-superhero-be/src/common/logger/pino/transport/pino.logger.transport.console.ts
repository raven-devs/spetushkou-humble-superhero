import { TransportTargetOptions } from 'pino';
import { EnvSatisfy } from '../../../env/env.satisfy';

export const PinoLoggerTransportConsole = (nodeEnv?: string): TransportTargetOptions => {
  // in production render to stdout without formatting
  if (EnvSatisfy.production(nodeEnv)) {
    return {
      target: 'pino/file',
      options: {
        destination: 1, // 1 for stdout, 2 for stderr
      },
    };
  }

  // in non-prduction apply formatting
  return {
    target: 'pino-pretty', // pino-pretty module
    options: {
      singleLine: true,
      ignore: 'pid,hostname',
    },
  };
};
