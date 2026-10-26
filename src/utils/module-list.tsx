import { HomepageBanner } from "@/components/HomepageBanner";
import { InfoHighlights } from "@/components/InfoHighlights";
import { LocationsHighlights } from "@/components/LocationsHighlights";
import { PageBanner } from "@/components/PageBanner";
import { ProjectsCards } from "@/components/ProjectsCards";
import { ProjectsGrid } from "@/components/ProjectsGrid";
import { TextMedia } from "@/components/TextMedia";
import { TextMediaBanner } from "@/components/TextMediaBanner";
import Locations from "@/components/Locations";
import { ContactForm } from "@/components/ContactForm";
import type { Section } from "@/lib/cms/sections";

/** Renders one section of a page with its component. */
export const Modules = ({ section }: { section: Section }) => {
  switch (section.kind) {
    case "homepage-banner":
      return <HomepageBanner data={section} />;
    case "project-grids":
      return <ProjectsGrid data={section} />;
    case "info-highlights":
      return <InfoHighlights data={section} />;
    case "page-banner":
      return <PageBanner data={section} />;
    case "project-cards":
      return <ProjectsCards data={section} />;
    case "text-media-banner":
      return <TextMediaBanner data={section} />;
    case "text-media":
      return <TextMedia data={section} />;
    case "locations-highlights":
      return <LocationsHighlights data={section} />;
    case "locations":
      return <Locations data={section} />;
    case "contact-form":
      return <ContactForm data={section} />;
    default:
      // A section type in lib/cms/sections.ts without a component here fails the type check.
      section satisfies never;
      return null;
  }
};
