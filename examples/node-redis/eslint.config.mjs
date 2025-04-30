import globals from 'globals'

import baseConfig from '../../eslint.config.mjs'

export default [
  {
    ignores: ['**/dist', '**/*.css'],
  },
  ...baseConfig,
  {
    languageOptions: {
      globals: {
        ...globals.es2020,
      },
      parserOptions: {
        project: './tsconfig.json',
      },
    },
    rules: {
      '@typescript-eslint/no-misused-promises': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/restrict-template-expressions': 'error',
    },
  },
]
