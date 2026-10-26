// @vitest-environment node
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { mediaSchema, mediaUrl } from "./media";

beforeEach(() => {
  vi.stubEnv("NEXT_PUBLIC_API_URL", "https://api.example.com/api");
});

afterEach(() => {
  vi.unstubAllEnvs();
});

const upload = (attributes: object) => ({ data: { attributes } });

describe("mediaUrl", () => {
  it("puts uploads on the Strapi host", () => {
    expect(mediaUrl("/uploads/hero.jpg")).toBe(
      "https://api.example.com/uploads/hero.jpg"
    );
  });

  it.each([
    "https://cdn.example.com/hero.jpg",
    "//cdn.example.com/hero.jpg",
    "data:image/png;base64,AAAA",
  ])("leaves %s alone", (url) => {
    expect(mediaUrl(url)).toBe(url);
  });
});

describe("mediaSchema", () => {
  it("turns an upload into an image", () => {
    expect(
      mediaSchema.parse(
        upload({
          url: "/uploads/hero.jpg",
          alternativeText: "A phone",
          width: 624,
          height: 913,
        })
      )
    ).toEqual({
      src: "https://api.example.com/uploads/hero.jpg",
      alt: "A phone",
      width: 624,
      height: 913,
    });
  });

  it("gives an image without alternative text an empty alt", () => {
    expect(
      mediaSchema.parse(
        upload({
          url: "/uploads/a.jpg",
          alternativeText: null,
          width: 1,
          height: 1,
        })
      )?.alt
    ).toBe("");
  });

  it.each([
    ["an empty field", { data: null }],
    ["a missing field", undefined],
    [
      "an upload without dimensions",
      upload({ url: "/uploads/a.svg", width: null, height: null }),
    ],
  ])("is null for %s", (_case, field) => {
    expect(mediaSchema.parse(field)).toBeNull();
  });
});
