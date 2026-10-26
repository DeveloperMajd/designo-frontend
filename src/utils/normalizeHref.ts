const HAS_SCHEME = /^[a-z][a-z\d+.-]*:/i;
const LOOKS_LIKE_DOMAIN = /^[a-z\d-]+(\.[a-z\d-]+)*\.[a-z]{2,}(?=[/?#]|$)/i;

/**
 * Links in the CMS are typed by hand: "/about", "https://x.com" or just "x.com". Without
 * a scheme, a domain is read as a path on this site ("/x.com", a 404), so anything that
 * looks like a domain gets https:// in front. Site paths, anchors and other schemes
 * (mailto:, tel:) are left as they are.
 */
export const normalizeHref = (url: string) =>
  !HAS_SCHEME.test(url) && LOOKS_LIKE_DOMAIN.test(url) ? `https://${url}` : url;
