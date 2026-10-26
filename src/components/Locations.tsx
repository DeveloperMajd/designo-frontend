"use client";

import useWindowSize from "../hooks/useWindowSize";

import CirclesMobile from "../assets/images/shared/desktop/bg-pattern-three-circles.svg";
import CirclesTablet from "../assets/images/shared/desktop/bg-pattern-two-circles.svg";

import dynamic from "next/dynamic";
import { motion } from "motion/react";
import { fadeInLeft, fadeInRight, scaleDown } from "@/utils/transistions";
import type { SectionOf } from "@/lib/cms/sections";
import { useLabel } from "@/lib/labels";
import { Address } from "./Global/Address";

// Leaflet needs the browser, so only the map loads on the client. The offices are
// rendered on the server like the rest of the page, which also lets links to
// /locations#<office> find their target.
const Map = dynamic(() => import("./Global/Map"), { ssr: false });

interface LocationsProps {
  data: SectionOf<"locations">;
}

const Locations = ({ data }: LocationsProps) => {
  const { width } = useWindowSize();

  const isMobile = width <= 768;
  const isTablet = width > 768 && width < 1024;

  const phoneLabel = useLabel("phone", "P: ");
  const emailLabel = useLabel("email", "M: ");

  return (
    <section className="locations is-full-width">
      <div className="container">
        {data.offices.map((office, index) => (
          <div
            id={office.anchor || undefined}
            key={office.anchor || index}
            className={`columns is-variable is-4 img-${office.imagePosition}`}
          >
            <div
              className={`column is-12-tablet is-4-desktop img-col ${
                isMobile ? "is-mobile" : isTablet ? "is-tablet" : "is-desktop"
              }`}
            >
              <motion.div
                variants={scaleDown}
                initial="hidden"
                whileInView={"show"}
                viewport={{ once: true }}
                className="map-wrapper"
              >
                {office.coordinates && (
                  <Map
                    coordinates={office.coordinates}
                    addressLines={office.addressLines}
                  />
                )}
              </motion.div>
            </div>
            <div className="column is-12-tablet is-8-desktop content-col">
              <div className="content-wrapper">
                <motion.div
                  variants={
                    office.imagePosition === "left" ? fadeInRight : fadeInLeft
                  }
                  initial="hidden"
                  whileInView={"show"}
                  viewport={{ once: true }}
                  className={`columns is-multiline content-inner-columns`}
                >
                  <div className="column is-6-mobile is-12-tablet">
                    <div className="title h5">{office.city}</div>
                  </div>
                  <div className="column is-6 address">
                    <Address lines={office.addressLines} />
                  </div>

                  <div className="column is-6 contacts">
                    <p>
                      <strong>Contact</strong>
                    </p>
                    {office.phone && (
                      <p>
                        {phoneLabel}
                        <a href={office.phone.href}>{office.phone.display}</a>
                      </p>
                    )}
                    {office.email && (
                      <p>
                        {emailLabel}
                        <a
                          href={`mailto:${office.email}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {office.email}
                        </a>
                      </p>
                    )}
                  </div>
                </motion.div>
              </div>
              <div className="bg-pattern">
                {isMobile ? <CirclesMobile /> : <CirclesTablet />}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Locations;
