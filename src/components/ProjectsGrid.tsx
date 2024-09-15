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
  console.log("🚀 ~ ProjectsGrid ~ Elements:", Elements);

  const { width } = useWindowSize();
  const isMobile = width <= 768;
  const isTablet = width > 768 && width <= 1024;
  const isDesktop = width > 1024;

  // const gridJSX = (
  //   <>
  //     {Type === "three-grid" ? (
  //       // <div className="tile is-ancestor ">
  //       //   <div className="tile is-parent">
  //       //     <Link
  //       //       href="/webdesign"
  //       //       target="_blank"
  //       //       className="tile is-child tile-item"
  //       //     >
  //       //       <div className="tile-image">
  //       //         <Image
  //       //           src={isMobile ? P1Mob : isTablet ? P1Tab : P1Desk}
  //       //           alt="web design"
  //       //           style={{
  //       //             objectFit: "cover",
  //       //             objectPosition: "center",
  //       //             width: "100%",
  //       //           }}
  //       //         />
  //       //       </div>
  //       //       <div className="tile-content">
  //       //         <div className="title h2">web design</div>
  //       //         <div className="link">
  //       //           <span>view projects</span>
  //       //           <span className="arrow">
  //       //             <Arrow />
  //       //           </span>
  //       //         </div>
  //       //       </div>
  //       //     </Link>
  //       //   </div>
  //       //   <div className="tile is-parent is-vertical">
  //       //     <Link href="/appdesing" className="tile is-child tile-item">
  //       //       <div className="tile-image">
  //       //         <Image
  //       //           src={isMobile ? P2Mob : isTablet ? P2Tab : P2Desk}
  //       //           alt="web design"
  //       //           style={{
  //       //             objectFit: "cover",
  //       //             objectPosition: "center",
  //       //             width: "100%",
  //       //           }}
  //       //         />
  //       //       </div>
  //       //       <div className="tile-content">
  //       //         <div className="title h2">app design</div>
  //       //         <div className="link">
  //       //           <span>view projects</span>
  //       //           <span className="arrow">
  //       //             <Arrow />
  //       //           </span>
  //       //         </div>
  //       //       </div>
  //       //     </Link>
  //       //     <Link href="graphic design" className="tile is-child tile-item">
  //       //       <div className="tile-image">
  //       //         <Image
  //       //           src={isMobile ? P3Mob : isTablet ? P3Tab : P3Desk}
  //       //           alt="web design"
  //       //           style={{
  //       //             objectFit: "cover",
  //       //             objectPosition: "center",
  //       //             width: "100%",
  //       //           }}
  //       //         />
  //       //       </div>
  //       //       <div className="tile-content">
  //       //         <div className="title h2">graphic design</div>
  //       //         <div className="link">
  //       //           <span>view projects</span>
  //       //           <span className="arrow">
  //       //             <Arrow />
  //       //           </span>
  //       //         </div>
  //       //       </div>
  //       //     </Link>
  //       //   </div>
  //       // </div>

  //     ) : (
  //       <div className="tile is-ancestor ">
  //         <div className="tile is-parent">
  //           <Link href="/appdesign" className="tile is-child tile-item">
  //             <div className="tile-image">
  //               <Image
  //                 src={isMobile ? P2Mob : isTablet ? P2Tab : P2Desk}
  //                 alt="web design"
  //                 style={{
  //                   objectFit: "cover",
  //                   objectPosition: "center",
  //                   width: "100%",
  //                 }}
  //               />
  //             </div>
  //             <div className="tile-content">
  //               <div className="title h2">app design</div>
  //               <div className="link">
  //                 <span>view projects</span>
  //                 <span className="arrow">
  //                   <Arrow />
  //                 </span>
  //               </div>
  //             </div>
  //           </Link>
  //         </div>
  //         <div className="tile is-parent">
  //           <Link href="graphicdesign" className="tile is-child tile-item">
  //             <div className="tile-image">
  //               <Image
  //                 src={isMobile ? P3Mob : isTablet ? P3Tab : P3Desk}
  //                 alt="web design"
  //                 style={{
  //                   objectFit: "cover",
  //                   objectPosition: "center",
  //                   width: "100%",
  //                 }}
  //               />
  //             </div>
  //             <div className="tile-content">
  //               <div className="title h2">graphic design</div>
  //               <div className="link">
  //                 <span>view projects</span>
  //                 <span className="arrow">
  //                   <Arrow />
  //                 </span>
  //               </div>
  //             </div>
  //           </Link>
  //         </div>
  //       </div>
  //     )}
  //   </>
  // );

  const gridJSX = (
    <div className={`grid-wrapper ${Type}`}>
      {Elements.map((element, index) => {
        const { Title, Image, ImageMobile, ImageTablet, page } = element;
        const { Slug } = page.data.attributes;

        return (
          <Link
            href={`/${Slug}`}
            target="_blank"
            className="grid-item"
            key={index}
          >
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
