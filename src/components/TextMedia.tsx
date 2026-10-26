"use client";

import useWindowSize from "../hooks/useWindowSize";

import BgPattern from "../assets/images/shared/desktop/bg-pattern-three-circles.svg";
import type { SectionOf } from "@/lib/cms/sections";
import { MediaItem, forViewport } from "./Global/MediaItem";
import { motion } from "motion/react";
import { fadeInLeft, fadeInRight, scaleDown } from "@/utils/transistions";

interface TextMediaProp {
  data: SectionOf<"text-media">;
}

export const TextMedia = ({ data }: TextMediaProp) => {
  const { title, text, image, imagePosition } = data;
  const position = `img-${imagePosition}`;

  const { width } = useWindowSize();
  const isMobile = width <= 768;
  const isTablet = width > 768 && width < 1024;

  return (
    <section className="text-media is-full-width">
      <div className="container">
        <div className={`columns is-multiline ${position}`}>
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
          <div
            className={`column is-12-mobile is-12-tablet is-7-desktop text-column ${position}`}
          >
            <div className={`bg-pattern-wrapper ${position}`}>
              <BgPattern />
            </div>
            <motion.div
              variants={imagePosition === "left" ? fadeInRight : fadeInLeft}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: true }}
              className="text-content"
            >
              <div className="title h5">{title}</div>
              <div>{text}</div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
