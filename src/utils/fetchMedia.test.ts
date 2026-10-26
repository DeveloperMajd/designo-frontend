import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { getStrapiMedia, getStrapiURL } from "./fetchMedia";

beforeEach(() => {
  vi.stubEnv("NEXT_PUBLIC_API_URL", "https://api.example.com/api");
});

afterEach(() => {
  vi.unstubAllEnvs();
});

describe("getStrapiURL", () => {
  it("is the API URL without its /api suffix", () => {
    expect(getStrapiURL()).toBe("https://api.example.com");
  });
});

describe("getStrapiMedia", () => {
  it("prefixes uploads with the Strapi host", () => {
    expect(getStrapiMedia("/uploads/hero.jpg")).toBe(
      "https://api.example.com/uploads/hero.jpg"
    );
  });

  it.each([
    "https://cdn.example.com/hero.jpg",
    "//cdn.example.com/hero.jpg",
    "data:image/png;base64,AAAA",
  ])("leaves %s alone", (url) => {
    expect(getStrapiMedia(url)).toBe(url);
  });

  it("returns null for a missing URL", () => {
    expect(getStrapiMedia(null)).toBeNull();
  });
});
