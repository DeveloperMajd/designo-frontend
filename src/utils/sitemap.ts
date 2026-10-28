import { pageUrl } from "./site";

const escapeXml = (text: string) =>
  text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** A sitemap (sitemaps.org) listing the pages with these CMS slugs. */
export const buildSitemap = (slugs: string[]) =>
  [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
    ...slugs.map(
      (slug) => `  <url><loc>${escapeXml(pageUrl(slug))}</loc></url>`
    ),
    `</urlset>`,
    "",
  ].join("\n");
