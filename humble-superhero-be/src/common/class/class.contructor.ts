export interface ClassConstructor<T> {
  // eslint-disable-next-line @typescript-eslint/prefer-function-type
  new (...args: any[]): T;
}
