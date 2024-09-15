import BgPattern from "../assets/images/home/desktop/bg-pattern-hero-home.svg";
import BgShape from "../assets/images/shared/desktop/bg-pattern-leaf.svg";
import { ImageType, LinkType } from "@/utils/baseTypes";
import Link from "next/link";
import { MediaItem } from "./Global/MediaItem";

export type HomepageBannerType = {
  __component: "components.homepage-banner";
  headline: string;
  text: string;
  image: ImageType;
  link: LinkType;
};

interface HomepageBannerProps {
  data: HomepageBannerType;
}

export const HomepageBanner = ({ data }: HomepageBannerProps) => {
  const { headline, text, image, link } = data;

  return (
    <section className="content-showcase is-full-width">
      <div className="container">
        <div className="content-wrapper">
          <div className="bg-pattern-wrapper">
            <BgPattern />
          </div>

          <div className="columns">
            <div className="column is-12-tablet is-6-desktop text-col">
              <h1>{headline}</h1>
              <p>{text}</p>
              <div className="btn-wrapper">
                <Link
                  href={link.url}
                  target={link.target}
                  className="btn onDark"
                >
                  {link.title}
                </Link>
              </div>
            </div>
            <div className="column is-12-tablet is-6-desktop img-col">
              <MediaItem imageData={image} />
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
