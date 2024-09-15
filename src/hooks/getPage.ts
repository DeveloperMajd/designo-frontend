import { PageType } from "@/utils/baseTypes";
import { fetchData } from "@/utils/fetchData";

export const getPage = async (slug: string): Promise<PageType[] | null> => {
  const qs = require("qs");
  const query = qs.stringify({
    filters: {
      Slug: {
        $eq: slug || "startpage",
      },
    },
    populate: {
      Module: {
        populate: {
          Elements: {
            populate: "*",
          },
          image: {
            populate: "*",
          },
          link: {
            populate: "*",
          },
        },
      },
    },
  });

  // const url = `${process.env.NEXT_PUBLIC_API_URL}/pages?filters[Slug][$eq]=startpage&populate[Module][populate][Elements][populate]=*`;

  const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

  const url = `${BASE_URL}/pages?${query}`;

  console.log("🚀 ~ file: getPage.ts ~ line 20 ~ getPage ~ url", url);
  const response = await fetchData(url).then((res: PageType[]) => {
    return res;
  });

  return response;
};
