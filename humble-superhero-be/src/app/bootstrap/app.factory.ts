import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from '../app.module';

async function createExpress(corsOptions: CorsOptions): Promise<NestExpressApplication> {
  return await NestFactory.create<NestExpressApplication>(AppModule, {
    abortOnError: false,
    bufferLogs: true,
    forceCloseConnections: true,
    cors: corsOptions,
  });
}

export const AppFactory = {
  createExpress,
};
