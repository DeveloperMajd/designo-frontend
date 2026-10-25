import { describe, expect, it } from "vitest";
import { formatPhoneNumber } from "./formatPhoneNumber";

describe("formatPhoneNumber", () => {
  // The numbers and country names the CMS holds.
  it.each([
    ["3213123213", "Germany", "+49 32 13123213"],
    ["12538638967", "Canada", "+1 253 863 8967"],
    ["267209092", "Australia", "+61 2 6720 9092"],
    ["7831151400", "United Kingdom", "+44 7831 151400"],
  ])("formats %s for %s as %s", (number, country, expected) => {
    expect(formatPhoneNumber(number, country)).toBe(expected);
  });

  it("accepts the number as a number", () => {
    expect(formatPhoneNumber(3213123213, "Germany")).toBe("+49 32 13123213");
  });

  it("leaves a number it cannot validate as it was", () => {
    expect(formatPhoneNumber("12", "Germany")).toBe("12");
  });
});
