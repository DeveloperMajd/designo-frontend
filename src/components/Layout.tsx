import type { ReactNode } from "react";
import type { SiteData } from "@/lib/cms/site";
import { LabelsProvider } from "@/lib/labels";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";

interface LayoutProps {
  site: SiteData;
  /** The "Let's talk" box above the footer; the contact page leaves it out. */
  showContactShowcase?: boolean;
  children: ReactNode;
}

/** The frame around every page: navigation, the page itself, and the footer. */
export const Layout = ({
  site,
  showContactShowcase = true,
  children,
}: LayoutProps) => (
  <LabelsProvider labels={site.labels}>
    <Navbar menu={site.menu} />
    <main>{children}</main>
    <Footer
      showContactShowcase={showContactShowcase}
      menu={site.menu}
      contact={site.contact}
    />
  </LabelsProvider>
);
