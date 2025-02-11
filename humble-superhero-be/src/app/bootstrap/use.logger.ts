import { INestApplication, LoggerService } from '@nestjs/common';
import { PinoLogger } from '../../common/logger/pino/pinno.logger';
import { PinoLoggerErrorInterceptor } from '../../common/logger/pino/pino.logger.error.interceptor';

export function useLogger(app: INestApplication): LoggerService {
  const logger = app.get(PinoLogger);
  app.useLogger(logger);

  app.useGlobalInterceptors(new PinoLoggerErrorInterceptor());

  return logger;
}
