import Link from "next/link";
import { MediaItem } from "./Global/MediaItem";
import { ImageType, LinkType } from "@/utils/baseTypes";

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
        return (
          <Link
            key={index}
            href={link.url}
            target={link.target}
            className="social-icon"
          >
            <MediaItem imageData={icon} />
          </Link>
        );
      })}
    </div>
  );
};
