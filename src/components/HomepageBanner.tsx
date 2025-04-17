import BgPattern from "../assets/images/home/desktop/bg-pattern-hero-home.svg";
import BgShape from "../assets/images/shared/desktop/bg-pattern-leaf.svg";
import { ImageType, LinkType } from "@/utils/baseTypes";
import Link from "next/link";
import { MediaItem } from "./Global/MediaItem";
import { motion } from "framer-motion";
import {
  fadeInHomeImgDesk,
  fadeInHomeImgMob,
  fadeInHomeImgTab,
  fadeInLeft,
} from "@/utils/transistions";
import useWindowSize from "@/hooks/useWindowSize";

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

  const { width } = useWindowSize();

  const isDesktop = width >= 1024;
  const isTablet = width > 768 && width < 1024;

  return (
    <section className="content-showcase is-full-width">
      <div className="container">
        <div className="content-wrapper">
          <div className="bg-pattern-wrapper">
            <BgPattern />
          </div>

          <div className="columns">
            <motion.div
              initial="hidden"
              animate="show"
              variants={fadeInLeft}
              className="column is-12-tablet is-6-desktop text-col"
            >
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
            </motion.div>
            <div className="column is-12-tablet is-6-desktop img-col">
              <motion.div
                initial="hidden"
                animate="show"
                variants={
                  isDesktop
                    ? fadeInHomeImgDesk
                    : isTablet
                    ? fadeInHomeImgTab
                    : fadeInHomeImgMob
                }
                className="img-wrapper"
              >
                <MediaItem imageData={image} />
              </motion.div>
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
