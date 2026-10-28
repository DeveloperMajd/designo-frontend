import { describe, expect, it } from "vitest";
import { buildSitemap } from "./sitemap";
import { HOME_SLUG, SITE_URL } from "./site";

describe("buildSitemap", () => {
  it("lists every page at its public URL, the home page at the root", () => {
    const xml = buildSitemap([HOME_SLUG, "about", "locations"]);

    expect([...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1])).toEqual([
      SITE_URL,
      `${SITE_URL}/about`,
      `${SITE_URL}/locations`,
    ]);
    expect(xml).toMatch(/^<\?xml version="1.0" encoding="UTF-8"\?>\n<urlset/);
  });

  it("escapes characters that would break the XML", () => {
    expect(buildSitemap(["a&b"])).toContain(`<loc>${SITE_URL}/a&amp;b</loc>`);
  });
});
