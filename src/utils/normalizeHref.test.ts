import { describe, expect, it } from "vitest";
import { normalizeHref } from "./normalizeHref";

describe("normalizeHref", () => {
  it.each([
    ["facebook.com", "https://facebook.com"],
    ["x.com", "https://x.com"],
    ["www.instagram.com/designo", "https://www.instagram.com/designo"],
    ["youtube.com?feature=share", "https://youtube.com?feature=share"],
  ])("makes the bare domain %s absolute", (url, expected) => {
    expect(normalizeHref(url)).toBe(expected);
  });

  it.each([
    "https://de.wikipedia.org/wiki/Tim_Brown_(Designer)",
    "http://example.com",
    "mailto:hello@designo.co",
    "tel:+4930123456",
    "/about",
    "/locations/#ca",
    "#",
    "contact",
    "hello@designo.co",
  ])("leaves %s alone", (url) => {
    expect(normalizeHref(url)).toBe(url);
  });
});
