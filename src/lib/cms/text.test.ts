// @vitest-environment node
import { describe, expect, it } from "vitest";
import { toLines, toText } from "./text";

describe("toText", () => {
  it("collapses whitespace and line breaks, as the browser did with the old HTML rendering", () => {
    expect(
      toText(
        "We build websites that serve as powerful marketing tools \nand bring memorable brand experiences."
      )
    ).toBe(
      "We build websites that serve as powerful marketing tools and bring memorable brand experiences."
    );
  });

  it("drops tags and keeps their text", () => {
    expect(toText("<p>Hello <strong>there</strong></p>")).toBe("Hello there");
  });

  it("keeps a would-be script as harmless text", () => {
    expect(
      toText('<img src=x onerror="alert(1)">Hi<script>alert(2)</script>')
    ).toBe("Hi alert(2)");
  });

  it("decodes the common entities", () => {
    expect(
      toText("Tom &amp; Jerry&nbsp;&lt;3 &#39;n&#39; &quot;co&quot;")
    ).toBe("Tom & Jerry <3 'n' \"co\"");
  });

  it.each([null, undefined, ""])("turns %j into an empty string", (value) => {
    expect(toText(value)).toBe("");
  });
});

describe("toLines", () => {
  // The three address formats the CMS holds.
  it.each([
    [
      "<strong>Designo Central Office</strong>\n<p>3886 Wellington Street</p>\n<p>Toronto, Ontario M9C 3J5</p>",
      [
        "Designo Central Office",
        "3886 Wellington Street",
        "Toronto, Ontario M9C 3J5",
      ],
    ],
    [
      "<p><strong>Designo Central Office</strong></p>\n<p>3886 Wellington Street</p>\n<p>Toronto, Ontario M9C 3J5</p>",
      [
        "Designo Central Office",
        "3886 Wellington Street",
        "Toronto, Ontario M9C 3J5",
      ],
    ],
    [
      "Designo UK Office\n13  Colorado Way\u2028Rhyd-y-fro SA8 9GA",
      ["Designo UK Office", "13 Colorado Way", "Rhyd-y-fro SA8 9GA"],
    ],
  ])("splits %j into lines", (address, lines) => {
    expect(toLines(address)).toEqual(lines);
  });

  it("treats <br> as a line break", () => {
    expect(toLines("One<br>Two<br/>Three")).toEqual(["One", "Two", "Three"]);
  });

  it.each([null, undefined, "", " \n "])("has no lines for %j", (value) => {
    expect(toLines(value)).toEqual([]);
  });
});
