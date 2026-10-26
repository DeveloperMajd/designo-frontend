import { z } from "zod";
import { formatPhone, type Phone } from "@/utils/formatPhoneNumber";
import { cmsGet, parseCms } from "./client";
import { type Link, linkSchema } from "./links";
import { mediaUrl } from "./media";
import { toLines, toText } from "./text";

/** What every page shows besides its own sections: the menu, the footer and the interface labels. */
export type SiteData = {
  menu: Link[];
  contact: {
    addressLines: string[];
    phone: Phone | null;
    email: string | null;
    socials: { platform: string; link: Link; icon: string }[];
  };
  labels: Record<string, string>;
};

const menusSchema = z.array(
  z.object({
    attributes: z.object({
      slug: z.string().nullish(),
      items: z
        .object({
          data: z.array(
            z.object({
              attributes: z.object({
                order: z.number().nullish(),
                url: z.string().nullish(),
                title: z.string().nullish(),
                target: z.string().nullish(),
              }),
            })
          ),
        })
        .nullish(),
    }),
  })
);

// Icons are injected as inline SVG, so they only need a URL, not dimensions.
const iconSchema = z
  .object({
    data: z.object({ attributes: z.object({ url: z.string() }) }).nullish(),
  })
  .nullish()
  .transform((icon) =>
    icon?.data ? mediaUrl(icon.data.attributes.url) : null
  );

const contactSchema = z.object({
  attributes: z.object({
    address: z.string().nullish(),
    phone: z.union([z.string(), z.number()]).nullish(),
    email: z.string().nullish(),
    socials: z
      .array(
        z.object({
          platform: z.string().nullish(),
          link: linkSchema,
          icon: iconSchema,
        })
      )
      .nullish(),
  }),
});

const labelsSchema = z.array(
  z.object({
    attributes: z.object({
      label: z
        .object({ Name: z.string().nullish(), Value: z.string().nullish() })
        .nullish(),
    }),
  })
);

/**
 * Loads the menu, contact details and labels in parallel. Any failure throws: a page built
 * without its menu or footer must not replace the last good copy.
 */
export async function getSiteData(): Promise<SiteData> {
  const [menus, contact, labels] = await Promise.all([
    cmsGet("menus", { populate: { items: { populate: "*" } } }),
    cmsGet("contact", { populate: { socials: { populate: "*" } } }),
    cmsGet("labels", { populate: "*" }),
  ]);

  const mainMenu = parseCms(menusSchema, menus, "menus").find(
    (menu) => menu.attributes.slug === "main-menu"
  );
  const menu = (mainMenu?.attributes.items?.data ?? [])
    .map(({ attributes }) => attributes)
    .toSorted((a, b) => (a.order ?? 0) - (b.order ?? 0))
    .flatMap((item) => {
      const link = linkSchema.parse(item);
      return link ? [link] : [];
    });

  const { attributes } = parseCms(contactSchema, contact, "contact");

  return {
    menu,
    contact: {
      addressLines: toLines(attributes.address),
      // The central office's number has always been formatted as a German one.
      phone: formatPhone(attributes.phone, "Germany"),
      email: attributes.email?.trim() || null,
      socials: (attributes.socials ?? []).flatMap((social) =>
        social.link && social.icon
          ? [
              {
                platform: toText(social.platform),
                link: social.link,
                icon: social.icon,
              },
            ]
          : []
      ),
    },
    labels: Object.fromEntries(
      parseCms(labelsSchema, labels, "labels").flatMap(({ attributes }) =>
        attributes.label?.Name
          ? [[attributes.label.Name, toText(attributes.label.Value)]]
          : []
      )
    ),
  };
}
