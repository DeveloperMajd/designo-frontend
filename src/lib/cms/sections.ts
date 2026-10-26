import { z } from "zod";
import { formatPhone } from "@/utils/formatPhoneNumber";
import { officeAnchor } from "@/utils/officeAnchor";
import { parseCms } from "./client";
import { linkSchema } from "./links";
import { type Media, mediaSchema, type ResponsiveMedia } from "./media";
import { toLines, toText } from "./text";

// One schema per section type of the page's dynamic zone. Each turns Strapi's response
// into the props its component needs: plain text, null-safe images, absolute links.
// Nothing in the CMS is required, so every content field may be missing.

const text = z.string().nullish().transform(toText);

// Sections with one image per breakpoint.
const responsiveImageFields = {
  Image: mediaSchema,
  ImageTablet: mediaSchema,
  ImageMobile: mediaSchema,
};

const responsiveImage = (s: {
  Image: Media | null;
  ImageTablet: Media | null;
  ImageMobile: Media | null;
}): ResponsiveMedia => ({
  desktop: s.Image,
  tablet: s.ImageTablet,
  mobile: s.ImageMobile,
});

const imagePosition = z
  .enum(["img-left", "img-right"])
  .nullish()
  .transform(
    (position) =>
      (position === "img-right" ? "right" : "left") as "left" | "right"
  );

const list = <T extends z.ZodType>(item: T) =>
  z
    .array(item)
    .nullish()
    .transform((items) => items ?? []);

const sectionSchemas = {
  "components.homepage-banner": z
    .object({
      id: z.number(),
      headline: text,
      text,
      image: mediaSchema,
      link: linkSchema,
    })
    .transform((s) => ({ kind: "homepage-banner" as const, ...s })),

  "components.project-grids": z
    .object({
      id: z.number(),
      Type: z.enum(["three-grid", "two-grid"]).catch("three-grid"),
      Elements: list(
        z
          .object({
            ...responsiveImageFields,
            Title: text,
            page: z
              .object({
                data: z
                  .object({ attributes: z.object({ Slug: z.string() }) })
                  .nullish(),
              })
              .nullish(),
          })
          .transform((e) => ({
            title: e.Title,
            href: e.page?.data ? `/${e.page.data.attributes.Slug}` : null,
            image: responsiveImage(e),
          }))
      ),
    })
    .transform((s) => ({
      kind: "project-grids" as const,
      id: s.id,
      layout: s.Type,
      items: s.Elements,
    })),

  "components.info-highlights": z
    .object({
      id: z.number(),
      Elements: list(
        z
          .object({ title: text, content: text, Image: mediaSchema })
          .transform((e) => ({
            title: e.title,
            text: e.content,
            image: e.Image,
          }))
      ),
    })
    .transform((s) => ({
      kind: "info-highlights" as const,
      id: s.id,
      items: s.Elements,
    })),

  "components.page-banner": z
    .object({ id: z.number(), Title: text, Content: text })
    .transform((s) => ({
      kind: "page-banner" as const,
      id: s.id,
      title: s.Title,
      text: s.Content,
    })),

  "components.project-cards": z
    .object({
      id: z.number(),
      Elements: list(
        z
          .object({
            Title: text,
            Content: text,
            Image: mediaSchema,
            link: linkSchema,
          })
          .transform((e) => ({
            title: e.Title,
            text: e.Content,
            image: e.Image,
            link: e.link,
          }))
      ),
    })
    .transform((s) => ({
      kind: "project-cards" as const,
      id: s.id,
      items: s.Elements,
    })),

  "components.text-media-banner": z
    .object({
      ...responsiveImageFields,
      id: z.number(),
      Title: text,
      Content: text,
    })
    .transform((s) => ({
      kind: "text-media-banner" as const,
      id: s.id,
      title: s.Title,
      text: s.Content,
      image: responsiveImage(s),
    })),

  "components.text-media": z
    .object({
      ...responsiveImageFields,
      id: z.number(),
      Title: text,
      Content: text,
      Position: imagePosition,
    })
    .transform((s) => ({
      kind: "text-media" as const,
      id: s.id,
      title: s.Title,
      text: s.Content,
      image: responsiveImage(s),
      imagePosition: s.Position,
    })),

  "components.locations-highlights": z
    .object({
      id: z.number(),
      Elements: list(
        z
          .object({ City: text, Tag: z.string().nullish(), Image: mediaSchema })
          .transform((e) => ({
            city: e.City,
            anchor: officeAnchor(e.Tag ?? ""),
            image: e.Image,
          }))
      ),
    })
    .transform((s) => ({
      kind: "locations-highlights" as const,
      id: s.id,
      items: s.Elements,
    })),

  "components.locations": z
    .object({
      id: z.number(),
      locations: list(
        z
          .object({
            city: text,
            Tag: z.string().nullish(),
            address: z.string().nullish(),
            phone: z.union([z.string(), z.number()]).nullish(),
            Email: z.string().nullish(),
            Latitude: z.number().nullish(),
            Longitude: z.number().nullish(),
            Position: imagePosition,
          })
          .transform((o) => ({
            city: o.city,
            anchor: officeAnchor(o.Tag ?? ""),
            // The first line is the office's name.
            addressLines: toLines(o.address),
            // Each office's number is formatted for its country, which is the city field.
            phone: formatPhone(o.phone, o.city),
            email: o.Email?.trim() || null,
            coordinates:
              o.Latitude != null && o.Longitude != null
                ? { lat: o.Latitude, lng: o.Longitude }
                : null,
            imagePosition: o.Position,
          }))
      ),
    })
    .transform((s) => ({
      kind: "locations" as const,
      id: s.id,
      offices: s.locations,
    })),

  "components.contact-form": z
    .object({ id: z.number(), Title: text, Content: text })
    .transform((s) => ({
      kind: "contact-form" as const,
      id: s.id,
      title: s.Title,
      text: s.Content,
    })),
};

type SectionSchemas = typeof sectionSchemas;

/** A section of a page, as its component receives it. */
export type Section = {
  [K in keyof SectionSchemas]: z.output<SectionSchemas[K]>;
}[keyof SectionSchemas];

export type SectionOf<K extends Section["kind"]> = Extract<
  Section,
  { kind: K }
>;

const isKnown = (type: string): type is keyof SectionSchemas =>
  type in sectionSchemas;

/**
 * Parses a page's dynamic zone. Section types the site has no component for are skipped,
 * as before; a known section whose data has the wrong shape throws, so the problem shows
 * up in the build instead of as a broken page.
 */
export const parseSections = (
  modules: { __component: string; [field: string]: unknown }[]
): Section[] =>
  modules.flatMap((module) =>
    isKnown(module.__component)
      ? [
          parseCms(
            sectionSchemas[module.__component],
            module,
            `section ${module.__component}`
          ),
        ]
      : []
  );
