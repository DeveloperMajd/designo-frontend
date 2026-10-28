import BgImage from "../assets/images/shared/desktop/bg-pattern-call-to-action.svg";
import BgShape from "../assets/images/shared/desktop/bg-pattern-leaf.svg";
import type { SectionOf } from "@/lib/cms/sections";

interface PageBannerProps {
  data: SectionOf<"page-banner">;
}

export const PageBanner = ({ data }: PageBannerProps) => {
  const { title, text } = data;

  return (
    <section className="page-banner is-full-width">
      <div className="container">
        <div className="bg-wrapper">
          <BgImage />
        </div>
        <div className="columns is-multiline is-centered content-wrapper m-0">
          <div className="column is-12-mobile is-10-tablet is-6-desktop is-5-fullhd content enter-from-below">
            <div className="title h4" role="heading" aria-level={1}>
              {title}
            </div>
            <div className="text">{text}</div>
          </div>
        </div>
      </div>
      {/* Todo: add condition props (has-bg-shape) */}
      <div className="bg-pattern is-left-bottom is-hidden-touch">
        <BgShape />
      </div>
    </section>
  );
};
