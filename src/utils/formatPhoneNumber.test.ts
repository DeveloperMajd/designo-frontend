import { describe, expect, it } from "vitest";
import { formatPhone } from "./formatPhoneNumber";

describe("formatPhone", () => {
  // The numbers and country names the CMS holds.
  it.each([
    ["3213123213", "Germany", "+49 32 13123213", "tel:+493213123213"],
    ["12538638967", "Canada", "+1 253 863 8967", "tel:+12538638967"],
    ["267209092", "Australia", "+61 2 6720 9092", "tel:+61267209092"],
    ["7831151400", "United Kingdom", "+44 7831 151400", "tel:+447831151400"],
  ])("formats %s for %s", (number, country, display, href) => {
    expect(formatPhone(number, country)).toEqual({ display, href });
  });

  it("accepts the number as a number", () => {
    expect(formatPhone(3213123213, "Germany")?.display).toBe("+49 32 13123213");
  });

  it("shows a number it cannot validate as it was typed", () => {
    expect(formatPhone("12", "Germany")).toEqual({
      display: "12",
      href: "tel:12",
    });
  });

  it.each([null, undefined, "", "  "])("returns null for %j", (value) => {
    expect(formatPhone(value, "Germany")).toBeNull();
  });
});
