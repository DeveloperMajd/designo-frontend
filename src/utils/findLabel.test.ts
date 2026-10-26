import { describe, expect, it } from "vitest";
import { LabelsType } from "./baseTypes";
import { findLabel } from "./findLabel";

const labels: LabelsType = [
  { "contact-us": "Contact Us (Central Office)" },
  { "see-location": "See Location" },
];

describe("findLabel", () => {
  it("returns the text stored under a key", () => {
    expect(findLabel("see-location", labels)).toBe("See Location");
  });

  it("returns undefined for an unknown key", () => {
    expect(findLabel("email", labels)).toBeUndefined();
  });

  it("copes with labels that did not load", () => {
    expect(
      findLabel("see-location", undefined as unknown as LabelsType)
    ).toBeUndefined();
  });
});
