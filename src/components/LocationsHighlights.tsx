"use client";

import Circle from "../assets/images/shared/desktop/bg-pattern-small-circle.svg";

import BgShape from "../assets/images/shared/desktop/bg-pattern-leaf.svg";
import Link from "next/link";
import { ImageType, LabelsType } from "@/utils/baseTypes";
import { MediaItem } from "./Global/MediaItem";
import { findLabel } from "@/utils/findLabel";

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

export const LocationsHighlights = ({
  data,
  labels,
}: LocationsHighlightsProps) => {
  const label = findLabel("see-location", labels);

  return (
    <section className="locations-highlights">
      <div className="container">
        <div className="columns">
          {data.Elements.map((element, index) => (
            <div key={index} className="column is-12-tablet is-4-desktop">
              <div className="img-wrapper">
                <span className="overlay">
                  <Circle />
                </span>
                <MediaItem imageData={element.Image} />
              </div>
              <div className="content">
                <div className="title h3">{element.City}</div>
                <Link
                  href={`/locations/#${element.Tag}`}
                  className="btn onLight"
                >
                  {label}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-pattern is-right-bottom is-hidden-touch">
        <BgShape />
      </div>
    </section>
  );
};
