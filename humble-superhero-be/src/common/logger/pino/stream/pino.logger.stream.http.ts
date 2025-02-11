import { Writable } from 'stream';
import { Mime } from '../../../mime/mime';

export const PinoLoggerStreamHttp = (): Writable => {
  const httpStream = new Writable({
    write(chunk, encoding, callback): void {
      fetch('http://localhost:3000/test-logger/log-stream-http', {
        method: 'POST',
        headers: { 'Content-Type': Mime.json },
        body: chunk,
      })
        .then((response) => {
          if (!response.ok) {
            callback(new Error(`HTTP request failed with status ${response.status}`));
          } else {
            callback(null);
          }
        })
        .catch((error) => {
          callback(error);
        });
    },
  });

  return httpStream;
};
