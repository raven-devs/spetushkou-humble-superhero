import Joi from 'joi';

interface AppConfig {
  APP_NAME: string;
  APP_PORT: number;
  APP_PACKAGE_JSON_PATH: string;
}

export const AppConfigValidationSchema = (): Joi.ObjectSchema<AppConfig> =>
  Joi.object({
    APP_NAME: Joi.string().required(),
    APP_PORT: Joi.number().required(),
    APP_PACKAGE_JSON_PATH: Joi.string().required(),
  });
