"use client";

import useWindowSize from "../hooks/useWindowSize";

import BgPatternDesktop from "../assets/images/about/desktop/bg-pattern-hero-about-desktop.svg";
import BgPatternMobile from "../assets/images/about/mobile/bg-pattern-hero-about-mobile.svg";

import BgShape from "../assets/images/shared/desktop/bg-pattern-leaf.svg";
import type { SectionOf } from "@/lib/cms/sections";
import { MediaItem, forViewport } from "./Global/MediaItem";
import { motion } from "motion/react";
import { fadeInLeft, scaleDown } from "@/utils/transistions";

interface TextMediaBannerProps {
  data: SectionOf<"text-media-banner">;
}

export const TextMediaBanner = ({ data }: TextMediaBannerProps) => {
  const { title, text, image } = data;

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
              <MediaItem image={forViewport(image, isMobile, isTablet)} />
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
              <h1>{title}</h1>
              <div>{text}</div>
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
