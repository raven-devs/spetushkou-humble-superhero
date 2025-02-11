module.exports = {
  parser: '@typescript-eslint/parser', // @typescript-eslint/parser
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint/eslint-plugin', // @typescript-eslint/eslint-plugin
    'prettier', // eslint-plugin-prettier
    'jest', // eslint-plugin-jest
    'import', // eslint-plugin-import
    'custom-rules', // eslint-plugin-custom-rules
  ],
  extends: [
    'eslint:recommended', // eslint
    'plugin:@typescript-eslint/recommended', // @typescript-eslint/eslint-plugin
    'plugin:@typescript-eslint/stylistic', // @typescript-eslint/eslint-plugin
    'plugin:jest/recommended', // eslint-plugin-jest
    'plugin:jest/style', // eslint-plugin-jest
    'plugin:import/recommended', // eslint-plugin-import
    'plugin:import/typescript', // eslint-import-resolver-typescript
    'plugin:prettier/recommended', // eslint-plugin-prettier, eslint-config-prettier
  ],
  root: true,
  env: {
    node: true,
    browser: false,
    jest: true,
    es2022: true,
  },
  settings: {
    jest: {
      version: require('jest/package.json').version,
    },
    'import/resolver': { typescript: true, node: true }, // eslint-plugin-import
  },
  rules: {
    'no-console': ['warn', { allow: ['warn', 'error', 'debug'] }],
    'no-warning-comments': ['warn', { terms: ['todo', 'fixme'], location: 'anywhere' }],
    'no-case-declarations': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/consistent-type-definitions': 'warn',
    '@typescript-eslint/no-empty-function': 'warn',
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/naming-convention': ['error', { selector: 'interface', format: ['PascalCase'] }],
    '@typescript-eslint/explicit-function-return-type': 'warn',
    '@typescript-eslint/explicit-module-boundary-types': 'warn',
    '@typescript-eslint/no-explicit-any': 'warn',
    'import/export': 'warn',
    'import/no-deprecated': 'warn',
    'import/no-empty-named-blocks': 'warn',
    'import/no-extraneous-dependencies': 'warn',
    'import/no-mutable-exports': 'warn',
    'import/no-unused-modules': ['off', { missingExports: true, unusedExports: true }],
    'import/no-absolute-path': 'error',
    'import/no-cycle': 'error',
    'import/no-self-import': 'error',
    'import/no-useless-path-segments': 'warn',
    'import/no-named-as-default-member': 'off',
    'import/consistent-type-specifier-style': 'warn',
    'import/exports-last': 'warn',
    'import/newline-after-import': 'warn',
    'import/no-default-export': 'warn',
    'import/no-unassigned-import': 'error',
    'custom-rules/no-libs-common-import': 'error',
  },
  reportUnusedDisableDirectives: true,
};
