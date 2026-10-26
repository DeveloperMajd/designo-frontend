import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { getPage, getPageSlugs, type Page } from "@/lib/cms/pages";
import { getSiteData, type SiteData } from "@/lib/cms/site";
import { LabelsProvider } from "@/lib/labels";
import { Modules } from "@/utils/module-list";
import {
  HOME_SLUG,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TAGLINE,
  SITE_URL,
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
  const url = isHome ? SITE_URL : `${SITE_URL}/${page.slug}`;

  return (
    <LabelsProvider labels={site.labels}>
      <Head>
        <title>{title}</title>
        <meta name="description" content={SITE_DESCRIPTION} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link rel="canonical" href={url} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={SITE_DESCRIPTION} />
        <meta property="og:url" content={url} />
      </Head>
      <main>
        <Navbar menu={site.menu} />
        {page.sections.map((section) => (
          <Modules key={`${section.kind}-${section.id}`} section={section} />
        ))}
        <Footer
          showContactShowcase={page.slug !== "contact"}
          menu={site.menu}
          contact={site.contact}
        />
      </main>
    </LabelsProvider>
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
