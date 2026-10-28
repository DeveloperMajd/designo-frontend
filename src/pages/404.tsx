import Head from "next/head";
import Link from "next/link";
import type { GetStaticPropsResult } from "next";
import { Layout } from "@/components/Layout";
import { getSiteData, type SiteData } from "@/lib/cms/site";
import { useLabel } from "@/lib/labels";
import { SITE_NAME } from "@/utils/site";

const NotFound = () => {
  const title = useLabel("not-found-title", "Page not found");
  const text = useLabel(
    "not-found-text",
    "The page you are looking for does not exist or has moved."
  );
  const link = useLabel("not-found-link", "Go home");

  return (
    <>
      <Head>
        <title>{`${title} | ${SITE_NAME}`}</title>
        <meta name="robots" content="noindex" />
      </Head>
      <section className="page-banner is-full-width">
        <div className="container">
          <div className="columns is-multiline is-centered content-wrapper m-0">
            <div className="column is-12-mobile is-10-tablet is-6-desktop content enter-from-below">
              <div className="title h4" role="heading" aria-level={1}>
                {title}
              </div>
              <div className="text">{text}</div>
              <div className="is-flex is-justify-content-center mt-5">
                <Link href="/" className="btn onDark">
                  {link}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default function NotFoundPage({ site }: { site: SiteData }) {
  return (
    <Layout site={site}>
      <NotFound />
    </Layout>
  );
}

// Built once with the rest of the site; the navigation and footer come from the CMS.
export async function getStaticProps(): Promise<
  GetStaticPropsResult<{ site: SiteData }>
> {
  return { props: { site: await getSiteData() } };
}
