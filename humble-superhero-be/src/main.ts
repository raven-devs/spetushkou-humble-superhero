import { ConfigService } from '@nestjs/config';
import { AppFactory } from './app/bootstrap/app.factory';
import { ServerStarter } from './app/bootstrap/server.starter';
import { useLogger } from './app/bootstrap/use.logger';
import { useShutdownHooks } from './app/bootstrap/use.shutdown.hooks';
import { useValidation } from './app/bootstrap/use.validation';

async function bootstrap(): Promise<void> {
  const app = await AppFactory.createExpress({
    origin: ['http://localhost:5173'],
    methods: 'GET,HEAD,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
    exposedHeaders: 'Content-Type,Authorization',
    credentials: true,
    maxAge: 3600,
  });

  const config = app.get(ConfigService);

  useLogger(app);
  useValidation(app);
  useShutdownHooks(app);

  await ServerStarter.startHttp(app, config.getOrThrow<number>('APP_PORT'));
}

bootstrap();
