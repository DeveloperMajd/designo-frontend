import type { SectionOf } from "@/lib/cms/sections";
import { MediaItem } from "./Global/MediaItem";
import { motion, useAnimation } from "motion/react";
import { useInView } from "react-intersection-observer";
import { fadeInLeft } from "@/utils/transistions";
import { useEffect, useState } from "react";
import BgShape from "../assets/images/shared/desktop/bg-pattern-leaf.svg";

type Highlight = SectionOf<"info-highlights">["items"][number];

interface HighlightItemProps {
  item: Highlight;
  index: number;
  currentIndex: number;
  triggerNext: () => void;
}

const HighlightItem = ({
  item,
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
        <MediaItem image={item.image} />
      </div>
      <div className="content">
        <div className="title h3">{item.title}</div>
        <div className="description">{item.text}</div>
      </div>
    </motion.div>
  );
};

interface InfoHighlightsProps {
  data: SectionOf<"info-highlights">;
}

export const InfoHighlights = ({ data }: InfoHighlightsProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const triggerNext = () => {
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  return (
    <section className="info-highlights">
      <div className="container">
        <div className="columns">
          {data.items.map((item, index) => (
            <HighlightItem
              key={`${item.title}-${index}`}
              item={item}
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
