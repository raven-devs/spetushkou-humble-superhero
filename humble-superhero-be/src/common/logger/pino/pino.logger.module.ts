import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import { PackageJson } from '../../packageJson/package.json';
import { PinoLoggerController } from './pino.logger.controller';
import { PinoLoggerOptions } from './pino.logger.options';

@Module({
  imports: [
    LoggerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const nodeEnv = configService.get<string>('NODE_ENV');
        const packageJsonPath = configService.getOrThrow<string>('APP_PACKAGE_JSON_PATH');
        const appName = await PackageJson.getAppName(packageJsonPath);
        const appVersion = await PackageJson.getAppVersion(packageJsonPath);
        const redactPaths = ['password'];

        const options = PinoLoggerOptions.get({ nodeEnv, appName, appVersion, redactPaths });
        const logger = {
          pinoHttp: options,
        };

        return logger;
      },
    }),
  ],
  controllers: [PinoLoggerController],
})
export class PinoLoggerModule {}
