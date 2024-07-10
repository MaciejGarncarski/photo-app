import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import { fixupPluginRules } from "@eslint/compat";
import nextPlugin from "@next/eslint-plugin-next";
// import nextConfig from "@next/eslint-plugin-next";
// ADD TO CONFIG WHEN ITS UPDATED
import jsxa11y from "eslint-plugin-jsx-a11y";
import react from "eslint-plugin-react";
import eslintPluginReactHooks from "eslint-plugin-react-hooks";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import testingLibrary from "eslint-plugin-testing-library";
import unusedImports from "eslint-plugin-unused-imports";

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    ignores: [
      "**/types.ts",
      "**/frontend/types.ts",
      "**/backend/dist/",
      "**/frontend/.next",
      "**/frontend/next.d.ts",
      "**/frontend/next-env.d.ts",
      "**/frontend/vitest.config.ts",
      "**/frontend/types.d.ts",
    ],
  },
  {
    ...nextPlugin.configs.recommended,
    name: "PhotoApp - Frontend",
    files: [
      "apps/frontend/**/*.js",
      "apps/frontend/**/*.jsx",
      "apps/frontend/**/*.ts",
      "apps/frontend/**/*.tsx",
    ],
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      "@typescript-eslint": tseslint.plugin,
      next: fixupPluginRules(nextPlugin),
      "testing-library": testingLibrary,
      "jsx-a11y": jsxa11y,
      react: react,
      "react-hooks": fixupPluginRules(eslintPluginReactHooks),
      "simple-import-sort": simpleImportSort,
      "unused-imports": fixupPluginRules(unusedImports),
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      ...react.configs.recommended.rules,
      ...jsxa11y.configs.recommended.rules,
      ...eslintPluginReactHooks.configs.recommended.rules,
      "no-unused-vars": "off",
      "no-useless-escape": "off",
      "no-undef": "off",
      "no-empty": [
        "error",
        {
          allowEmptyCatch: true,
        },
      ],
      "no-console": "warn",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          caughtErrors: "none",
        },
      ],
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "react/react-in-jsx-scope": "off",
      "jsx-a11y/no-autofocus": "off",
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
    plugins: {
      "@typescript-eslint": tseslint.plugin,
      "simple-import-sort": simpleImportSort,
      "unused-imports": fixupPluginRules(unusedImports),
    },
    rules: {
      "no-unused-vars": "off",
      "no-undef": "off",
      "no-useless-escape": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "no-console": "warn",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": "off",
      "simple-import-sort/exports": "warn",
    },
  }
);
