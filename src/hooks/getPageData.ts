import { PageType } from "@/utils/baseTypes";
import { getPage } from "./getData";

export async function getPageData(
  dynamicRoute: string[]
): Promise<PageType[] | null> {
  let pageData: PageType[] | null = null;

  if (!dynamicRoute) {
    pageData = await getPage("startpage");
  } else {
    const slug = dynamicRoute.join("/");
    pageData = await getPage(slug);
  }

  return pageData;
}
