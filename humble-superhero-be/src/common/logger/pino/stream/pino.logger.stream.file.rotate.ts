import * as rfs from 'rotating-file-stream';
import { Writable } from 'stream';
import { LoggerBasePath } from '../../logger.base.path';

type RotateSize = `${number}${'B' | 'K' | 'M' | 'G'}`; // Bites, KiloBites, MegaBytes, GigaBytes
type RotateInterval = `${number}${'s' | 'm' | 'h' | 'd'}`; // seconds, minutes, hours, days

interface FileRotateOptions {
  path?: string;
  interval?: RotateInterval;
  size?: RotateSize;
  teeToStdout?: boolean;
}

export const PinoLoggerStreamFileRotate = (options?: FileRotateOptions): Writable => {
  const { path = LoggerBasePath, interval = '1d', size = '10M', teeToStdout = false } = options ?? {};

  const stream = rfs.createStream('log.log', {
    path, // logs dir
    interval, // rotate based on time interval
    size, // rotate based on file size
    teeToStdout, // write to stdout
  });

  return stream;
};
