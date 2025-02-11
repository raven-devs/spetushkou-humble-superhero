module.exports = {
  preset: 'ts-jest',
  rootDir: './src',
  testEnvironment: 'node',
  coverageDirectory: '../coverage',
  collectCoverageFrom: ['**/*.{js,jsx,ts,tsx}'],
  coverageReporters: ['html'],
  moduleFileExtensions: ['js', 'ts', 'json'],
  errorOnDeprecated: true,
  verbose: false,
};
