import { TransportTargetOptions } from 'pino';

export const PinoLoggerTransportCustom = (): TransportTargetOptions => {
  return {
    target:
      '/Users/spetushkou/Playground/nestjs/nestjs-middleware1/src/common/logger/pino/transport/pino.logger.transport.custom.impl.mjs',
    options: {
      destination: './logs/log.log',
      sync: false,
    },
  };
};
