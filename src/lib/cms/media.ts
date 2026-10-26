import { z } from "zod";
import { apiUrl } from "./client";

export type Media = { src: string; alt: string; width: number; height: number };

/** One image per breakpoint; any of them may be missing. */
export type ResponsiveMedia = {
  desktop: Media | null;
  tablet: Media | null;
  mobile: Media | null;
};

/** Uploads are served by Strapi, so relative URLs get the Strapi host (the API URL without /api). */
export const mediaUrl = (url: string) =>
  /^(https?:)?\/\/|^data:/.test(url)
    ? url
    : `${apiUrl().replace(/\/api\/?$/, "")}${url}`;

/**
 * A Strapi media field. It is null when the editor left it empty, and also when the upload
 * has no dimensions (next/image needs them), so components never get half an image.
 */
export const mediaSchema = z
  .object({
    data: z
      .object({
        attributes: z.object({
          url: z.string(),
          alternativeText: z.string().nullish(),
          width: z.number().nullish(),
          height: z.number().nullish(),
        }),
      })
      .nullish(),
  })
  .nullish()
  .transform((field): Media | null => {
    const image = field?.data?.attributes;
    if (!image?.width || !image.height) return null;
    return {
      src: mediaUrl(image.url),
      alt: image.alternativeText ?? "",
      width: image.width,
      height: image.height,
    };
  });
