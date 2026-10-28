import { Layout } from "@/components/Layout";
import { getPage, getPageSlugs, type Page } from "@/lib/cms/pages";
import { getSiteData, type SiteData } from "@/lib/cms/site";
import { hasPageHeading, Modules } from "@/utils/module-list";
import {
  HOME_SLUG,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TAGLINE,
  pageUrl,
} from "@/utils/site";
import {
  GetStaticPathsResult,
  GetStaticPropsContext,
  GetStaticPropsResult,
} from "next";

import Head from "next/head";

const REVALIDATE_SECONDS = 120;

interface DynamicPageProps {
  page: Page;
  site: SiteData;
}

export default function DynamicPage({ page, site }: DynamicPageProps) {
  // The CMS calls the home page "startpage", which is not something to show in a tab.
  const isHome = page.slug === HOME_SLUG;
  const title = isHome
    ? `${SITE_NAME} | ${SITE_TAGLINE}`
    : `${page.title} | ${SITE_NAME}`;
  const url = pageUrl(page.slug);

  return (
    <Layout site={site} showContactShowcase={page.slug !== "contact"}>
      <Head>
        <title>{title}</title>
        <meta name="description" content={SITE_DESCRIPTION} />
        <link rel="canonical" href={url} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={SITE_DESCRIPTION} />
        <meta property="og:url" content={url} />
      </Head>
      {/* Every page needs a main heading; one without a banner gets a hidden one. */}
      {!hasPageHeading(page.sections) && (
        <h1 className="is-sr-only">{page.title}</h1>
      )}
      {page.sections.map((section) => (
        <Modules key={`${section.kind}-${section.id}`} section={section} />
      ))}
    </Layout>
  );
}

// If the CMS cannot be reached, these throw: a build then fails and leaves the previous
// deployment live, and a revalidation keeps serving the last good copy of the page.

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
  const slugs = await getPageSlugs();
  return {
    paths: slugs.map((slug) => ({
      params: { dynamicRoute: slug === HOME_SLUG ? [] : [slug] },
    })),
    fallback: "blocking",
  };
}

export async function getStaticProps(
  context: GetStaticPropsContext<{ dynamicRoute?: string[] }>
): Promise<GetStaticPropsResult<DynamicPageProps>> {
  const slug = context.params?.dynamicRoute?.join("/") || HOME_SLUG;
  const [page, site] = await Promise.all([getPage(slug), getSiteData()]);

  // The CMS answered and there is no such page: a real 404, not an empty page.
  if (!page) {
    return { notFound: true, revalidate: REVALIDATE_SECONDS };
  }

  return { props: { page, site }, revalidate: REVALIDATE_SECONDS };
}
