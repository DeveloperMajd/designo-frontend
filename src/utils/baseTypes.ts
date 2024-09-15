export type PageType = {
  id: number;
  attributes: {
    Slug: string;
    Title: string;
    Module: any[];
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
