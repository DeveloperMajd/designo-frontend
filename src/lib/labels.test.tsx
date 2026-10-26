import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { LabelsProvider, useLabel } from "./labels";

const Label = ({ name, fallback }: { name: string; fallback?: string }) => (
  <span>{useLabel(name, fallback)}</span>
);

describe("useLabel", () => {
  it("returns the CMS label with that name", () => {
    render(
      <LabelsProvider labels={{ "see-location": "Standort ansehen" }}>
        <Label name="see-location" fallback="See Location" />
      </LabelsProvider>
    );

    expect(screen.getByText("Standort ansehen")).toBeTruthy();
  });

  it("falls back when the CMS has no such label", () => {
    render(
      <LabelsProvider labels={{}}>
        <Label name="see-location" fallback="See Location" />
      </LabelsProvider>
    );

    expect(screen.getByText("See Location")).toBeTruthy();
  });
});
