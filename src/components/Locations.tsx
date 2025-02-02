"use client";

import useWindowSize from "../hooks/useWindowSize";

import CirclesMobile from "../assets/images/shared/desktop/bg-pattern-three-circles.svg";
import CirclesTablet from "../assets/images/shared/desktop/bg-pattern-two-circles.svg";

import Map from "./Global/Map";
import { motion } from "framer-motion";
import { fadeInLeft, fadeInRight, scaleDown } from "@/utils/transistions";

export type LocationsType = {
  __component: "components.locations";
  locations: {
    Latitude: number;
    Longitude: number;
    city: string;
    Tag: string;
    phone: Number;
    Email: string;
    Position: "img-left" | "img-right";
    address: any;
  }[];
};
interface LocationsProps {
  data: LocationsType;
}
const Locations = ({ data }: LocationsProps) => {
  const { locations } = data;

  const { width } = useWindowSize();

  const isMobile = width <= 768;
  const isTablet = width > 768 && width < 1024;
  const isDesktop = width >= 1024;

  return (
    <section className="locations is-full-width">
      <div className="container">
        {locations &&
          locations.length > 0 &&
          locations.map((location, index) => {
            const { city, Tag, phone, Email, Longitude, Latitude } = location;
            const formattedPhone = phone
              ?.toString()
              .replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");

            return (
              <div
                id={Tag}
                key={index}
                className={`columns is-variable is-4 ${location.Position}`}
              >
                <div
                  className={`column is-12-tablet is-4-desktop img-col ${
                    isMobile
                      ? "is-mobile"
                      : isTablet
                      ? "is-tablet"
                      : "is-desktop"
                  }`}
                >
                  <motion.div
                    variants={scaleDown}
                    initial="hidden"
                    whileInView={"show"}
                    viewport={{ once: true }}
                    className="map-wrapper"
                  >
                    <Map
                      data={{
                        Latitude,
                        Longitude,
                        Address: location.address,
                      }}
                    />
                  </motion.div>
                </div>
                <div className="column is-12-tablet is-8-desktop content-col">
                  <div className="content-wrapper">
                    <motion.div
                      variants={
                        location.Position === "img-left"
                          ? fadeInRight
                          : fadeInLeft
                      }
                      initial="hidden"
                      whileInView={"show"}
                      viewport={{ once: true }}
                      className={`columns is-multiline content-inner-columns`}
                    >
                      <div className="column is-6-mobile is-12-tablet">
                        <div className="title h5">{city}</div>
                      </div>
                      <div
                        className="column is-6 address"
                        dangerouslySetInnerHTML={{
                          __html: location.address,
                        }}
                      />

                      <div className="column is-6 contacts">
                        <p>
                          <strong>Contact</strong>
                        </p>
                        <p>
                          P: <a href={`tel:${phone}`}>{formattedPhone}</a>
                        </p>
                        <p>
                          M:{" "}
                          <a
                            href={`mailto:${Email}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {Email}
                          </a>
                        </p>
                      </div>
                    </motion.div>
                  </div>
                  <div className="bg-pattern">
                    {isMobile ? <CirclesMobile /> : <CirclesTablet />}
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </section>
  );
};

export default Locations;
