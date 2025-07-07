import globals from 'globals';
import js from '@eslint/js';
import playwrightPlugin from 'eslint-plugin-playwright';
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

export default [
  {
    ignores: ['node_modules/', 'test-results/', 'playwright-report/', 'summary.json', '.vscode/', 'config/', 'allure-*/', '*.config.*'],
  },
  eslintPluginPrettierRecommended,
  js.configs.recommended,
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2025,
        sourceType: 'module',
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
    },
  },
  {
    files: ['**/*.spec.ts', '**/*.page.ts', '**/global.*.ts'],
    plugins: {
      playwright: playwrightPlugin,
    },
    languageOptions: {
      globals: {
        ...playwrightPlugin.configs.recommended.globals,
      },
    },
    rules: {
      ...playwrightPlugin.configs.recommended.rules,
    },
  },
];
