import { ImageType } from "@/utils/baseTypes";
import { MediaItem } from "./Global/MediaItem";

export type InfoHighlightsType = {
  __component: "components.info-highlights";
  Elements: {
    title: string;
    content: string;
    Image: ImageType;
  }[];
};

interface InfoHighlightsProps {
  data: InfoHighlightsType;
}

export const InfoHighlights = ({ data }: InfoHighlightsProps) => {
  const { Elements } = data;

  return (
    <section className="info-highlights">
      <div className="container">
        <div className="columns">
          {Elements.map((element, index) => (
            <div key={index} className="column is-12-tablet is-4-desktop">
              <div className="img-wrapper">
                <span className="overlay" />
                <MediaItem imageData={element.Image} />
              </div>
              <div className="content">
                <div className="title h3">{element.title}</div>
                <div className="description">{element.content}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
