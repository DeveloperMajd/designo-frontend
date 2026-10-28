import Circle from "../assets/images/shared/desktop/bg-pattern-small-circle.svg";

import BgShape from "../assets/images/shared/desktop/bg-pattern-leaf.svg";
import Link from "next/link";
import type { SectionOf } from "@/lib/cms/sections";
import { useLabel } from "@/lib/labels";
import { MediaItem } from "./Global/MediaItem";
import { motion } from "motion/react";
import { fadeInLeft, revealDelay } from "@/utils/transitions";

interface LocationsHighlightsProps {
  data: SectionOf<"locations-highlights">;
}

export const LocationsHighlights = ({ data }: LocationsHighlightsProps) => {
  const label = useLabel("see-location", "See Location");

  return (
    <section className="locations-highlights">
      <div className="container">
        <div className="columns">
          {data.items.map((item, index) => (
            // Each item appears when it scrolls into view, later ones a little after.
            <motion.div
              key={item.anchor || index}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeInLeft}
              custom={revealDelay(index)}
              className="column is-12-tablet is-4-desktop"
            >
              <div className="img-wrapper">
                <span className="overlay">
                  <Circle />
                </span>
                <MediaItem image={item.image} />
              </div>
              <div className="content">
                <div className="title h3" role="heading" aria-level={2}>
                  {item.city}
                </div>
                <Link
                  href={`/locations#${item.anchor}`}
                  className="btn onLight"
                >
                  {label}
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="bg-pattern is-right-bottom is-hidden-touch">
        <BgShape />
      </div>
    </section>
  );
};
