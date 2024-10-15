import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import { fixupPluginRules } from "@eslint/compat";
import jsxa11y from "eslint-plugin-jsx-a11y";
import react from "eslint-plugin-react";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import testingLibrary from "eslint-plugin-testing-library";
import unusedImports from "eslint-plugin-unused-imports";
import nextPlugin from "@next/eslint-plugin-next";
import reactHooksPlugin from "eslint-plugin-react-hooks";

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
    name: "PhotoApp - Frontend",
    files: [
      "apps/frontend/**/*.js",
      "apps/frontend/**/*.jsx",
      "apps/frontend/**/*.ts",
      "apps/frontend/**/*.tsx",
    ],
    plugins: {
      "@typescript-eslint": tseslint.plugin,
      react: react,
      "testing-library": testingLibrary,
      "@next/next": nextPlugin,
      "react-hooks": reactHooksPlugin,
      "jsx-a11y": jsxa11y,
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
      "jsx-a11y/no-autofocus": "off",
      "react/no-unknown-property": "off",
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "jsx-a11y/alt-text": ["error", { elements: ["img"], img: ["Image"] }],
      "jsx-a11y/aria-props": "error",
      "jsx-a11y/aria-proptypes": "error",
      "jsx-a11y/aria-unsupported-elements": "error",
      "jsx-a11y/role-has-required-aria-props": "error",
      "jsx-a11y/role-supports-aria-props": "error",
      "react/jsx-no-target-blank": "off",
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": "off",
      "simple-import-sort/exports": "warn",
      "@next/next/no-html-link-for-pages": "off",
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
