import { z } from "zod";
import { normalizeHref } from "@/utils/normalizeHref";
import { toText } from "./text";

export type Link = { href: string; label: string; newTab: boolean };

/** A link component from the CMS; null when it has no URL. */
export const linkSchema = z
  .object({
    url: z.string().nullish(),
    title: z.string().nullish(),
    target: z.string().nullish(),
  })
  .nullish()
  .transform((link): Link | null =>
    link?.url
      ? {
          href: normalizeHref(link.url.trim()),
          label: toText(link.title),
          newTab: link.target === "_blank",
        }
      : null
  );
