import { ClassConstructor } from '../class/class.contructor';
import { JsonValue } from '../json/json.value';
import { Transformer } from '../transformer/transformer';
import { Validator } from '../validator/validator';
import { ValidatorError } from '../validator/validator.error';

interface ResponseSuccess<T extends object> {
  errors: null;
  data: T;
}

interface ResponseError<T extends object> {
  errors: ValidatorError<T>[];
  data: null;
}

const normalize = <T extends object>(
  plainObj: Record<string, JsonValue>,
  Cls: ClassConstructor<T>,
): ResponseSuccess<T> | ResponseError<T> => {
  const obj = Transformer.toInstance(Cls, plainObj);

  const validatorErrors = Validator.validate<T>(obj);
  if (validatorErrors.length !== 0) {
    return { errors: validatorErrors, data: null };
  }

  return { errors: null, data: obj };
};

export const Normalizer = {
  normalize,
};
