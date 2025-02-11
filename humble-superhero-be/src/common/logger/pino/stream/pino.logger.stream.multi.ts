import fs from 'fs';
import { multistream, MultiStreamRes } from 'pino';
import { LoggerBasePath } from '../../logger.base.path';

export const PinoLoggerStreamMulti = (): MultiStreamRes<string> => {
  const streamFileAll = fs.createWriteStream(`${LoggerBasePath}/log.log`, { flags: 'a' });
  const streamFileError = fs.createWriteStream(`${LoggerBasePath}/log-error.log`, { flags: 'a' });

  const streams = [
    { stream: streamFileAll },
    { level: 'info', stream: process.stdout },
    { level: 'error', stream: streamFileError },
    { level: 'error', stream: process.stderr },
  ];

  return multistream(streams);
};
