export type ValidatorError<T> = { [key in keyof T]: string[] };
