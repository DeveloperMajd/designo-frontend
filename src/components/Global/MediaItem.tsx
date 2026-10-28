import Image, { getImageProps } from "next/image";
import type { Media, ResponsiveMedia } from "@/lib/cms/media";

// The viewports the CMS images are cut for, matching Bulma's breakpoints in the styles.
const MOBILE = "(max-width: 768px)";
const TABLET = "(max-width: 1023px)";

const style = { objectFit: "cover", objectPosition: "center" } as const;

interface MediaItemProps<T> {
  image: T;
  /** How wide the image is shown, for images that stretch with the page. */
  sizes?: string;
  /** For the image at the top of the page, so it loads first. */
  priority?: boolean;
}

/** A CMS image. Renders nothing when there is none, rather than breaking the page. */
export const MediaItem = ({
  image,
  sizes,
  priority,
}: MediaItemProps<Media | null>) =>
  image ? (
    <Image
      src={image.src}
      alt={image.alt}
      width={image.width}
      height={image.height}
      sizes={sizes}
      priority={priority}
      style={style}
    />
  ) : null;

/**
 * A CMS image cut for each viewport. The browser picks the cut for its width, so every
 * visitor gets the same HTML and downloads one image. A missing cut falls back to the
 * next larger one.
 */
export const ResponsiveMediaItem = ({
  image,
  sizes,
  priority,
}: MediaItemProps<ResponsiveMedia>) => {
  const largest = image.desktop ?? image.tablet ?? image.mobile;
  if (!largest) return null;

  const propsFor = (media: Media) =>
    getImageProps({
      src: media.src,
      alt: media.alt,
      width: media.width,
      height: media.height,
      sizes,
      priority,
    }).props;

  const sources = [
    { media: MOBILE, image: image.mobile },
    { media: TABLET, image: image.tablet },
  ].flatMap((source) => {
    if (!source.image) return [];
    const { srcSet, width, height } = propsFor(source.image);
    return [{ media: source.media, srcSet, width, height }];
  });
  const img = propsFor(largest);

  return (
    <picture>
      {sources.map((source) => (
        <source key={source.media} sizes={sizes} {...source} />
      ))}
      <img {...img} alt={largest.alt} style={{ ...img.style, ...style }} />
    </picture>
  );
};
