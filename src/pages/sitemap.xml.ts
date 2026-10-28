import type { GetServerSideProps } from "next";
import { getPageSlugs } from "@/lib/cms/pages";
import { buildSitemap } from "@/utils/sitemap";

// Served at /sitemap.xml. It is built from the CMS on request, so a page published there
// shows up without a new deployment; the CDN keeps a copy for an hour.
export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const slugs = await getPageSlugs();

  res.setHeader("Content-Type", "application/xml; charset=utf-8");
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=3600, stale-while-revalidate=86400"
  );
  res.end(buildSitemap(slugs));

  return { props: {} };
};

export default function Sitemap() {
  return null;
}
