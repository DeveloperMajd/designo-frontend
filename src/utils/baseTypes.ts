export type PageType = {
  id: number;
  attributes: {
    Slug: string;
    Title: string;
    Module: any[];
  };
};

export type ContactType = {
  id: number;
  attributes: {
    address?: string;
    phone?: string;
    email?: string;
    Label: string;
    socials?: {
      icon: ImageType;
      link: LinkType;
      platform: string;
    }[];
  };
};

export type MenuType = {
  id: number;
  attributes: {
    title: string;
    slug: string;
    items: {
      data: {
        id: number;
        attributes: LinkType;
      }[];
    };
  };
};

export type ImageType = {
  data: {
    attributes: {
      url: string;
      alternativeText: string;
      width: number;
      height: number;
    };
  };
};

export type LinkType = {
  url: string;
  title: string;
  target: string;
};

export type NextJSStaticPathType = {
  params: { dynamicRoute: string[] };
};
