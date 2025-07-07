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
  retries: 1,
  reporter: [
    ['html'],
    ['allure-playwright', {
      resultsDir: './allure-results',
      detail: true,
      suiteTitle: true, 
      // categories: [ // TODO define categories later  
      //   {
      //     name: "foo",
      //     messageRegex: "bar",
      //     traceRegex: "baz",
      //     matchedStatuses: [Status.FAILED, Status.BROKEN],
      //   },
      // ],
    }],
  ],
  use: {
    baseURL: process.env.URL,
    trace: 'retain-on-failure',
    testIdAttribute: 'data-test',
  },

  projects: [
    {
      name: 'Setup',
      testDir: './config',
      testMatch: '**/global.setup.ts',
      teardown: 'Teardown',
    },
    {
      name: 'Teardown',
      testDir: './config',
      testMatch: '**/global.teardown.ts',
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
