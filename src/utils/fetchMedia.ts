export function getStrapiURL() {
  const rawUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:1337";
  return rawUrl.replace(/\/api\/?$/, ""); // Removes trailing /api or /api/
}

export function getStrapiMedia(url: string | null) {
  if (url == null) return null;
  if (url.startsWith("data:")) return url;
  if (url.startsWith("http") || url.startsWith("//")) return url;
  return `${getStrapiURL()}${url}`;
}
