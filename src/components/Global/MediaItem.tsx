import Image from "next/image";
import type { Media, ResponsiveMedia } from "@/lib/cms/media";

/** The image for the current viewport, or another size when the editor left that one out. */
export const forViewport = (
  image: ResponsiveMedia,
  isMobile: boolean,
  isTablet: boolean
) =>
  (isMobile ? image.mobile : isTablet ? image.tablet : image.desktop) ??
  image.desktop ??
  image.tablet ??
  image.mobile;

/** A CMS image. Renders nothing when there is none, rather than breaking the page. */
export const MediaItem = ({ image }: { image: Media | null }) =>
  image ? (
    <Image
      src={image.src}
      alt={image.alt}
      width={image.width}
      height={image.height}
      style={{
        objectFit: "cover",
        objectPosition: "center",
      }}
    />
  ) : null;
