import { validateSync } from 'class-validator';
import { ValidatorError } from './validator.error';
import { ValidatorOptions } from './validator.options';

const validate = <T extends object>(input: T): ValidatorError<T>[] => {
  const errors = validateSync(input, {
    ...ValidatorOptions,
  });

  const results = errors.map((error) => {
    const { property, constraints } = error;
    const messages: string[] = constraints ? Object.values(constraints) : [];
    const validateError: ValidatorError<T> = {} as ValidatorError<T>;
    validateError[property as keyof T] = messages;
    return validateError;
  });

  return results;
};

export const Validator = {
  validate,
};
