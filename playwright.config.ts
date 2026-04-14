import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, './config/.env') });

// Global Storage State for authentication
export const STORAGE_STATE = path.join(__dirname, './config/auth.json');

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 0,
  reporter: [
    ['html'],
    ['allure-playwright', {
      resultsDir: './allure-results',
      detail: true,
      suiteTitle: true,
    }],
  ],
  use: {
    baseURL: process.env.URL,
    trace: 'retain-on-failure',
    testIdAttribute: 'data-test',
  },

  // Global teardown hook - runs after all test projects complete
  globalTeardown: require.resolve('./config/global.teardown.ts'),

  projects: [
    {
      name: 'Setup',
      testDir: './config',
      testMatch: '**/global.setup.ts',
    },

    {
      name: 'Regression Tests',
      dependencies: ['Setup'],
      use: {
        ...devices['Desktop Chrome'],
        storageState: STORAGE_STATE,
      },
    },
  ],
});
