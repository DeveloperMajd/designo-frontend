import type { SectionOf } from "@/lib/cms/sections";
import { MediaItem } from "./Global/MediaItem";
import Link from "next/link";
import { motion, useAnimation } from "motion/react";
import { useInView } from "react-intersection-observer";
import { fadeInLeft, fadeInRight } from "@/utils/transistions";
import { useEffect } from "react";

type Card = SectionOf<"project-cards">["items"][number];

const ProjectCard = ({ card, index }: { card: Card; index: number }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  useEffect(() => {
    if (inView) {
      controls.start("show");
    }
  }, [inView, controls]);

  const { title, text, image, link } = card;

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={index % 2 === 0 ? fadeInLeft : fadeInRight}
      className="column is-12-mobile is-12-tablet is-4-desktop project-card"
    >
      <div className="columns">
        <div className="column is-12-mobile is-6-tablet is-12-desktop card-image">
          <MediaItem image={image} />
        </div>
        {link ? (
          <Link
            href={link.href}
            target={link.newTab ? "_blank" : undefined}
            className="column is-12-mobile is-6-tablet is-12-desktop card-content link"
            aria-label={link.label}
          >
            <div className="title h3">{title}</div>
            <div className="text">{text}</div>
          </Link>
        ) : (
          <div className="column is-12-mobile is-6-tablet is-12-desktop card-content">
            <div className="title h3">{title}</div>
            <div className="text">{text}</div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

interface ProjectsCardsProps {
  data: SectionOf<"project-cards">;
}

export const ProjectsCards = ({ data }: ProjectsCardsProps) => (
  <section className="projects-cards">
    <div className="container">
      <div className="columns is-multiline is-variable is-3-desktop main-columns">
        {data.items.map((card, index) => (
          <ProjectCard
            key={`${card.title}-${index}`}
            card={card}
            index={index}
          />
        ))}
      </div>
    </div>
  </section>
);
