import { HomepageBannerType } from "@/components/HomepageBanner";
import { InfoHighlightsType } from "@/components/InfoHighlights";
import { PageBannerType } from "@/components/PageBanner";
import { ProjectsCardsType } from "@/components/ProjectsCards";
import { projectsGridType } from "@/components/ProjectsGrid";
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

export type LabelType = {
  attributes: {
    label: {
      Name: string;
      Value: string;
    };
  };
};
