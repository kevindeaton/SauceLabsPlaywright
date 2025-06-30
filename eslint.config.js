// eslint.config.js
import globals from 'globals'; // For defining global environments like Node.js
import js from '@eslint/js'; // For eslint:recommended
import playwrightPlugin from 'eslint-plugin-playwright'; // The Playwright plugin itself
import tsParser from '@typescript-eslint/parser'; // The TypeScript parser
import tsPlugin from '@typescript-eslint/eslint-plugin'; // The TypeScript ESLint plugin
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

// const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended');// Prettier recommended rules

export default [
  {
    ignores: ['node_modules/', 'test-results/', 'playwright-report/', 'summary.json', '.vscode/'],
  },
  eslintPluginPrettierRecommended,
  js.configs.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2025, // Your specified ecmaVersion
        sourceType: 'module', // Your specified sourceType
        // If you're using type-aware linting, you might need 'project' here:
        // project: ["./tsconfig.json", "./tsconfig.eslint.json"],
        // You'll need to create a tsconfig.eslint.json if not already present
      },
      globals: {
        ...globals.node,
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      // Add your custom TypeScript-specific rules here if any
      // Example:
      // "@typescript-eslint/no-unused-vars": "warn",
    },
  },
  {
    files: ['**/*.spec.ts', '**/*.page.ts', '**/global.*.ts'],
    plugins: {
      playwright: playwrightPlugin,
    },
    languageOptions: {
      globals: {
        // Playwright test runner provides these globals
        ...playwrightPlugin.configs.recommended.globals,
      },
    },
    rules: {
      ...playwrightPlugin.configs.recommended.rules, // Directly include recommended Playwright rules
      // Add your custom Playwright-specific rules here if any
      // Example:
      // "playwright/expect-expect": "error",
      // "playwright/no-page-pause": "warn",
    },
  },
  {
    rules: {
      // Example:
      // "no-console": "warn",
      // "indent": ["error", 2],
      // "quotes": ["error", "single"],
      // "semi": ["error", "always"],
    },
  },
];
