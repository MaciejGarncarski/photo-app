import { fixupConfigRules } from '@eslint/compat';
import { FlatCompat } from '@eslint/eslintrc';
import next from '@next/eslint-plugin-next';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import testingLibrary from 'eslint-plugin-testing-library';
import unusedImports from 'eslint-plugin-unused-imports';
import tseslint from 'typescript-eslint';

const compat = new FlatCompat();

export default [
  {
    ignores: ['types.ts', '.next'],
  },
  ...tseslint.configs.recommended,
  ...fixupConfigRules(compat.extends('plugin:@next/next/core-web-vitals')),
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js'],
    languageOptions: {
      parser: tseslint.parser,
      globals: {
        React: true,
        JSX: true,
      },
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      'testing-library': testingLibrary,
      next: next,
      'simple-import-sort': simpleImportSort,
      'unused-imports': unusedImports,
    },
    rules: {
      // ...next.rules,
      'no-unused-vars': 'off',
      'no-console': 'warn',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      // 'react/display-name': 'off',
      // 'react/jsx-curly-brace-presence': [
      //   'warn',
      //   {
      //     props: 'never',
      //     children: 'never',
      //   },
      // ],
      '@typescript-eslint/no-unused-vars': 'off',
      'unused-imports/no-unused-imports': 'warn',
      'unused-imports/no-unused-vars': 'off',
      'simple-import-sort/exports': 'warn',
      'simple-import-sort/imports': [
        'warn',
        {
          groups: [
            ['^@?\\w', '^\\u0000'],
            ['^@/hooks', '^@/utils'],
            ['^@/components/atoms'],
            ['^@/components/molecules'],
            ['^@/components/organisms'],
            ['^@/'],
            ['^.+\\.s?css$'],
            [
              '^\\./?$',
              '^\\.(?!/?$)',
              '^\\.\\./?$',
              '^\\.\\.(?!/?$)',
              '^\\.\\./\\.\\./?$',
              '^\\.\\./\\.\\.(?!/?$)',
              '^\\.\\./\\.\\./\\.\\./?$',
              '^\\.\\./\\.\\./\\.\\.(?!/?$)',
            ],
            ['^@/types'],
            ['^'],
          ],
        },
      ],
    },
  },
];
