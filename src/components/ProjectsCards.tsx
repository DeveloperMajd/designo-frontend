import { ImageType, LinkType } from "@/utils/baseTypes";
import { MediaItem } from "./Global/MediaItem";
import Link from "next/link";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { fadeInLeft, fadeInRight } from "@/utils/transistions";
import { useEffect } from "react";

export type ProjectsCardsType = {
  __component: "components.project-cards";
  Elements: {
    Title: string;
    Content: string;
    Image: ImageType;
    link: LinkType;
  }[];
};

interface ProjectsCardsProps {
  data: ProjectsCardsType;
}

interface ProjectCardProps {
  Title: string;
  Content: string;
  Image: ImageType;
  link: LinkType;
  index: number;
}

const ProjectCard = ({
  Title,
  Content,
  Image,
  link,
  index,
}: ProjectCardProps) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  useEffect(() => {
    if (inView) {
      controls.start("show");
    }
  }, [inView, controls]);

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
          <MediaItem imageData={Image} />
        </div>
        {link && link.url ? (
          <Link
            href={link.url}
            target={link.target}
            className="column is-12-mobile is-6-tablet is-12-desktop card-content link"
          >
            <div className="title h3">{Title}</div>
            <div
              className="text"
              dangerouslySetInnerHTML={{ __html: Content }}
            />
          </Link>
        ) : (
          <div className="column is-12-mobile is-6-tablet is-12-desktop card-content">
            <div className="title h3">{Title}</div>
            <div
              className="text"
              dangerouslySetInnerHTML={{ __html: Content }}
            />
          </div>
        )}
      </div>
    </motion.div>
  );
};

export const ProjectsCards = ({ data }: ProjectsCardsProps) => {
  const { Elements } = data;

  return (
    <section className="projects-cards">
      <div className="container">
        <div className="columns is-multiline is-variable is-3-desktop main-columns">
          {Elements.map((element, index) => (
            <ProjectCard
              key={index}
              Title={element.Title}
              Content={element.Content}
              Image={element.Image}
              link={element.link}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
