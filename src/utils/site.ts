export const SITE_NAME = "Designo";
export const SITE_URL = "https://designo.developermajd.com";

// Shown next to the site name on the home page, taken from the home hero copy.
export const SITE_TAGLINE = "Award-winning custom designs and digital branding";

/** The CMS calls the home page "startpage". Kept here, not in lib/cms, so the page can use
 *  it without pulling the CMS client and its schemas into the browser bundle. */
export const HOME_SLUG = "startpage";

/** A page's public URL; the home page is served at the root, not at /startpage. */
export const pageUrl = (slug: string) =>
  slug === HOME_SLUG ? SITE_URL : `${SITE_URL}/${slug}`;

export const SITE_DESCRIPTION =
  "Designo creates custom websites, app designs and graphic design for growing businesses. Explore our work, learn about the company and get in touch.";
