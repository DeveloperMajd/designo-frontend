import {
  HomepageBanner,
  HomepageBannerType,
} from "@/components/HomepageBanner";
import {
  InfoHighlights,
  InfoHighlightsType,
} from "@/components/InfoHighlights";
import { PageBanner, PageBannerType } from "@/components/PageBanner";
import { ProjectsCards, ProjectsCardsType } from "@/components/ProjectsCards";
import { ProjectsGrid, projectsGridType } from "@/components/ProjectsGrid";
import { TextMedia, TextMediaType } from "@/components/TextMedia";
import {
  TextMediaBanner,
  TextMediaBannerType,
} from "@/components/TextMediaBanner";

export type ModulesType =
  | HomepageBannerType
  | projectsGridType
  | InfoHighlightsType
  | PageBannerType
  | ProjectsCardsType
  | TextMediaBannerType
  | TextMediaType;

interface ModulesProps {
  module: ModulesType;
}

export const Modules = (props: ModulesProps) => {
  console.log("🚀 ~ Modules ~ props:", props);
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

    default:
      return null;
  }
};
