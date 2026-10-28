import { expect, test, type Page, type Route } from "@playwright/test";

const values = {
  Name: "Ada Lovelace",
  "Email Address": "ada@example.com",
  Phone: "+44 20 7946 0958",
  "Your Message": "Hello from the end-to-end tests",
};

const fillAndSubmit = async (page: Page) => {
  for (const [label, value] of Object.entries(values)) {
    await page.getByLabel(label).fill(value);
  }
  await page.getByRole("button", { name: "submit" }).click();
};

// The form posts straight from the browser to the API, a different origin.
const reply = (route: Route, status: number, json: unknown) =>
  route.fulfill({
    status,
    json,
    headers: { "Access-Control-Allow-Origin": "*" },
  });

test.beforeEach(async ({ page }) => {
  await page.goto("/contact");
});

test("marks every empty field", async ({ page }) => {
  await page.getByRole("button", { name: "submit" }).click();

  await expect(page.getByText("Can't be empty")).toHaveCount(4);
  await expect(page.getByLabel("Name")).toBeFocused();
});

test("sends the message and thanks the visitor", async ({ page }) => {
  let sent: unknown;
  await page.route("**/api/contact-form/send", (route) => {
    sent = route.request().postDataJSON();
    return reply(route, 200, { success: true });
  });

  await fillAndSubmit(page);

  await expect(page.getByText("Thanks for submitting!")).toBeVisible();
  expect(sent).toEqual({
    name: values.Name,
    email: values["Email Address"],
    phone: values.Phone,
    message: values["Your Message"],
  });
});

test("shows the API's explanation when it refuses the message", async ({
  page,
}) => {
  await page.route("**/api/contact-form/send", (route) =>
    reply(route, 429, {
      data: null,
      error: {
        status: 429,
        name: "TooManyRequestsError",
        message: "Too many attempts. Please try again later.",
      },
    })
  );

  await fillAndSubmit(page);

  await expect(page.locator(".contact-form").getByRole("alert")).toHaveText(
    "Too many attempts. Please try again later."
  );
});

test("says so when the API cannot be reached", async ({ page }) => {
  await page.route("**/api/contact-form/send", (route) => route.abort());

  await fillAndSubmit(page);

  await expect(page.locator(".contact-form").getByRole("alert")).toHaveText(
    "Could not reach the server. Please check your connection and try again."
  );
});
