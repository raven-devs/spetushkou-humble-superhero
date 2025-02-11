function production(value: unknown): boolean {
  return value === 'production';
}

export const EnvSatisfy = {
  production,
};
