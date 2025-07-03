import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';

// Resolve __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, './config/.env') });

// Global Storage State for authentication
export const STORAGE_STATE = path.join(__dirname, './config/auth.json');

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: 'html',

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
