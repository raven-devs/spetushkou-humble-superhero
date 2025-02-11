import { TransportTargetOptions } from 'pino';

export const PinoLoggerTransportFile = (filePath: string): TransportTargetOptions => {
  return {
    target: 'pino/file',
    options: {
      destination: filePath,
      append: true, // appends to the destination file if it exists
      mkdir: true, // automatically create directories
      sync: false, // async logging
    },
  };
};
