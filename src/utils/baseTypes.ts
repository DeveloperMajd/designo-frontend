import { ModulesType } from "./module-list";

export type PageType = {
  id: number;
  attributes: {
    Slug: string;
    Title: string;
    Module: ModulesType[];
  };
};

export type ContactType = {
  id: number;
  attributes: {
    address?: string;
    phone?: number;
    email?: string;
    Label: string;
    socials?: {
      icon: ImageType;
      link: LinkType;
      platform: string;
    }[];
  };
};

export type MenuItemType = {
  order: number;
  parent: {
    data: MenuItemType | null;
  };
  target: "_blank" | "_self";
  url: string;
  title: string;
};

export type MenuType = {
  id: number;
  attributes: {
    title: string;
    slug: string;
    items: {
      data: {
        id: number;
        attributes: MenuItemType;
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

export type LabelType = {
  attributes: {
    label: {
      Name: string;
      Value: string;
    };
  };
};

export type LabelsType = {
  [key: string]: string;
}[];
