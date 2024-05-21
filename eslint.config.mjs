import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

export default [
  {
    rules: {
      "no-unused-vars": "error",
      "no-undef": "error",
      "no-console": "warn",
    },
    languageOptions: { globals: globals.browser },
    ignores: ["**/node_modules/", ".dist/"],
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];
