import Link from "next/link";
import { MediaItem } from "./Global/MediaItem";
import { ImageType, LinkType } from "@/utils/baseTypes";
import { ReactSVG } from "react-svg";
import { getStrapiMedia } from "@/utils/fetchMedia";

type socialType = {
  icon: ImageType;
  link: LinkType;
  platform: string;
};

interface socialProps {
  socials: socialType[];
}

export const SocialIcons = ({ socials }: socialProps) => {
  return (
    <div className="social-icons">
      {socials.map((social, index) => {
        const { icon, link, platform } = social;

        if (icon.data === null) {
          console.error(`Icon for ${platform} is not available`);
          return null;
        }
        const imageUrl = getStrapiMedia(icon.data?.attributes.url) || "";

        return (
          <Link
            key={index}
            href={link.url}
            target={link.target}
            className="social-icon"
            aria-label={link.title}
          >
            <ReactSVG
              width={24}
              height={24}
              src={imageUrl}
              className={`svg-icon ${platform}`}
              wrapper="svg"
              beforeInjection={(svg) => {
                svg.setAttribute("alt", icon.data.attributes.alternativeText);
              }}
              role="link"
            />
          </Link>
        );
      })}
    </div>
  );
};
