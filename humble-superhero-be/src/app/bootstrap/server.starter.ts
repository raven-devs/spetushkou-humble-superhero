import { INestApplication } from '@nestjs/common';

async function startHttp(app: INestApplication, port: number): Promise<void> {
  await app.listen(port);
}

export const ServerStarter = {
  startHttp,
};
