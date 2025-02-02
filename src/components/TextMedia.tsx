"use client";

import useWindowSize from "../hooks/useWindowSize";

import BgPattern from "../assets/images/shared/desktop/bg-pattern-three-circles.svg";
import { ImageType } from "@/utils/baseTypes";
import { MediaItem } from "./Global/MediaItem";
import { motion } from "framer-motion";
import { fadeInLeft, fadeInRight, scaleDown } from "@/utils/transistions";

export type TextMediaType = {
  __component: "components.text-media";
  id: string;
  Title: string;
  Content: string;
  Image: ImageType;
  ImageMobile: ImageType;
  ImageTablet: ImageType;
  Position: "img-left" | "img-right";
};

interface TextMediaProp {
  data: TextMediaType;
}

export const TextMedia = ({ data }: TextMediaProp) => {
  const { Title, Content, Image, ImageMobile, ImageTablet } = data;

  const { width } = useWindowSize();
  const isMobile = width <= 768;
  const isTablet = width > 768 && width < 1024;
  const isDesktop = width >= 1024;

  return (
    <section className="text-media is-full-width">
      <div className="container">
        <div className={`columns is-multiline ${data.Position}`}>
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
          <div
            className={`column is-12-mobile is-12-tablet is-7-desktop text-column ${data.Position}`}
          >
            <div className={`bg-pattern-wrapper ${data.Position}`}>
              <BgPattern />
            </div>
            <motion.div
              variants={data.Position === "img-left" ? fadeInRight : fadeInLeft}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: true }}
              className="text-content"
            >
              <div className="title h5">{Title}</div>
              <div dangerouslySetInnerHTML={{ __html: Content }} />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
