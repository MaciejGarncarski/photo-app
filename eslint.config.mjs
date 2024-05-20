import { fixupPluginRules } from "@eslint/compat";
import next from "@next/eslint-plugin-next";
import importPlugin from "eslint-plugin-import";
import jsxa11y from "eslint-plugin-jsx-a11y";
import react from "eslint-plugin-react";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import testingLibrary from "eslint-plugin-testing-library";
import unusedImports from "eslint-plugin-unused-imports";
import tseslint from "typescript-eslint";

export default [
  ...tseslint.configs.recommended,
  {
    ignores: [
      "**/types.ts",
      "**/frontend/types.ts",
      "**/frontend/.next",
      "**/frontend/next.d.ts",
      "**/frontend/next-env.d.ts",
      "**/frontend/vitest.config.ts",
      "**/frontend/types.d.ts",
    ],
  },
  {
    files: [
      "apps/frontend/**/*.ts",
      "apps/frontend/**/*.tsx",
      "apps/frontend/**/*.js",
    ],
    languageOptions: {
      parser: tseslint.parser,
      globals: {
        React: true,
        JSX: true,
      },
    },
    plugins: {
      "@typescript-eslint": tseslint.plugin,
      "testing-library": testingLibrary,
      next: next,
      import: importPlugin,
      "jsx-a11y": jsxa11y,
      react: react,
      "simple-import-sort": simpleImportSort,
      "unused-imports": fixupPluginRules(unusedImports),
    },
    rules: {
      // ...next.rules,
      "no-unused-vars": "off",
      "no-console": "warn",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      // 'react/display-name': 'off',
      // 'react/jsx-curly-brace-presence': [
      //   'warn',
      //   {
      //     props: 'never',
      //     children: 'never',
      //   },
      // ],
      "import/no-anonymous-default-export": "warn",
      "react/no-unknown-property": "off",
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "jsx-a11y/alt-text": [
        "warn",
        {
          elements: ["img"],
          img: ["Image"],
        },
      ],
      "jsx-a11y/aria-props": "warn",
      "jsx-a11y/aria-proptypes": "warn",
      "jsx-a11y/aria-unsupported-elements": "warn",
      "jsx-a11y/role-has-required-aria-props": "warn",
      "jsx-a11y/role-supports-aria-props": "warn",
      "react/jsx-no-target-blank": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": "off",
      "simple-import-sort/exports": "warn",
      "simple-import-sort/imports": [
        "warn",
        {
          groups: [
            ["^@?\\w", "^\\u0000"],
            ["^@/hooks", "^@/utils"],
            ["^@/components/atoms"],
            ["^@/components/molecules"],
            ["^@/components/organisms"],
            ["^@/"],
            ["^.+\\.s?css$"],
            [
              "^\\./?$",
              "^\\.(?!/?$)",
              "^\\.\\./?$",
              "^\\.\\.(?!/?$)",
              "^\\.\\./\\.\\./?$",
              "^\\.\\./\\.\\.(?!/?$)",
              "^\\.\\./\\.\\./\\.\\./?$",
              "^\\.\\./\\.\\./\\.\\.(?!/?$)",
            ],
            ["^@/types"],
            ["^"],
          ],
        },
      ],
    },
  },
  {
    files: [
      "apps/backend/**/*.ts",
      "apps/backend/**/*.tsx",
      "apps/backend/**/*.js",
    ],
    languageOptions: {
      parser: tseslint.parser,
    },
    plugins: {
      "@typescript-eslint": tseslint.plugin,
      import: importPlugin,
      "simple-import-sort": simpleImportSort,
      "unused-imports": fixupPluginRules(unusedImports),
    },
    rules: {
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "no-console": "warn",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "import/no-anonymous-default-export": "warn",
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": "off",
      "simple-import-sort/exports": "warn",
    },
  },
];
