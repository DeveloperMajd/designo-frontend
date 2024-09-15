import FacebookIcon from "../assets/images/shared/desktop/icon-facebook.svg";
import YouTubeIcon from "../assets/images/shared/desktop/icon-youtube.svg";
import TwitterIcon from "../assets/images/shared/desktop/icon-twitter.svg";
import PinterestIcon from "../assets/images/shared/desktop/icon-pinterest.svg";
import InstagramIcon from "../assets/images/shared/desktop/icon-instagram.svg";

import Image from "next/image";

import Link from "next/link";

export const SocialIcons = () => {
  return (
    <div className="social-icons">
      <Link href="/">
        <FacebookIcon />
      </Link>
      <Link href="/">
        <YouTubeIcon />
      </Link>
      <Link href="/">
        <TwitterIcon />
      </Link>
      <Link href="/">
        <PinterestIcon />
      </Link>
      <Link href="/">
        <InstagramIcon />
      </Link>
    </div>
  );
};
