/* eslint-disable no-restricted-syntax */

import type { PlaywrightTestConfig } from '@playwright/test';
import { devices } from '@playwright/test';

const PORT = 4174;

const config: PlaywrightTestConfig = {
  testDir: './e2e',
  timeout: 3000,

  expect: { timeout: 2000 },

  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',

  use: {
    video: 'on',
    actionTimeout: 0,
    baseURL: `http://localhost:${PORT}`,
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [{ name: 'Chrome', use: { ...devices['Desktop Chrome'] } }],

  /* Run your local dev server before starting the tests */
  webServer: {
    command: `yarn build:test && yarn preview:test --port ${PORT}`,
    port: PORT,
  },
};

export default config;
