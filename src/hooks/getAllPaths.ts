import { NextJSStaticPathType, PageType } from "@/utils/baseTypes";
import { fetchData } from "@/utils/fetchData";

export const getAllPaths = async (): Promise<NextJSStaticPathType[]> => {
  let paths: NextJSStaticPathType[] = [];
  const url = `${process.env.NEXT_PUBLIC_API_URL}/pages`;

  await fetchData(url).then((res: PageType[]) => {
    res.forEach((page) => {
      const slug = page.attributes.Slug;
      if (slug) {
        paths.push({
          params: { dynamicRoute: [slug.replace("/", "")] },
        });
      }
    });
  });

  return paths;
};
