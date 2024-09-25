import {
  HomepageBanner,
  HomepageBannerType,
} from "@/components/HomepageBanner";
import {
  InfoHighlights,
  InfoHighlightsType,
} from "@/components/InfoHighlights";
import { ProjectsGrid, projectsGridType } from "@/components/ProjectsGrid";

interface ModulesProps {
  module: HomepageBannerType | projectsGridType | InfoHighlightsType;
}
export const Modules = (props: ModulesProps) => {
  switch (props.module.__component) {
    case "components.homepage-banner":
      return <HomepageBanner data={props.module} />;
    case "components.project-grids":
      return <ProjectsGrid data={props.module} />;
    case "components.info-highlights":
      return <InfoHighlights data={props.module} />;
    default:
      return null;
  }
};
