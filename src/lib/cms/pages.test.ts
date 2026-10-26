// @vitest-environment node
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import recorded from "../../../e2e/fixtures/pages.json";
import { CmsError } from "./client";
import { getPage, getPageSlugs, HOME_SLUG } from "./pages";
import { parseSections, type Section } from "./sections";

// The recorded responses of the real CMS (e2e/fixtures), so these tests also check that
// the schemas accept every page the site actually has.

const respondWith = (data: unknown) =>
  vi.stubGlobal(
    "fetch",
    vi.fn(async () => Response.json({ data }))
  );

const recordedPage = (slug: string) =>
  recorded.data.filter((page) => page.attributes.Slug === slug);

const kinds = (sections: Section[]) => sections.map((section) => section.kind);

beforeEach(() => {
  vi.stubEnv("NEXT_PUBLIC_API_URL", "https://api.example.com/api");
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

describe("getPage", () => {
  it.each(recorded.data.map((page) => page.attributes.Slug))(
    "parses the recorded %s page",
    async (slug) => {
      respondWith(recordedPage(slug));

      const page = await getPage(slug);

      expect(page?.slug).toBe(slug);
      expect(page?.sections.length).toBeGreaterThan(0);
    }
  );

  it("maps the home page's sections in order", async () => {
    respondWith(recordedPage(HOME_SLUG));

    const page = await getPage(HOME_SLUG);

    expect(kinds(page!.sections)).toEqual([
      "homepage-banner",
      "project-grids",
      "info-highlights",
    ]);
    const banner = page!.sections[0] as Extract<
      Section,
      { kind: "homepage-banner" }
    >;
    expect(banner.link).toEqual({
      href: "/about",
      label: "Learn More",
      newTab: false,
    });
    expect(banner.image?.src).toMatch(
      /^https:\/\/api\.example\.com\/uploads\//
    );
  });

  it("gives every office its anchor, address lines and phone", async () => {
    respondWith(recordedPage("locations"));

    const page = await getPage("locations");

    const [locations] = page!.sections as Extract<
      Section,
      { kind: "locations" }
    >[];
    expect(locations.offices.map((office) => office.anchor)).toEqual([
      "ca",
      "au",
      "uk",
    ]);
    expect(locations.offices[2]).toMatchObject({
      city: "United Kingdom",
      addressLines: [
        "Designo UK Office",
        "13 Colorado Way",
        "Rhyd-y-fro SA8 9GA",
      ],
      phone: { display: "+44 7831 151400", href: "tel:+447831151400" },
      imagePosition: "right",
    });
  });

  it("is null when the CMS has no such page", async () => {
    respondWith([]);

    expect(await getPage("no-such-page")).toBeNull();
  });

  it("throws when a page has the wrong shape", async () => {
    respondWith([{ attributes: { Slug: "about", Module: "not a list" } }]);

    await expect(getPage("about")).rejects.toBeInstanceOf(CmsError);
  });
});

describe("parseSections", () => {
  it("skips section types the site has no component for", () => {
    const sections = parseSections([
      { __component: "components.contact-show-case", id: 1 },
      {
        __component: "components.page-banner",
        id: 2,
        Title: "About",
        Content: "Hi",
      },
    ]);

    expect(sections).toEqual([
      { kind: "page-banner", id: 2, title: "About", text: "Hi" },
    ]);
  });

  it("copes with sections whose content is missing", () => {
    const [grid] = parseSections([
      {
        __component: "components.project-grids",
        id: 3,
        Type: null,
        Elements: [
          { Title: "Web design", page: { data: null }, Image: { data: null } },
        ],
      },
    ]);

    expect(grid).toEqual({
      kind: "project-grids",
      id: 3,
      layout: "three-grid",
      items: [
        {
          title: "Web design",
          href: null,
          image: { desktop: null, tablet: null, mobile: null },
        },
      ],
    });
  });

  it("throws for a known section with the wrong structure", () => {
    expect(() =>
      parseSections([
        { __component: "components.info-highlights", id: "x", Elements: 3 },
      ])
    ).toThrowError(CmsError);
  });
});

describe("getPageSlugs", () => {
  it("lists the slugs of every page", async () => {
    respondWith(recorded.data);

    expect(await getPageSlugs()).toEqual(
      recorded.data.map((page) => page.attributes.Slug)
    );
  });
});
