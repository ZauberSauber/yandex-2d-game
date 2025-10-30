const { builtinModules } = require('node:module');

module.exports = {
  extends: ['../../.eslintrc.cjs', 'plugin:react/recommended'],
  parserOptions: {
    project: './tsconfig.json',
    ecmaFeatures: { jsx: true },
    ecmaVersion: 'es2020',
    sourceType: 'module',
  },
  settings: {
    react: { version: 'detect' },
    'import/resolver': {
      typescript: { project: './tsconfig.json' },
      node: { extensions: ['.js', '.jsx', '.ts', '.tsx', '.mts', '.mjs'] },
    },
    'import/internal-regex': '^(@src|@components|@slices|@pages|@types|@layout|@utils)(/|$)',
  },

  rules: {
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
          [
            '^vite',
            '^react',
            '^react-router-dom',
            '^react+',
            '^@?(?!(src|components|slices|pages|types|layout|utils)\\b)\\w',
            '^@?(?!(common|components|slices|pages|types|layout|utils)\\b)\\w(.+)?\\u0000$',
          ],
          [
            '^(@src|@components|@slices|@pages|@types|@layout|@utils)(/|$|/.+)?',
            '^(@src|@components|@slices|@pages|@types|@layout|@utils)(/|$|/.+)?\\u0000$',
          ],
          ['^\\.\\./', '^\\./', '^\\.\\./(.+)?\\u0000$', '^\\./(.+)?\\u0000$'],
          ['^.+\\.scss$'],
        ],
      },
    ],
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'react/jsx-key': 'error',
    'react/jsx-props-no-spreading': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'react/destructuring-assignment': 'off',
    'react/require-default-props': 'off',
    'react/display-name': 'off',
    'react-refresh/only-export-components': ['error', { allowConstantExport: true }],
    'react-hooks/rules-of-hooks': 'error',
    'react/jsx-filename-extension': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'jsx-a11y/anchor-is-valid': 'off',
    'jsx-a11y/label-has-associated-control': ['error', { required: { some: ['nesting', 'id'] } }],
    'jsx-a11y/label-has-for': ['error', { required: { some: ['nesting', 'id'] } }],
  },
  plugins: ['react', 'react-hooks', 'jsx-a11y', 'react-refresh'],
  ignorePatterns: ['server/**', 'node_modules/**', 'dist/**', '.eslintrc.cjs', 'vite.config.ts'],
};
