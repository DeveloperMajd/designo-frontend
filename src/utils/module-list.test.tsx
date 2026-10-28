import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import type { Section } from "@/lib/cms/sections";
import { hasPageHeading, Modules } from "./module-list";

describe("Modules", () => {
  it("renders the component for a section", () => {
    render(
      <Modules
        section={{
          kind: "page-banner",
          id: 1,
          title: "About Us",
          text: "Founded in 2010",
        }}
      />
    );

    expect(screen.getByText("About Us")).toBeTruthy();
    expect(screen.getByText("Founded in 2010")).toBeTruthy();
  });

  it("renders a section's images, and nothing in place of a missing one", () => {
    const section: Section = {
      kind: "info-highlights",
      id: 2,
      items: [
        {
          title: "Passionate",
          text: "Each project starts with research.",
          image: {
            src: "https://api.example.com/uploads/passionate.png",
            alt: "Passionate",
            width: 202,
            height: 202,
          },
        },
        { title: "Friendly", text: "People first.", image: null },
      ],
    };

    render(<Modules section={section} />);

    expect(screen.getAllByRole("img")).toHaveLength(1);
    expect(screen.getByText("Friendly")).toBeTruthy();
  });
});

describe("hasPageHeading", () => {
  it("is true when a banner gives the page its main heading", () => {
    expect(
      hasPageHeading([
        { kind: "page-banner", id: 1, title: "Web Design", text: "" },
      ])
    ).toBe(true);
  });

  it("is false for a page without one, such as the locations page", () => {
    expect(hasPageHeading([{ kind: "locations", id: 1, offices: [] }])).toBe(
      false
    );
  });
});
