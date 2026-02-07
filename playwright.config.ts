import dotenv from 'dotenv';
import { defineConfig, devices } from '@playwright/test';

dotenv.config({ path: '.env.test' });

const port = Number(process.env.PLAYWRIGHT_PORT || '3001');
const baseURL = process.env.PLAYWRIGHT_BASE_URL || `http://127.0.0.1:${port}`;

export default defineConfig({
  testDir: './e2e',
  fullyParallel: false,
  timeout: 60000,
  expect: {
    timeout: 10000,
  },
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  reporter: process.env.CI ? [['github'], ['html', { open: 'never' }]] : 'list',
  use: {
    baseURL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile-chrome', use: { ...devices['Pixel 7'] } },
  ],
  webServer: {
    command: `yarn build && yarn start -p ${port}`,
    port,
    reuseExistingServer: !process.env.CI,
    timeout: 240000,
    env: {
      ...process.env,
      NEXT_PUBLIC_SANITY_PROJECT_ID: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
      NEXT_PUBLIC_SANITY_DATASET: process.env.NEXT_PUBLIC_SANITY_DATASET || '',
      NEXT_PUBLIC_SANITY_API_VERSION:
        process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-08-18',
      SANITY_API_READ_TOKEN: process.env.SANITY_API_READ_TOKEN || '',
    },
  },
});
