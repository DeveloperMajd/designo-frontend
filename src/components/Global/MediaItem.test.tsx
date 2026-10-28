import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import type { Media } from "@/lib/cms/media";
import { ResponsiveMediaItem } from "./MediaItem";

const media = (name: string, width: number, height: number): Media => ({
  src: `https://api.example.com/uploads/${name}.jpg`,
  alt: "Web design",
  width,
  height,
});

const desktop = media("desktop", 541, 640);
const tablet = media("tablet", 689, 200);
const mobile = media("mobile", 327, 250);

const renderImage = (image: Parameters<typeof ResponsiveMediaItem>[0]) =>
  render(<ResponsiveMediaItem {...image} />).container;

describe("ResponsiveMediaItem", () => {
  it("offers each cut to the browser, with its own size, in one <picture>", () => {
    const picture = renderImage({
      image: { desktop, tablet, mobile },
      sizes: "100vw",
    });

    const sources = [...picture.querySelectorAll("source")].map((source) => ({
      media: source.getAttribute("media"),
      width: source.getAttribute("width"),
      height: source.getAttribute("height"),
      srcSet: source.getAttribute("srcset"),
      sizes: source.getAttribute("sizes"),
    }));
    expect(sources).toEqual([
      {
        media: "(max-width: 768px)",
        width: "327",
        height: "250",
        srcSet: expect.stringContaining("mobile.jpg"),
        sizes: "100vw",
      },
      {
        media: "(max-width: 1023px)",
        width: "689",
        height: "200",
        srcSet: expect.stringContaining("tablet.jpg"),
        sizes: "100vw",
      },
    ]);

    const img = picture.querySelector("img")!;
    expect(img.getAttribute("src")).toContain("desktop.jpg");
    expect(img.getAttribute("alt")).toBe("Web design");
    expect(picture.querySelectorAll("img")).toHaveLength(1);
  });

  it("leaves out a missing cut, so that viewport gets the next larger one", () => {
    const picture = renderImage({
      image: { desktop, tablet: null, mobile: null },
    });

    expect(picture.querySelectorAll("source")).toHaveLength(0);
    expect(picture.querySelector("img")?.getAttribute("src")).toContain(
      "desktop.jpg"
    );
  });

  it("renders nothing when the CMS has no image at all", () => {
    const picture = renderImage({
      image: { desktop: null, tablet: null, mobile: null },
    });

    expect(picture.innerHTML).toBe("");
  });
});
