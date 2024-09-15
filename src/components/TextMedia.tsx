"use client";

import useWindowSize from "../hooks/useWindowSize";
import Image from "next/image";

import ImgDesktop from "../assets/about/desktop/image-world-class-talent.jpg";
import ImgTablet from "../assets/about/tablet/image-world-class-talent.jpg";
import ImgMobile from "../assets/about/mobile/image-world-class-talent.jpg";

import BgPattern from "../assets/shared/desktop/bg-pattern-three-circles.svg";

export type textMediaType = "img-left" | "img-right";

interface textMediaProp {
  data: textMediaType;
}

export const TextMedia = ({ data }: textMediaProp) => {
  const { width } = useWindowSize();
  const isMobile = width <= 768;
  const isTablet = width > 768 && width <= 1024;
  const isDesktop = width > 1024;

  return (
    <section className="text-media is-full-width">
      <div className="container">
        <div className={`columns is-multiline ${data}`}>
          <div className="column is-12-mobile is-12-tablet is-5-desktop img-column p-0">
            <Image
              src={isMobile ? ImgMobile : isTablet ? ImgTablet : ImgDesktop}
              alt="about"
              style={{
                objectFit: "cover",
                objectPosition: "center",
                width: "100%",
              }}
              className={data}
            />
          </div>
          <div
            className={`column is-12-mobile is-12-tablet is-7-desktop text-column ${data}`}
          >
            <div className={`bg-pattern-wrapper ${data}`}>
              <BgPattern />
            </div>
            <div className="text-content">
              <div className="title h5">World-class talent</div>
              <p>
                We are a crew of strategists, problem-solvers, and
                technologists. Every design is thoughtfully crafted from concept
                to launch, ensuring success in its given market. We are
                constantly updating our skills in a myriad of platforms.
                <br />
                <br />
                Our team is multi-disciplinary and we are not merely interested
                in form — content and meaning are just as important. We give
                great importance to craftsmanship, service, and prompt delivery.
                Clients have always been impressed with our high-quality
                outcomes that encapsulates their brand’s story and mission.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
