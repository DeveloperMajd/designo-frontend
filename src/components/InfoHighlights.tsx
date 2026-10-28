import type { SectionOf } from "@/lib/cms/sections";
import { MediaItem } from "./Global/MediaItem";
import { motion } from "motion/react";
import { fadeInLeft, revealDelay } from "@/utils/transitions";
import BgShape from "../assets/images/shared/desktop/bg-pattern-leaf.svg";

interface InfoHighlightsProps {
  data: SectionOf<"info-highlights">;
}

export const InfoHighlights = ({ data }: InfoHighlightsProps) => (
  <section className="info-highlights">
    <div className="container">
      <div className="columns">
        {data.items.map((item, index) => (
          // Each item appears when it scrolls into view, later ones a little after.
          <motion.div
            key={`${item.title}-${index}`}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInLeft}
            custom={revealDelay(index)}
            className="column is-12-tablet is-4-desktop"
          >
            <div className="img-wrapper">
              <span className="overlay" />
              <MediaItem image={item.image} />
            </div>
            <div className="content">
              <div className="title h3" role="heading" aria-level={2}>
                {item.title}
              </div>
              <div className="description">{item.text}</div>
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
