import { fixupPluginRules } from "@eslint/compat";
import importPlugin from "eslint-plugin-import";
import nextPlugin from "@next/eslint-plugin-next";
// import nextConfig from "@next/eslint-plugin-next";
// ADD TO CONFIG WHEN ITS UPDATED
import jsxa11y from "eslint-plugin-jsx-a11y";
import react from "eslint-plugin-react";
import reactCompiler from "eslint-plugin-react-compiler";
import reactHooks from "eslint-plugin-react-hooks";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import testingLibrary from "eslint-plugin-testing-library";
import unusedImports from "eslint-plugin-unused-imports";
import tseslint from "typescript-eslint";

/** @type { import("eslint").Linter.FlatConfig[] } */
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
    // ...nextConfig,
    name: "PhotoApp - Frontend",
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
      next: fixupPluginRules(nextPlugin),
      "testing-library": testingLibrary,
      import: importPlugin,
      "jsx-a11y": jsxa11y,
      react: react,
      "react-compiler": reactCompiler,
      "react-hooks": fixupPluginRules(reactHooks),
      "simple-import-sort": simpleImportSort,
      "unused-imports": fixupPluginRules(unusedImports),
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "no-unused-vars": "off",
      "no-console": "warn",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "import/no-anonymous-default-export": "warn",
      "react/no-unknown-property": "off",
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "react-compiler/react-compiler": "error",
      "react-hooks/rules-of-hooks": "error",
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
    name: "PhotoApp - Backend",
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
