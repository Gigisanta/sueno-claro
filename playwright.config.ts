import { defineConfig, devices } from "@playwright/test";
const port = Number(process.env.PORT ?? 3100);
export default defineConfig({
  testDir: "./tests/e2e",
  timeout: 30000,
  expect: { timeout: 7000 },
  fullyParallel: true,
  workers: 4,
  use: {
    baseURL: process.env.BASE_URL ?? `http://127.0.0.1:${port}`,
    trace: "retain-on-failure",
    timezoneId: "America/New_York",
  },
  webServer: process.env.BASE_URL
    ? undefined
    : {
        command: "npm start",
        url: `http://127.0.0.1:${port}`,
        reuseExistingServer: !process.env.CI,
        timeout: 30000,
      },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "mobile-chromium", use: { ...devices["Pixel 7"] } },
    { name: "webkit", use: { ...devices["Desktop Safari"] } },
    { name: "mobile-safari", use: { ...devices["iPhone 13"] } },
  ],
});
