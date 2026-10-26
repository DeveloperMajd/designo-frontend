"use client";

import Circle from "../assets/images/shared/desktop/bg-pattern-small-circle.svg";

import BgShape from "../assets/images/shared/desktop/bg-pattern-leaf.svg";
import Link from "next/link";
import type { SectionOf } from "@/lib/cms/sections";
import { useLabel } from "@/lib/labels";
import { MediaItem } from "./Global/MediaItem";
import { motion, useAnimation } from "motion/react";
import { fadeInLeft } from "@/utils/transistions";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";

type Highlight = SectionOf<"locations-highlights">["items"][number];

interface HighlightItemProps {
  item: Highlight;
  label: string;
  index: number;
  currentIndex: number;
  triggerNext: () => void;
}

const HighlightItem = ({
  item,
  label,
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
        <span className="overlay">
          <Circle />
        </span>
        <MediaItem image={item.image} />
      </div>
      <div className="content">
        <div className="title h3">{item.city}</div>
        <Link href={`/locations#${item.anchor}`} className="btn onLight">
          {label}
        </Link>
      </div>
    </motion.div>
  );
};

interface LocationsHighlightsProps {
  data: SectionOf<"locations-highlights">;
}

export const LocationsHighlights = ({ data }: LocationsHighlightsProps) => {
  const label = useLabel("see-location", "See Location");
  const [currentIndex, setCurrentIndex] = useState(0);

  const triggerNext = () => {
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  return (
    <section className="locations-highlights">
      <div className="container">
        <div className="columns">
          {data.items.map((item, index) => (
            <HighlightItem
              key={item.anchor || index}
              item={item}
              label={label}
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
