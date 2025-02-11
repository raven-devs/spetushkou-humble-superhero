import { INestApplication, ValidationPipe } from '@nestjs/common';
import { TransformerOptions } from '../../common/transformer/transformer.options';
import { ValidatorOptions } from '../../common/validator/validator.options';

export function useValidation(app: INestApplication): void {
  app.useGlobalPipes(
    new ValidationPipe({
      ...ValidatorOptions,
      transform: true,
      transformOptions: {
        ...TransformerOptions,
      },
    }),
  );
}
