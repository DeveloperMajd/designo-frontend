import Link from "next/link";
import { ReactSVG } from "react-svg";
import type { SiteData } from "@/lib/cms/site";

interface SocialIconsProps {
  socials: SiteData["contact"]["socials"];
}

export const SocialIcons = ({ socials }: SocialIconsProps) => (
  <div className="social-icons">
    {socials.map(({ platform, link, icon }) => (
      <Link
        key={link.href}
        href={link.href}
        target={link.newTab ? "_blank" : undefined}
        className="social-icon"
        aria-label={link.label || platform}
      >
        <ReactSVG
          width={24}
          height={24}
          src={icon}
          className={`svg-icon ${platform}`}
          wrapper="svg"
          role="link"
        />
      </Link>
    ))}
  </div>
);
