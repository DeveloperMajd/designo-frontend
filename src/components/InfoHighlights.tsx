import { ImageType } from "@/utils/baseTypes";
import { MediaItem } from "./Global/MediaItem";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { fadeInLeft } from "@/utils/transistions";
import React, { useEffect, useState } from "react";
import BgShape from "../assets/images/shared/desktop/bg-pattern-leaf.svg";

export type InfoHighlightsType = {
  __component: "components.info-highlights";
  Elements: {
    title: string;
    content: string;
    Image: ImageType;
  }[];
};

interface InfoHighlightsProps {
  data: InfoHighlightsType;
}

interface HighlightItemProps {
  title: string;
  content: string;
  Image: ImageType;
  index: number;
  currentIndex: number;
  triggerNext: () => void;
}

const HighlightItem = ({
  title,
  content,
  Image,
  index,
  currentIndex,
  triggerNext,
}: HighlightItemProps) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  useEffect(() => {
    if (inView && index === currentIndex) {
      controls.start("show");
    }
  }, [inView, controls, index, currentIndex]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={fadeInLeft}
      className="column is-12-tablet is-4-desktop"
      onAnimationComplete={() => {
        if (index === currentIndex) triggerNext();
      }}
    >
      <div className="img-wrapper">
        <span className="overlay" />
        <MediaItem imageData={Image} />
      </div>
      <div className="content">
        <div className="title h3">{title}</div>
        <div className="description">{content}</div>
      </div>
    </motion.div>
  );
};

export const InfoHighlights = ({ data }: InfoHighlightsProps) => {
  const { Elements } = data;
  const [currentIndex, setCurrentIndex] = useState(0);

  const triggerNext = () => {
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  return (
    <section className="info-highlights">
      <div className="container">
        <div className="columns">
          {Elements.map((element, index) => (
            <HighlightItem
              key={index}
              title={element.title}
              content={element.content}
              Image={element.Image}
              index={index}
              currentIndex={currentIndex}
              triggerNext={triggerNext}
            />
          ))}
        </div>
      </div>
      <div className="bg-pattern is-right-bottom is-hidden-touch">
        <BgShape />
      </div>
    </section>
  );
};
