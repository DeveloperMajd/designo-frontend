"use client";

import Img1 from "../assets/shared/desktop/illustration-canada.svg";
import Img2 from "../assets/shared/desktop/illustration-australia.svg";
import Img3 from "../assets/shared/desktop/illustration-united-kingdom.svg";

import Circle from "../assets/shared/desktop/bg-pattern-small-circle.svg";

import BgShape from "../assets/shared/desktop/bg-pattern-leaf.svg";
import Link from "next/link";

export const LocationsHightlights = () => {
  return (
    <section className="locations-highlights">
      <div className="container">
        <div className="columns">
          <div className="column is-12-tablet is-4-desktop">
            <div className="img-wrapper">
              <span className="overlay">
                <Circle />
              </span>
              <Img1 />
            </div>
            <div className="content">
              <div className="title h3">canada</div>
              <Link href="/locations" className="btn onLight">
                see location
              </Link>
            </div>
          </div>
          <div className="column is-12-tablet is-4-desktop">
            <div className="img-wrapper">
              <span className="overlay">
                <Circle />
              </span>
              <Img2 />
            </div>
            <div className="content">
              <div className="title h3">australia</div>
              <Link href="locations" className="btn onLight">
                see location
              </Link>
            </div>
          </div>
          <div className="column is-12-tablet is-4-desktop">
            <div className="img-wrapper">
              <span className="overlay">
                <Circle />
              </span>
              <Img3 />
            </div>
            <div className="content">
              <div className="title h3">united kingdom</div>
              <Link href="/locations" className="btn onLight">
                see location
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-pattern is-right-bottom is-hidden-touch">
        <BgShape />
      </div>
    </section>
  );
};
