import Image from "next/image";
import { getStrapiMedia } from "../../utils/fetchMedia";
import { ImageType } from "@/utils/baseTypes";

interface MediaItemProps {
  imageData: ImageType;
}

export const MediaItem = ({ imageData }: MediaItemProps) => {
  const { url, alternativeText, width, height } = imageData.data.attributes;

  const imageUrl = getStrapiMedia(url) || "";

  return (
    <div className="social-icon">
      <Image
        src={imageUrl}
        alt={alternativeText || ""}
        width={width}
        height={height}
        style={{
          objectFit: "cover",
          objectPosition: "center",
        }}
      />
    </div>
  );
};
