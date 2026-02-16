import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import tseslint from "typescript-eslint";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommendedTypeChecked,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      "@typescript-eslint/consistent-type-imports": [
        "error",
        {
          prefer: "type-imports",
          fixStyle: "inline-type-imports",
        },
      ],
      "@typescript-eslint/no-floating-promises": "off",
      "@typescript-eslint/no-misused-promises": [
        "error",
        {
          checksVoidReturn: {
            attributes: false,
          },
        },
      ],
      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            [
              "^react(?:/.*|$)",
              "^react-dom(?:/.*|$)",
              "^react-router(?:-dom)?(?:/.*|$)",
            ],
            ["^@hookform/resolvers(?:/.*|$)", "^react-hook-form$", "^zod$"],
            ["^@mui(?:/.*|$)"],
            [
              "^(?!react(?:/.*|$)|react-dom(?:/.*|$)|react-router(?:-dom)?(?:/.*|$)|@hookform/resolvers(?:/.*|$)|react-hook-form$|zod$|@mui(?:/.*|$)|@(?:app|pages|widgets|features|entities|shared)(?:/|$))@?\\w",
            ],
            ["^@app(?:/.*|$)"],
            ["^@pages(?:/.*|$)"],
            ["^@widgets(?:/.*|$)"],
            ["^@features(?:/.*|$)"],
            ["^@entities(?:/.*|$)"],
            ["^@shared(?:/.*|$)"],
            ["^\\u0000"],
            ["^/"],
            ["^\\."],
          ],
        },
      ],
      "simple-import-sort/exports": "error",
    },
  },
]);
