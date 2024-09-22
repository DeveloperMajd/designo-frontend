import {
  HomepageBanner,
  HomepageBannerType,
} from "@/components/HomepageBanner";
import { ProjectsGrid, projectsGridType } from "@/components/ProjectsGrid";

interface ModulesProps {
  module: HomepageBannerType | projectsGridType;
}
export const Modules = (props: ModulesProps) => {
  switch (props.module.__component) {
    case "components.homepage-banner":
      return <HomepageBanner data={props.module} />;
    case "components.project-grids":
      return <ProjectsGrid data={props.module} />;
    default:
      return null;
  }
};
