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

test("an unknown page is a 404 with the site's navigation", async ({
  page,
}) => {
  const response = await page.goto("/no-such-page");

  expect(response?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Page not found"
  );
  await page.getByRole("link", { name: "Go home" }).click();
  await expect(page).toHaveURL(/\/$/);
});

test("every page has exactly one main heading", async ({ page }) => {
  for (const { path } of routes) {
    await page.goto(path);
    await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
  }
});

test("the sitemap lists every page, and robots.txt points to it", async ({
  request,
}) => {
  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.headers()["content-type"]).toContain("application/xml");
  const locs = [...(await sitemap.text()).matchAll(/<loc>(.*?)<\/loc>/g)];
  expect(locs.map((m) => new URL(m[1]).pathname).sort()).toEqual(
    routes.map(({ path }) => path).sort()
  );

  const robots = await (await request.get("/robots.txt")).text();
  expect(robots).toContain(
    "Sitemap: https://designo.developermajd.com/sitemap.xml"
  );
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
