import { expect, test } from "@playwright/test";
import { routes } from "./routes";

for (const { path, title } of routes) {
  test(`${path} renders without errors`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));

    const response = await page.goto(path);

    expect(response?.status()).toBe(200);
    await expect(page).toHaveTitle(title);
    const nav = page.locator(".navbar .is-hidden-mobile .nav-item");
    await expect(nav).toHaveText(["our company", "locations", "contact"]);
    expect(errors).toEqual([]);
  });
}

test("an unknown page is a 404", async ({ page }) => {
  const response = await page.goto("/no-such-page");
  expect(response?.status()).toBe(404);
});

test("social links lead to the networks, not to pages on this site", async ({
  page,
}) => {
  await page.goto("/");

  const hrefs = await page
    .locator("footer .social-icon")
    .evaluateAll((links) => links.map((link) => link.getAttribute("href")));

  expect(hrefs.length).toBeGreaterThan(0);
  for (const href of hrefs) expect(href).toMatch(/^https:\/\/\w/);
});

for (const office of ["Canada", "Australia", "United Kingdom"]) {
  test(`"See Location" for ${office} opens the locations page at that office`, async ({
    page,
  }) => {
    await page.goto("/about");

    await page
      .locator(".locations-highlights .column", { hasText: office })
      .getByRole("link", { name: "See Location" })
      .click();

    await expect(page).toHaveURL(/\/locations\/?#\w+$/);
    // The anchor must exist: the first office is in view even if nothing scrolled.
    const target = page.locator(new URL(page.url()).hash);
    await expect(target).toBeInViewport();
    await expect(target.locator(".title")).toHaveText(office);
  });
}
