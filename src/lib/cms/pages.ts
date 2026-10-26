import { z } from "zod";
import { cmsGet, parseCms } from "./client";
import { parseSections, type Section } from "./sections";
import { toText } from "./text";

export { HOME_SLUG } from "@/utils/site";

export type Page = { slug: string; title: string; sections: Section[] };

const populateAll = (fields: string[]) =>
  Object.fromEntries(fields.map((field) => [field, { populate: "*" }]));

// Every relation and media field the sections use, one level deep.
const PAGE_POPULATE = {
  Module: {
    populate: populateAll([
      "Elements",
      "image",
      "link",
      "Image",
      "ImageMobile",
      "ImageTablet",
      "locations",
    ]),
  },
};

const pagesSchema = z.array(
  z.object({
    attributes: z.object({
      Slug: z.string(),
      Title: z.string().nullish(),
      Module: z.array(z.looseObject({ __component: z.string() })).nullish(),
    }),
  })
);

/** The published page with this slug, or null when there is none. */
export async function getPage(slug: string): Promise<Page | null> {
  const data = await cmsGet("pages", {
    filters: { Slug: { $eq: slug } },
    populate: PAGE_POPULATE,
  });
  const [page] = parseCms(pagesSchema, data, `page "${slug}"`);
  if (!page) return null;

  return {
    slug: page.attributes.Slug,
    title: toText(page.attributes.Title),
    sections: parseSections(page.attributes.Module ?? []),
  };
}

const slugsSchema = z.array(
  z.object({ attributes: z.object({ Slug: z.string().nullish() }) })
);

/** The slugs of every published page, for prerendering. */
export async function getPageSlugs(): Promise<string[]> {
  const data = await cmsGet("pages", {
    fields: ["Slug"],
    pagination: { pageSize: 100 },
  });
  return parseCms(slugsSchema, data, "page list").flatMap(({ attributes }) =>
    attributes.Slug ? [attributes.Slug] : []
  );
}
