import { NextJSStaticPathType, PageType } from "@/utils/baseTypes";
import { fetchData } from "@/utils/fetchData";

export const getAllPaths = async (): Promise<NextJSStaticPathType[]> => {
  const paths: NextJSStaticPathType[] = [];
  const url = `${process.env.NEXT_PUBLIC_API_URL}/pages`;

  try {
    const res: PageType[] | null = await fetchData(url);
    if (res) {
      res.forEach((page) => {
        const slug = page.attributes.Slug;
        if (slug) {
          paths.push({
            params: { dynamicRoute: [slug.replace(/^\//, "")] },
          });
        }
      });
    } else {
      console.error("No data returned from fetchData");
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }

  return paths;
};
