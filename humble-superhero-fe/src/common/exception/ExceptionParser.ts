import { AxiosError } from 'axios';

const parse = (error: unknown): Error => {
  if (error instanceof AxiosError) {
    const { response } = error;
    const message = response?.data?.message ?? 'Unknown error';
    return new Error(message);
  }

  if (error instanceof Error) {
    return error;
  }

  return new Error('Unknown error');
};

export const ExceptionParser = {
  parse,
};
