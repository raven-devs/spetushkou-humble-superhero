import { Transform, Writable } from 'stream';

export const PinoLoggerStream = (): Writable => {
  const customStream = new Writable({
    write(chunk, encoding, callback): void {
      console.debug('Custom stream received log:', chunk.toString());

      callback();
    },
  });

  const transformStream = new Transform({
    objectMode: true,
    transform(chunk, encoding, callback): void {
      const log = JSON.parse(chunk.toString());
      log.customField = 'This is a custom field';
      this.push(JSON.stringify(log) + '\n');

      callback();
    },
  });

  transformStream.pipe(customStream);

  return transformStream;
};
