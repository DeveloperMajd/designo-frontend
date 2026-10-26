import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Modules, type ModulesType } from "./module-list";

describe("Modules", () => {
  it("renders the component for a CMS section", () => {
    render(
      <Modules
        module={{
          __component: "components.page-banner",
          Title: "About Us",
          Content: "<p>Founded in 2010</p>",
        }}
        labels={[]}
      />
    );

    expect(screen.getByText("About Us")).toBeTruthy();
    expect(screen.getByText("Founded in 2010")).toBeTruthy();
  });

  it("renders nothing for a section type it does not know", () => {
    const unknown = {
      __component: "components.new-section",
    } as unknown as ModulesType;

    const { container } = render(<Modules module={unknown} labels={[]} />);

    expect(container.innerHTML).toBe("");
  });
});
