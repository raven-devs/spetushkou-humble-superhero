import { INestApplication } from '@nestjs/common';

export function useShutdownHooks(app: INestApplication): void {
  app.enableShutdownHooks();
}
