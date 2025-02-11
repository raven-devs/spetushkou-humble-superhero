import { APP_FILTER } from '@nestjs/core';
import { ExceptionGlobalFilter } from './exception.global.filter';

export const ExceptionGlobalFilterProvider = {
  provide: APP_FILTER,
  useClass: ExceptionGlobalFilter,
};
