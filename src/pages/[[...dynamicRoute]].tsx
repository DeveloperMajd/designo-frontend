import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { getAllPaths } from "@/hooks/getAllPaths";
import { getContactData, getLabelsData, getMenuData } from "@/hooks/getData";
import { getPageData } from "@/hooks/getPageData";
import { ContactType, LabelType, MenuType, PageType } from "@/utils/baseTypes";
import { Modules } from "@/utils/module-list";
import {
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TAGLINE,
  SITE_URL,
} from "@/utils/site";
import { GetStaticPropsContext } from "next";

import Head from "next/head";

interface DynamicPageProps {
  pageData: PageType[];
  contactData: ContactType;
  menuData: MenuType[];
  labelsData: LabelType[];
}

export default function DynamicPage({
  pageData,
  contactData,
  menuData,
  labelsData,
}: DynamicPageProps) {
  const mainMenu = menuData?.find(
    (menu) => menu.attributes.slug === "main-menu"
  );

  const _labels = labelsData?.map((label) => {
    return {
      [label.attributes.label.Name]: label.attributes.label.Value,
    };
  });

  const page = pageData?.[0];
  const slug = page?.attributes.Slug;
  // The CMS calls the home page "StartPage", which is not something to show in a tab.
  const isHome = !slug || slug === "startpage";
  const title = isHome
    ? `${SITE_NAME} | ${SITE_TAGLINE}`
    : `${page?.attributes.Title} | ${SITE_NAME}`;
  const url = isHome ? SITE_URL : `${SITE_URL}/${slug}`;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={SITE_DESCRIPTION} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="canonical" href={url} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={SITE_DESCRIPTION} />
        <meta property="og:url" content={url} />
      </Head>
      <main>
        <Navbar mainMenu={mainMenu} />
        {page &&
          page.attributes.Module &&
          page.attributes.Module.map((module, index) => (
            <Modules key={index} module={module} labels={_labels} />
          ))}
        <Footer
          showContactShowcase={slug !== "contact"}
          contactData={contactData}
          mainMenu={mainMenu}
          labels={_labels}
        />
      </main>
    </>
  );
}

export async function getStaticPaths({}) {
  const allPaths = await getAllPaths();
  return {
    paths: allPaths,
    fallback: "blocking",
  };
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const { dynamicRoute }: any = context.params;

  const pageData = await getPageData(dynamicRoute);

  // The API did not answer. Throwing keeps serving the last good copy of a page that
  // was already generated, instead of replacing it with an empty page or a 404.
  if (!Array.isArray(pageData)) {
    throw new Error("Could not load page data from the API");
  }

  // The API answered and there is no such page: a real 404, not an empty page.
  if (pageData.length === 0) {
    return { notFound: true, revalidate: 120 };
  }

  const contactData = await getContactData();
  const menuData = await getMenuData();
  const labelsData = await getLabelsData();
  return {
    props: {
      pageData,
      contactData,
      menuData,
      labelsData,
    },
    revalidate: 120,
  };
}
