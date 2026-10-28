import type { SectionOf } from "@/lib/cms/sections";
import { useLabel } from "@/lib/labels";
import { ResponsiveMediaItem } from "./Global/MediaItem";
import { motion } from "motion/react";
import { fadeInLeft, fadeInRight, revealDelay } from "@/utils/transitions";
import Arrow from "../assets/images/shared/desktop/icon-right-arrow.svg";
import Link from "next/link";

type GridItem = SectionOf<"project-grids">["items"][number];

const ProjectGridItem = ({
  item,
  index,
}: {
  item: GridItem;
  index: number;
}) => {
  const linkText = useLabel("view-projects", "view projects");

  const content = (
    <>
      <div className="image-wrapper">
        <ResponsiveMediaItem
          image={item.image}
          sizes="(max-width: 1023px) 100vw, 50vw"
        />
      </div>
      <div className="content">
        <div className="title h2" role="heading" aria-level={2}>
          {item.title}
        </div>
        <div className="link">
          <span>{linkText}</span>
          <span className="arrow">
            <Arrow />
          </span>
        </div>
      </div>
    </>
  );

  // Each item appears when it scrolls into view, later ones a little after.
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
      variants={index === 0 ? fadeInLeft : fadeInRight}
      custom={revealDelay(index)}
    >
      {item.href ? (
        <Link href={item.href} className="grid-item">
          {content}
        </Link>
      ) : (
        <div className="grid-item">{content}</div>
      )}
    </motion.div>
  );
};

interface ProjectsGridProps {
  data: SectionOf<"project-grids">;
}

export const ProjectsGrid = ({ data }: ProjectsGridProps) => {
  const { items, layout } = data;

  return (
    <section className="projects-grid">
      <div className="container">
        <div className={`grid-wrapper ${layout}`}>
          {items.map((item, index) => (
            <ProjectGridItem
              key={`${item.title}-${index}`}
              item={item}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
