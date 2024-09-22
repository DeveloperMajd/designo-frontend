import { ContactType, MenuType, PageType } from "@/utils/baseTypes";
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

  const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

  const url = `${BASE_URL}/pages?${query}`;

  const response = await fetchData<PageType[]>(url).then(
    (res: PageType[] | null) => {
      return res;
    }
  );

  return response;
};

export const getContactData = async (): Promise<ContactType | null> => {
  const qs = require("qs");
  const query = qs.stringify({
    populate: {
      socials: {
        populate: "*",
      },
    },
  });

  const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

  const url = `${BASE_URL}/contact?${query}`;

  const response = await fetchData<ContactType>(url).then(
    (res: ContactType | null) => {
      return res;
    }
  );

  return response;
};

export const getMenuData = async (): Promise<MenuType[] | null> => {
  const qs = require("qs");
  const query = qs.stringify({
    populate: {
      items: {
        populate: "*",
      },
    },
  });

  const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

  const url = `${BASE_URL}/menus?${query}`;

  const response = await fetchData<MenuType[]>(url).then(
    (res: MenuType[] | null) => {
      return res;
    }
  );

  return response;
};
