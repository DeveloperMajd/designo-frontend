"use client";

import useWindowSize from "../hooks/useWindowSize";
import Image from "next/image";
import Arrow from "../assets/images/shared/desktop/icon-right-arrow.svg";
import Link from "next/link";
import { ImageType } from "@/utils/baseTypes";
import { MediaItem } from "./Global/MediaItem";

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
export const ProjectsGrid = ({ data }: projectsGridProp) => {
  const { Elements, Type } = data;

  const { width } = useWindowSize();
  const isMobile = width <= 768;
  const isTablet = width > 768 && width < 1024;
  const isDesktop = width > 1024;

  const gridJSX = (
    <div className={`grid-wrapper ${Type}`}>
      {Elements.map((element, index) => {
        const { Title, Image, ImageMobile, ImageTablet, page } = element;
        const { Slug } = page.data.attributes;

        return (
          <Link href={`/${Slug}`} className="grid-item" key={index}>
            <div className="image-wrapper">
              <MediaItem
                imageData={
                  isMobile ? ImageMobile : isTablet ? ImageTablet : Image
                }
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
        );
      })}
    </div>
  );
  return (
    <section className="projects-grid">
      <div className="container">{gridJSX}</div>
    </section>
  );
};
