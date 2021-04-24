module.exports = {
  env: {
    "node": true,
    "es2020": true,
    "jest/globals": true,
  },
  extends: [
    "eslint:recommended",
  ],
  parserOptions: {
    "ecmaVersion": 11,
    "sourceType": "module"
  },
  "plugins": [
    "jest",
  ],
  rules: {
    "no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],
    "semi": ["error", "always"],
  },
  overrides: [
    {
      files: ['**/*.ts'],
      extends: [
        "plugin:@typescript-eslint/recommended"
      ],
      parser: "@typescript-eslint/parser",
      plugins: [
        "@typescript-eslint"
      ],
      rules: {
        "@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],
      },
    }
  ],
};
