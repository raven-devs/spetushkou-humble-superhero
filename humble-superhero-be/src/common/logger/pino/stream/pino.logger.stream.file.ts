import fs, { WriteStream } from 'fs';

export const PinoLoggerStreamFile = (filePath: string): WriteStream => {
  return fs.createWriteStream(filePath, { flags: 'a' });
};
