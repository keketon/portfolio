import eslint from "@eslint/js";
import tsEslint from "typescript-eslint";
import prettier from "eslint-plugin-prettier";

export default tsEslint.config(
  eslint.configs.recommended,
  ...tsEslint.configs.recommended,
  ...tsEslint.configs.stylistic,
  {
    files: ["lib/**/*.ts", "bin/*.ts"],
    languageOptions: {
      parserOptions: {
        projectService: true,
        project: "./tsconfig.json",
      },
    },
    plugins: {
      prettier: prettier,
    },
    rules: {
      "prettier/prettier": "error",
    },
  },
  {
    ignores: ["cdk.out", "node_modules", "*.js"],
  }
);
