import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, './config/.env') });

// Global Storage State
export const STORAGE_STATE = path.join(__dirname, './config/auth.json');

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',

  /* Run tests in files in parallel */
  fullyParallel: true,

  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,

  /* Retry on CI only */
  retries: process.env.CI ? 1 : 0,

  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: process.env.URL,

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'retain-on-failure',
  },

  /* Configure projects for major browsers */
  projects: [

    {
      name: "Setup",
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
      dependencies: ["Setup"],
      use: {
        ...devices['Desktop Chrome'],
        storageState: STORAGE_STATE,
      },
    }
  ]
});
