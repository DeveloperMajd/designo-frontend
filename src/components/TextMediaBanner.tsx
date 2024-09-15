"use client";

import ImgDesktop from "../assets/about/desktop/image-about-hero.jpg";
import ImgTablet from "../assets/about/tablet/image-about-hero.jpg";
import ImgMobile from "../assets/about/mobile/image-about-hero.jpg";

import Image from "next/image";
import useWindowSize from "../hooks/useWindowSize";

import BgPatternDesktop from "../assets/about/desktop/bg-pattern-hero-about-desktop.svg";
import BgPatternMobile from "../assets/about/mobile/bg-pattern-hero-about-mobile.svg";

import BgShape from "../assets/shared/desktop/bg-pattern-leaf.svg";

export const TextMediaBanner = () => {
  const { width } = useWindowSize();
  const isMobile = width <= 768;
  const isTablet = width > 768 && width <= 1024;
  const isDesktop = width > 1024;

  return (
    <section className="text-media-banner is-full-width">
      <div className="container">
        <div className="columns is-multiline">
          <div className="column is-12-mobile is-12-tablet is-5-desktop img-column p-0">
            <Image
              src={isMobile ? ImgMobile : isTablet ? ImgTablet : ImgDesktop}
              alt="about"
              style={{
                objectFit: "cover",
                objectPosition: "center",
                width: "100%",
              }}
            />
          </div>
          <div className="column is-12-mobile is-12-tablet is-7-desktop text-column">
            <div className="bg-pattern-wrapper">
              {isDesktop || isTablet ? (
                <BgPatternDesktop />
              ) : (
                <BgPatternMobile />
              )}
            </div>
            <div className="text-content">
              <h1>About Us</h1>
              <p>
                Founded in 2010, we are a creative agency that produces lasting
                results for our clients. We’ve partnered with many startups,
                corporations, and nonprofits alike to craft designs that make
                real impact. We’re always looking forward to creating brands,
                products, and digital experiences that connect with our clients’
                audiences.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Todo: add condition props (has-bg-shape) */}
      <div className="bg-pattern is-left-bottom is-hidden-touch">
        <BgShape />
      </div>
    </section>
  );
};
