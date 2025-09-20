import unusedImports from "eslint-plugin-unused-imports";
import { defineConfig } from "eslint/config";
import globals from "globals";
import tseslint from "typescript-eslint";

import js from "@eslint/js";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
    plugins: { js, "unused-imports": unusedImports },
    extends: ["js/recommended"],
    languageOptions: { globals: globals.node },
    rules: {
      "@typescript-eslint/consistent-type-imports": "warn",
      "@typescript-eslint/consistent-type-definitions": "error",
      "no-trailing-spaces": "error",
    },
  },

  tseslint.configs.recommended,

  tseslint.config({
    languageOptions: {
      parserOptions: {
        tsconfigRootDir: import.meta.dirname, // penting!
      },
    },
    rules: {
      "@typescript-eslint/consistent-type-definitions": "error",
      "unused-imports/no-unused-imports": "error", // Report unused imports as errors
      "@typescript-eslint/consistent-type-imports": "off",
    },
  }),
]);
