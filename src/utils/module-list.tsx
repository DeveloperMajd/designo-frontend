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

interface ModulesProps {
  module:
    | HomepageBannerType
    | projectsGridType
    | InfoHighlightsType
    | PageBannerType
    | ProjectsCardsType;
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
    default:
      return null;
  }
};
