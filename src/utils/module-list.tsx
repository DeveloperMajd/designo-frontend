import {
  HomepageBanner,
  HomepageBannerType,
} from "@/components/HomepageBanner";
import {
  InfoHighlights,
  InfoHighlightsType,
} from "@/components/InfoHighlights";
import {
  LocationsHighlights,
  LocationsHighlightsType,
} from "@/components/LocationsHighlights";
import { PageBanner, PageBannerType } from "@/components/PageBanner";
import { ProjectsCards, ProjectsCardsType } from "@/components/ProjectsCards";
import { ProjectsGrid, projectsGridType } from "@/components/ProjectsGrid";
import { TextMedia, TextMediaType } from "@/components/TextMedia";
import {
  TextMediaBanner,
  TextMediaBannerType,
} from "@/components/TextMediaBanner";
import { LabelsType } from "./baseTypes";
import { LocationsType } from "@/components/Locations";
import dynamic from "next/dynamic";
import { ContactForm, ContactFormType } from "@/components/ContactForm";

const Locations = dynamic(() => import("@/components/Locations"), {
  ssr: false,
});

export type ModulesType =
  | HomepageBannerType
  | projectsGridType
  | InfoHighlightsType
  | PageBannerType
  | ProjectsCardsType
  | TextMediaBannerType
  | TextMediaType
  | LocationsHighlightsType
  | LocationsType
  | ContactFormType;

interface ModulesProps {
  module: ModulesType;
  labels: LabelsType;
}

export const Modules = (props: ModulesProps) => {
  switch (props.module.__component) {
    case "components.homepage-banner":
      return <HomepageBanner data={props.module} />;
    case "components.project-grids":
      return <ProjectsGrid data={props.module} />;
    case "components.info-highlights":
      return <InfoHighlights data={props.module} />;
    case "components.page-banner":
      return <PageBanner data={props.module} />;
    case "components.project-cards":
      return <ProjectsCards data={props.module} />;
    case "components.text-media-banner":
      return <TextMediaBanner data={props.module} />;
    case "components.text-media":
      return <TextMedia data={props.module} />;
    case "components.locations-highlights":
      return <LocationsHighlights data={props.module} labels={props.labels} />;
    case "components.locations":
      return <Locations data={props.module} labels={props.labels} />;
    case "components.contact-form":
      return <ContactForm data={props.module} />;
    default:
      return null;
  }
};
