import { HttpError } from '../httpClient/HttpError';

export type Exception = Error | HttpError | null;
