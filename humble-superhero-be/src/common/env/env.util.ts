function isProduction(): boolean {
  return process.env.NODE_ENV === 'production';
}

export const EnvUtil = {
  isProduction,
};
