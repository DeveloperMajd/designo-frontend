// @vitest-environment node
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import contact from "../../../e2e/fixtures/contact.json";
import labels from "../../../e2e/fixtures/labels.json";
import menus from "../../../e2e/fixtures/menus.json";
import { CmsError } from "./client";
import { getSiteData } from "./site";

const recorded: Record<string, unknown> = { menus, contact, labels };

// Answers each endpoint with its recorded response (e2e/fixtures).
const serveRecorded = (overrides: Record<string, () => Response> = {}) =>
  vi.stubGlobal(
    "fetch",
    vi.fn(async (url: string) => {
      const endpoint = new URL(url).pathname.replace("/api/", "");
      return overrides[endpoint]?.() ?? Response.json(recorded[endpoint]);
    })
  );

beforeEach(() => {
  vi.stubEnv("NEXT_PUBLIC_API_URL", "https://api.example.com/api");
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

describe("getSiteData", () => {
  it("returns the main menu in its order", async () => {
    serveRecorded();

    const { menu } = await getSiteData();

    expect(menu).toEqual([
      { href: "/about", label: "our company", newTab: false },
      { href: "/locations", label: "locations", newTab: false },
      { href: "/contact", label: "contact", newTab: false },
    ]);
  });

  it("returns the contact details for the footer", async () => {
    serveRecorded();

    const { contact } = await getSiteData();

    expect(contact.addressLines).toEqual([
      "Designo Central Office",
      "3886 Wellington Street",
      "Toronto, Ontario M9C 3J5",
    ]);
    expect(contact.phone).toEqual({
      display: "+49 32 13123213",
      href: "tel:+493213123213",
    });
    expect(contact.socials.map((social) => social.link.href)).toEqual([
      "https://facebook.com",
      "https://youtube.com",
      "https://x.com",
      "https://pinterest.com",
      "https://instagram.com",
    ]);
    expect(contact.socials[0].icon).toMatch(
      /^https:\/\/api\.example\.com\/uploads\/.+\.svg$/
    );
  });

  it("returns the labels by name", async () => {
    serveRecorded();

    const { labels } = await getSiteData();

    expect(labels["see-location"]).toBe("See Location");
    expect(labels["contact-show-case-title"]).toBe(
      "Let’s talk about your project"
    );
  });

  it("fails as a whole when one part cannot be loaded", async () => {
    serveRecorded({
      labels: () => new Response("Service Unavailable", { status: 503 }),
    });

    await expect(getSiteData()).rejects.toBeInstanceOf(CmsError);
  });
});
