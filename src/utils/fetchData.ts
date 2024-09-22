import { PageType } from "./baseTypes";

export const fetchData = async (url: string): Promise<PageType[]> => {
  try {
    const res = await fetch(url);
    const json = await res.json();
    return json.data;
  } catch (error) {
    console.error("🚀 ~ fetchData ~ error:", error);
    return [
      {
        id: 0,
        attributes: {
          Slug: "",
          Title: "",
          Module: [],
        },
      },
    ];
  }
};
