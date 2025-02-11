import { TransportMultiOptions } from 'pino';
import { LoggerBasePath } from '../../logger.base.path';
import { PinoLoggerTransportConsole } from './pino.logger.transport.console';
import { PinoLoggerTransportFile } from './pino.logger.transport.file';

export const PinoLoggerTransportMulti = (nodeEnv?: string): TransportMultiOptions => {
  return {
    targets: [
      {
        // console log for 'info' level logs
        level: 'info',
        ...PinoLoggerTransportConsole(nodeEnv),
      },
      {
        // file log for 'error' level logs
        level: 'error',
        ...PinoLoggerTransportFile(`${LoggerBasePath}/log-error.log`),
      },
    ],
  };
};
