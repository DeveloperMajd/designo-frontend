import BgPattern from "../assets/images/home/desktop/bg-pattern-hero-home.svg";
import BgShape from "../assets/images/shared/desktop/bg-pattern-leaf.svg";
import type { SectionOf } from "@/lib/cms/sections";
import Link from "next/link";
import { MediaItem } from "./Global/MediaItem";

interface HomepageBannerProps {
  data: SectionOf<"homepage-banner">;
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
            <div className="column is-12-tablet is-6-desktop text-col enter-from-left">
              <h1>{headline}</h1>
              <p>{text}</p>
              {link && (
                <div className="btn-wrapper">
                  <Link
                    href={link.href}
                    target={link.newTab ? "_blank" : undefined}
                    className="btn onDark"
                  >
                    {link.label}
                  </Link>
                </div>
              )}
            </div>
            <div className="column is-12-tablet is-6-desktop img-col">
              {/* The wrapper places the image for each viewport; the inner div animates it. */}
              <div className="img-wrapper">
                <div className="enter-from-below">
                  <MediaItem image={image} priority />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-pattern is-left-bottom is-hidden-touch">
        <BgShape />
      </div>
    </section>
  );
};
