const globals = require('globals');

module.exports = {
  parser: '@typescript-eslint/parser', // @typescript-eslint/parser
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
    ecmaVersion: 2022,
    globals: globals.browser,
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: [
    '@typescript-eslint/eslint-plugin', // @typescript-eslint/eslint-plugin
    'prettier', // eslint-plugin-prettier
    'import', // eslint-plugin-import
    'react', // eslint-plugin-react
    'react-hooks', // eslint-plugin-react-hooks
    'react-refresh', // eslint-plugin-react-refresh
  ],
  extends: [
    'eslint:recommended', // eslint
    'plugin:@typescript-eslint/recommended', // @typescript-eslint/eslint-plugin
    'plugin:@typescript-eslint/stylistic', // @typescript-eslint/eslint-plugin
    'plugin:import/recommended', // eslint-plugin-import
    'plugin:import/typescript', // eslint-import-resolver-typescript
    'plugin:react/recommended', // eslint-plugin-react
    'plugin:react-hooks/recommended', // eslint-plugin-react-hooks
    'plugin:prettier/recommended', // eslint-plugin-prettier, eslint-config-prettier
  ],
  root: true,
  env: {
    node: true,
    browser: true,
    es2022: true,
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': { typescript: true, node: true }, // eslint-plugin-import
  },
  rules: {
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'no-warning-comments': ['warn', { terms: ['todo', 'fixme'], location: 'anywhere' }],
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/consistent-type-definitions': 'warn',
    '@typescript-eslint/no-empty-function': 'warn',
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/naming-convention': ['error', { selector: 'interface', format: ['PascalCase'] }],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
    'import/export': 'warn',
    'import/no-deprecated': 'warn',
    'import/no-empty-named-blocks': 'warn',
    'import/no-extraneous-dependencies': 'warn',
    'import/no-mutable-exports': 'warn',
    'import/no-unused-modules': ['warn', { missingExports: false, unusedExports: true }],
    'import/no-absolute-path': 'off',
    'import/no-cycle': 'error',
    'import/no-self-import': 'error',
    'import/no-useless-path-segments': 'warn',
    'import/no-named-as-default-member': 'off',
    'import/consistent-type-specifier-style': 'warn',
    'import/exports-last': 'warn',
    'import/newline-after-import': 'warn',
    'import/no-default-export': 'off',
    'import/no-unassigned-import': 'off',
    'react/react-in-jsx-scope': 'off',
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
  },
  reportUnusedDisableDirectives: true,
};
