import Image from "next/image";
import { getStrapiMedia } from "../../utils/fetchMedia";

interface MediaItemProps {
  src: string;
  alt: string;
  height: number;
  width: number;
  className?: string;
}

export function MediaItem({
  src,
  alt,
  height,
  width,
  className,
}: Readonly<MediaItemProps>) {
  if (!src) return null;
  const imageUrl = getStrapiMedia(src);
  const imageFallback = `https://placehold.co/${width}x${height}`;

  return (
    <Image
      src={imageUrl ?? imageFallback}
      alt={alt}
      height={height}
      width={width}
      className={className}
    />
  );
}
