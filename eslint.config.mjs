import { fixupConfigRules } from "@eslint/compat";
import { FlatCompat } from "@eslint/eslintrc";
import next from "@next/eslint-plugin-next";
import importPlugin from "eslint-plugin-import";
import jsxa11y from "eslint-plugin-jsx-a11y";
import react from "eslint-plugin-react";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import testingLibrary from "eslint-plugin-testing-library";
import unusedImports from "eslint-plugin-unused-imports";
import tseslint from "typescript-eslint";

const compat = new FlatCompat();

export default [
  {
    ignores: ["types.ts", ".next"],
  },
  ...tseslint.configs.recommended,
  ...fixupConfigRules(compat.extends("plugin:@next/next/core-web-vitals")),
  {
    files: ["**/*.ts", "**/*.tsx", "**/*.js"],
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
      "unused-imports": unusedImports,
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
      "unused-imports/no-unused-imports": "warn",
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
];
