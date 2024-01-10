import { defineConfig, devices } from '@playwright/test';

import path from 'path';

require('dotenv').config({ override: true });

export const STORAGE_STATE = path.join(__dirname, 'playwright/.auth/user.json');

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  //testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'list',
  // Limit the number of failures on CI to save resources
  maxFailures: process.env.CI ? 10 : undefined,
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    //baseURL: 'https://en.wikipedia.org/',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },
  expect: {
    // Maximum time expect() should wait for the condition to be met.
    timeout: 3000,
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'setup',
      testMatch: '**/*.setup.ts',
      teardown: 'teardown clean up',
      use: {
        baseURL: 'https://en.wikipedia.org/',
      },
    },
    {
      name: 'teardown clean up',
      testMatch: /global\.teardown\.ts/,
    },
    {
      name: 'e2e tests',
      testMatch: '**/tests/wiki/*.spec.ts',
      dependencies: ['setup'],
      use: {
        baseURL: 'https://en.wikipedia.org/',
        storageState: STORAGE_STATE,
      },
      retries: 1,
    },
    {
      name: 'other tests',
      testMatch: '**/tests/other/*.spec.ts', 
      retries: 1,
    },
    {
      name: 'one test',
      testMatch: '**/tests/**/*.spec.ts',
      testIgnore: ['**/wiki/**', '**/other/**'],
    },
    {
      name: 'api test reqres',
      testMatch: '**/tests/api/reqres.spec.ts',
      testIgnore: ['**/wiki/**', '**/other/**', '**/other/**'],
      use: {
        baseURL: 'https://reqres.in/',
      },
    },
    // {
    //   name: 'chromium',
    //   use: { ...devices['Desktop Chrome'] },
    // },

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
