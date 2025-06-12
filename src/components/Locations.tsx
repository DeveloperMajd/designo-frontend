"use client";

import useWindowSize from "../hooks/useWindowSize";

import CirclesMobile from "../assets/images/shared/desktop/bg-pattern-three-circles.svg";
import CirclesTablet from "../assets/images/shared/desktop/bg-pattern-two-circles.svg";

import Map from "./Global/Map";
import { motion } from "framer-motion";
import { fadeInLeft, fadeInRight, scaleDown } from "@/utils/transistions";
import { findLabel } from "@/utils/findLabel";
import { LabelsType } from "@/utils/baseTypes";
import { formatPhoneNumber } from "@/utils/formatPhoneNumber";

export type LocationsType = {
  __component: "components.locations";
  locations: {
    Latitude: number;
    Longitude: number;
    city: string;
    Tag: string;
    phone: number;
    Email: string;
    Position: "img-left" | "img-right";
    address: string;
  }[];
};
interface LocationsProps {
  data: LocationsType;
  labels: LabelsType;
}
const Locations = ({ data, labels }: LocationsProps) => {
  const { locations } = data;

  const { width } = useWindowSize();

  const isMobile = width <= 768;
  const isTablet = width > 768 && width < 1024;

  const phoneLabel = findLabel("phone", labels);
  const emailLabel = findLabel("email", labels);

  return (
    <section className="locations is-full-width">
      <div className="container">
        {locations &&
          locations.length > 0 &&
          locations.map((location, index) => {
            const { city, Tag, phone, Email, Longitude, Latitude } = location;
            const formattedPhone = formatPhoneNumber(phone ?? "", city);
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
                          {phoneLabel ?? "P: "}
                          <a href={`tel:${phone}`}>{formattedPhone}</a>
                        </p>
                        <p>
                          {emailLabel ?? "M: "}
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
