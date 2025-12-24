const { builtinModules } = require('node:module');

module.exports = {
  extends: ['../../.eslintrc.cjs'],
  parserOptions: {
    project: './tsconfig.json',
    ecmaVersion: 'es2020',
    sourceType: 'module',
  },
  settings: {
    'import/resolver': {
      typescript: { project: './tsconfig.json' },
      node: { extensions: ['.js', '.ts', '.mts', '.mjs'] },
    },
  },

  rules: {
    'import/extensions': ['error', 'ignorePackages', { js: 'always', ts: 'never' }],
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          ['^\\u0000'],
          [
            `^(${builtinModules.join('|')})(/|$)`,
            '^node:',
            `^(${builtinModules.join('|')})(/|$)\\u0000$`,
            '^node:.+\\u0000$',
          ],
          ['^@?\\b\\w', '^@?\\b\\w(.+)?\\u0000$'],
          ['^\\.\\./', '^\\./', '^\\.\\./(.+)?\\u0000$', '^\\./(.+)?\\u0000$'],
        ],
      },
    ],
  },
};
