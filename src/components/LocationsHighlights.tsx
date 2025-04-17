"use client";

import Circle from "../assets/images/shared/desktop/bg-pattern-small-circle.svg";

import BgShape from "../assets/images/shared/desktop/bg-pattern-leaf.svg";
import Link from "next/link";
import { ImageType, LabelsType } from "@/utils/baseTypes";
import { MediaItem } from "./Global/MediaItem";
import { findLabel } from "@/utils/findLabel";
import { motion, useAnimation } from "framer-motion";
import { fadeInLeft, stager } from "@/utils/transistions";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";

export type LocationsHighlightsType = {
  __component: "components.locations-highlights";
  Elements: {
    City: string;
    Image: ImageType;
    Tag: string;
  }[];
};

interface LocationsHighlightsProps {
  data: LocationsHighlightsType;
  labels: LabelsType;
}

interface HighlightItemProps {
  City: string;
  Image: ImageType;
  Tag: string;
  label: string;
  index: number;
  currentIndex: number;
  triggerNext: () => void;
}

const HighlightItem = ({
  City,
  Image,
  Tag,
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
        <MediaItem imageData={Image} />
      </div>
      <div className="content">
        <div className="title h3">{City}</div>
        <Link href={`/locations/#${Tag}`} className="btn onLight">
          {label}
        </Link>
      </div>
    </motion.div>
  );
};

export const LocationsHighlights = ({
  data,
  labels,
}: LocationsHighlightsProps) => {
  const label = findLabel("see-location", labels);
  const [currentIndex, setCurrentIndex] = useState(0);

  const triggerNext = () => {
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  return (
    <section className="locations-highlights">
      <div className="container">
        <div className="columns">
          {data.Elements.map((element, index) => (
            <HighlightItem
              key={index}
              City={element.City}
              Image={element.Image}
              Tag={element.Tag}
              index={index}
              currentIndex={currentIndex}
              triggerNext={triggerNext}
              label={label ? label : "See Location"}
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
