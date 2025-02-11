import { ClassConstructor, instanceToPlain, plainToInstance } from 'class-transformer';
import { JsonValue } from '../json/json.value';
import { TransformerOptions } from './transformer.options';

const toInstance = <T>(Cls: ClassConstructor<T>, plainObj: Record<string, JsonValue>): T => {
  return plainToInstance<T, Record<string, JsonValue>>(Cls, plainObj, {
    ...TransformerOptions,
  });
};

const toPlain = <T>(instance: T): Record<string, JsonValue> => {
  return instanceToPlain<T>(instance);
};

export const Transformer = {
  toInstance,
  toPlain,
};
