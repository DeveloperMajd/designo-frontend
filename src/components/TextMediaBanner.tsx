import BgPatternDesktop from "../assets/images/about/desktop/bg-pattern-hero-about-desktop.svg";
import BgPatternMobile from "../assets/images/about/mobile/bg-pattern-hero-about-mobile.svg";

import BgShape from "../assets/images/shared/desktop/bg-pattern-leaf.svg";
import type { SectionOf } from "@/lib/cms/sections";
import { ResponsiveMediaItem } from "./Global/MediaItem";

interface TextMediaBannerProps {
  data: SectionOf<"text-media-banner">;
}

export const TextMediaBanner = ({ data }: TextMediaBannerProps) => {
  const { title, text, image } = data;

  return (
    <section className="text-media-banner is-full-width">
      <div className="container">
        <div className="columns is-multiline">
          <div className="column is-12-mobile is-12-tablet is-5-desktop img-column p-0">
            <div className="media-wrapper enter-scale-down">
              <ResponsiveMediaItem
                image={image}
                sizes="(max-width: 1023px) 100vw, 40vw"
                priority
              />
            </div>
          </div>
          <div className="column is-12-mobile is-12-tablet is-7-desktop text-column">
            <div className="bg-pattern-wrapper">
              <BgPatternDesktop className="is-hidden-mobile" />
              <BgPatternMobile className="is-hidden-tablet" />
            </div>
            <div className="text-content enter-from-left">
              <h1>{title}</h1>
              <div>{text}</div>
            </div>
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
