"use client";

import { ImageType } from "@/utils/baseTypes";
import { MediaItem } from "./Global/MediaItem";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { fadeInLeft, fadeInRight } from "@/utils/transistions";
import React, { useEffect, useState } from "react";
import useWindowSize from "../hooks/useWindowSize";
import Arrow from "../assets/images/shared/desktop/icon-right-arrow.svg";
import Link from "next/link";

export type projectsGridType = {
  __component: "components.project-grids";
  Type: "three-grid" | "two-grid";
  Elements: {
    Title: string;
    Image: ImageType;
    ImageMobile: ImageType;
    ImageTablet: ImageType;
    page: {
      data: {
        attributes: {
          Slug: string;
          title: string;
        };
      };
    };
  }[];
};

interface projectsGridProp {
  data: projectsGridType;
}

interface ProjectGridItemProps {
  element: projectsGridType["Elements"][0];
  index: number;
  currentIndex: number;
  triggerNext: () => void;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  Type: projectsGridType["Type"];
}

const ProjectGridItem = ({
  element,
  index,
  currentIndex,
  triggerNext,
  isMobile,
  isTablet,
  Type,
}: ProjectGridItemProps) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  useEffect(() => {
    if (inView && index === currentIndex) {
      controls.start("show");
    }
  }, [inView, controls, index, currentIndex]);

  const { Title, Image, ImageMobile, ImageTablet, page } = element;
  const { Slug } = page.data.attributes;

  return (
    <motion.span
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={
        Type === "three-grid"
          ? index === 0
            ? fadeInLeft
            : fadeInRight
          : index === 0
          ? fadeInLeft
          : fadeInRight
      }
      onAnimationComplete={() => {
        if (index === currentIndex) triggerNext();
      }}
    >
      <Link href={`/${Slug}`} className="grid-item">
        <div className="image-wrapper">
          <MediaItem
            imageData={isMobile ? ImageMobile : isTablet ? ImageTablet : Image}
          />
        </div>
        <div className="content">
          <div className="title h2">{Title}</div>
          <div className="link">
            <span>view projects</span>
            <span className="arrow">
              <Arrow />
            </span>
          </div>
        </div>
      </Link>
    </motion.span>
  );
};

export const ProjectsGrid = ({ data }: projectsGridProp) => {
  const { Elements, Type } = data;
  const { width } = useWindowSize();
  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1024;
  const isDesktop = width >= 1024;

  const [currentIndex, setCurrentIndex] = useState(0);

  const triggerNext = () => {
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  return (
    <section className="projects-grid">
      <div className="container">
        <div className={`grid-wrapper ${Type}`}>
          {Elements.map((element, index) => (
            <ProjectGridItem
              key={index}
              element={element}
              index={index}
              currentIndex={currentIndex}
              triggerNext={triggerNext}
              isMobile={isMobile}
              isTablet={isTablet}
              isDesktop={isDesktop}
              Type={Type}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
