import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Navbar } from "./Navbar";

// Next imports a PNG as its URL and size; Vite only gives the URL.
vi.mock("../assets/images/shared/desktop/logo-dark.png", () => ({
  default: { src: "/logo-dark.png", width: 202, height: 27 },
}));

const menu = [
  { href: "/about", label: "our company", newTab: false },
  { href: "/contact", label: "contact", newTab: false },
];

// The mobile menu is the second <nav>; the first is the tablet and desktop one.
const mobileMenu = () => screen.getAllByRole("navigation", { hidden: true })[1];

describe("Navbar", () => {
  it("keeps the closed mobile menu out of the tab order", () => {
    render(<Navbar menu={menu} />);

    expect(mobileMenu().hasAttribute("inert")).toBe(true);
  });

  it("opens with the menu button and closes with Escape", async () => {
    const user = userEvent.setup();
    render(<Navbar menu={menu} />);

    const button = screen.getByRole("button", { name: "Menu" });
    await user.click(button);
    expect(button.getAttribute("aria-expanded")).toBe("true");
    expect(mobileMenu().hasAttribute("inert")).toBe(false);

    await user.keyboard("{Escape}");
    expect(button.getAttribute("aria-expanded")).toBe("false");
    expect(mobileMenu().hasAttribute("inert")).toBe(true);
  });

  it("closes when a link in it is followed", async () => {
    const user = userEvent.setup();
    render(<Navbar menu={menu} />);

    await user.click(screen.getByRole("button", { name: "Menu" }));
    // jsdom cannot load another page, so the link only does its own part.
    document.addEventListener("click", (event) => event.preventDefault(), {
      once: true,
    });
    await user.click(
      mobileMenu().querySelector<HTMLAnchorElement>('a[href="/contact"]')!
    );

    expect(mobileMenu().hasAttribute("inert")).toBe(true);
  });
});
