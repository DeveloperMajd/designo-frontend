import CardImg1 from "../assets/images/web-design/desktop/image-express.jpg";
import CardImg2 from "../assets/images/web-design/desktop/image-transfer.jpg";
import CardImg3 from "../assets/images/web-design/desktop/image-photon.jpg";
import CardImg4 from "../assets/images/web-design/desktop/image-builder.jpg";
import CardImg5 from "../assets/images/web-design/desktop/image-blogr.jpg";
import CardImg6 from "../assets/images/web-design/desktop/image-camp.jpg";
import Image from "next/image";
import { ImageType, LinkType } from "@/utils/baseTypes";
import { MediaItem } from "./Global/MediaItem";
import Link from "next/link";

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

export const ProjectsCards = ({ data }: ProjectsCardsProps) => {
  const { Elements } = data;

  return (
    <section className="projects-cards">
      <div className="container">
        <div className="columns is-multiline is-variable is-3-desktop main-columns">
          {Elements.map((element, index) => {
            const { Title, Content, Image, link } = element;
            return (
              <div
                key={index}
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
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
