"use client";

import type { SectionOf } from "@/lib/cms/sections";
import { MediaItem, forViewport } from "./Global/MediaItem";
import { motion, useAnimation } from "motion/react";
import { useInView } from "react-intersection-observer";
import { fadeInLeft, fadeInRight } from "@/utils/transistions";
import { useEffect, useState } from "react";
import useWindowSize from "../hooks/useWindowSize";
import Arrow from "../assets/images/shared/desktop/icon-right-arrow.svg";
import Link from "next/link";

type GridItem = SectionOf<"project-grids">["items"][number];

interface ProjectGridItemProps {
  item: GridItem;
  index: number;
  currentIndex: number;
  triggerNext: () => void;
  isMobile: boolean;
  isTablet: boolean;
}

const ProjectGridItem = ({
  item,
  index,
  currentIndex,
  triggerNext,
  isMobile,
  isTablet,
}: ProjectGridItemProps) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    if (inView && index === currentIndex) {
      controls.start("show");
    }
  }, [inView, controls, index, currentIndex]);

  const content = (
    <>
      <div className="image-wrapper">
        <MediaItem image={forViewport(item.image, isMobile, isTablet)} />
      </div>
      <div className="content">
        <div className="title h2">{item.title}</div>
        <div className="link">
          <span>view projects</span>
          <span className="arrow">
            <Arrow />
          </span>
        </div>
      </div>
    </>
  );

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={index === 0 ? fadeInLeft : fadeInRight}
      onAnimationComplete={() => {
        if (index === currentIndex) triggerNext();
      }}
    >
      {item.href ? (
        <Link href={item.href} className="grid-item">
          {content}
        </Link>
      ) : (
        <div className="grid-item">{content}</div>
      )}
    </motion.div>
  );
};

interface ProjectsGridProps {
  data: SectionOf<"project-grids">;
}

export const ProjectsGrid = ({ data }: ProjectsGridProps) => {
  const { items, layout } = data;
  const { width } = useWindowSize();
  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1024;

  const [currentIndex, setCurrentIndex] = useState(0);

  const triggerNext = () => {
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  return (
    <section className="projects-grid">
      <div className="container">
        <div className={`grid-wrapper ${layout}`}>
          {items.map((item, index) => (
            <ProjectGridItem
              key={`${item.title}-${index}`}
              item={item}
              index={index}
              currentIndex={currentIndex}
              triggerNext={triggerNext}
              isMobile={isMobile}
              isTablet={isTablet}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
