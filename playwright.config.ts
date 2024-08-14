import type { PlaywrightTestConfig } from '@playwright/test'
import { devices } from '@playwright/test'

const isInCi = !!process.env.CI

const config: PlaywrightTestConfig = {
  forbidOnly: isInCi,
  testDir: 'e2e',
  fullyParallel: true,
  retries: isInCi ? 2 : 0,
  reporter: isInCi ? 'github' : 'line',
  timeout: 60 * 60 * 1000,
  expect: {
    toHaveScreenshot: {
      maxDiffPixelRatio: 0.05,
      threshold: 0.3,
    },
  },
  use: {
    trace: 'on-first-retry',
    baseURL: 'http://localhost:8080',
  },
  webServer: {
    command: 'yarn start',
    url: 'http://localhost:8080',
    reuseExistingServer: !isInCi,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
  ],
}
export default config
