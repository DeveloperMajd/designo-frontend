import { defineConfig, devices } from "@playwright/test";

// The site is built and served against e2e/mock-api.mjs, which replays recorded Strapi
// responses, so the suite needs no backend. Fixed ports keep it clear of `yarn dev`.
const API_URL = "http://127.0.0.1:4010/api";
const APP_URL = "http://127.0.0.1:3100";

export default defineConfig({
  testDir: "e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [["github"], ["html", { open: "never" }]] : "list",
  use: {
    baseURL: APP_URL,
    trace: "retain-on-failure",
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: [
    {
      name: "mock-api",
      command: "node e2e/mock-api.mjs",
      url: `${API_URL}/labels`,
      reuseExistingServer: !process.env.CI,
    },
    {
      name: "next",
      // Playwright starts both servers at once, and the build fetches every page, so
      // it waits for the mock API first.
      command: `until curl -sf ${API_URL}/labels > /dev/null; do sleep 0.2; done; yarn build && yarn start -p 3100`,
      url: APP_URL,
      env: { NEXT_PUBLIC_API_URL: API_URL },
      timeout: 300_000,
      reuseExistingServer: !process.env.CI,
    },
  ],
});
