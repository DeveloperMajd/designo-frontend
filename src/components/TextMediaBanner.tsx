"use client";

import useWindowSize from "../hooks/useWindowSize";

import BgPatternDesktop from "../assets/images/about/desktop/bg-pattern-hero-about-desktop.svg";
import BgPatternMobile from "../assets/images/about/mobile/bg-pattern-hero-about-mobile.svg";

import BgShape from "../assets/images/shared/desktop/bg-pattern-leaf.svg";
import { ImageType } from "@/utils/baseTypes";
import { MediaItem } from "./Global/MediaItem";
import { motion } from "framer-motion";
import { fadeInLeft, scaleDown } from "@/utils/transistions";

export type TextMediaBannerType = {
  __component: "components.text-media-banner";
  id: string;
  Title: string;
  Content: string;
  Image: ImageType;
  ImageMobile: ImageType;
  ImageTablet: ImageType;
};

interface TextMediaBannerProps {
  data: TextMediaBannerType;
}

export const TextMediaBanner = ({ data }: TextMediaBannerProps) => {
  const { Image, ImageMobile, ImageTablet, Title, Content } = data;

  const { width } = useWindowSize();
  const isMobile = width <= 768;
  const isTablet = width > 768 && width < 1024;
  const isDesktop = width >= 1024;

  return (
    <section className="text-media-banner is-full-width">
      <div className="container">
        <div className="columns is-multiline">
          <div className="column is-12-mobile is-12-tablet is-5-desktop img-column p-0">
            <motion.div
              variants={scaleDown}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: true }}
              className="media-wrapper"
            >
              <MediaItem
                imageData={
                  isMobile ? ImageMobile : isTablet ? ImageTablet : Image
                }
              />
            </motion.div>
          </div>
          <div className="column is-12-mobile is-12-tablet is-7-desktop text-column">
            <div className="bg-pattern-wrapper">
              {isDesktop || isTablet ? (
                <BgPatternDesktop />
              ) : (
                <BgPatternMobile />
              )}
            </div>
            <motion.div
              variants={fadeInLeft}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="text-content"
            >
              <h1>{Title}</h1>
              <div dangerouslySetInnerHTML={{ __html: Content }} />
            </motion.div>
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
