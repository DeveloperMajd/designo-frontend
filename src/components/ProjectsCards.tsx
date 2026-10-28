import type { SectionOf } from "@/lib/cms/sections";
import { MediaItem } from "./Global/MediaItem";
import Link from "next/link";
import { motion } from "motion/react";
import { fadeInLeft, fadeInRight } from "@/utils/transitions";

type Card = SectionOf<"project-cards">["items"][number];

const ProjectCard = ({ card, index }: { card: Card; index: number }) => {
  const { title, text, image, link } = card;

  const content = (
    <>
      <div className="title h3" role="heading" aria-level={2}>
        {title}
      </div>
      <div className="text">{text}</div>
    </>
  );

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={index % 2 === 0 ? fadeInLeft : fadeInRight}
      className="column is-12-mobile is-12-tablet is-4-desktop project-card"
    >
      <div className="columns">
        <div className="column is-12-mobile is-6-tablet is-12-desktop card-image">
          <MediaItem
            image={image}
            sizes="(max-width: 768px) 100vw, (max-width: 1023px) 50vw, 33vw"
          />
        </div>
        {link ? (
          <Link
            href={link.href}
            target={link.newTab ? "_blank" : undefined}
            className="column is-12-mobile is-6-tablet is-12-desktop card-content link"
            aria-label={link.label || undefined}
          >
            {content}
          </Link>
        ) : (
          <div className="column is-12-mobile is-6-tablet is-12-desktop card-content">
            {content}
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
