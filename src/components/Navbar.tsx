import Image from "next/image";
import Logo from "../assets/images/shared/desktop/logo-dark.png";
import { useEffect, useState } from "react";
import Hamburger from "hamburger-react";
import { motion, type Variants } from "motion/react";
import Link from "next/link";
import type { Link as MenuLink } from "@/lib/cms/links";
import { useLabel } from "@/lib/labels";

interface NavbarProps {
  /** The main menu, already in the order set in the CMS. */
  menu: MenuLink[];
}

const variants: Variants = {
  hidden: {
    y: "-100%",
    opacity: 0,
    transition: {
      type: "tween",
      duration: 0.4,
    },
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "tween",
      duration: 0.4,
    },
  },
};

const MenuItems = ({
  menu,
  onNavigate,
}: NavbarProps & { onNavigate?: () => void }) =>
  menu.map((item) => (
    <Link
      key={item.href}
      href={item.href}
      target={item.newTab ? "_blank" : undefined}
      className="nav-item"
      onClick={onNavigate}
    >
      {item.label}
    </Link>
  ));

export const Navbar = ({ menu }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuLabel = useLabel("menu", "Menu");

  // While the mobile menu is open the page behind it does not scroll, and Escape closes it.
  useEffect(() => {
    if (!isOpen) return;

    const html = document.documentElement;
    const originalOverflow = html.style.overflow;
    html.style.overflow = "hidden";

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", closeOnEscape);

    return () => {
      html.style.overflow = originalOverflow;
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [isOpen]);

  return (
    <header className="navbar">
      <div className="container is-flex">
        <Link href="/" className="logo">
          <Image src={Logo} alt="Designo home" />
        </Link>
        <div className="hamburger-wrapper is-hidden-tablet">
          <Hamburger
            toggled={isOpen}
            toggle={setIsOpen}
            size={24}
            label={menuLabel}
          />
        </div>
        <nav className="nav-items-wrapper is-hidden-mobile">
          <div className="nav-items">
            <MenuItems menu={menu} />
          </div>
        </nav>
      </div>
      {/* Closed, the menu is only moved out of sight; inert keeps it out of the tab order. */}
      <motion.nav
        className="nav-items-wrapper is-hidden-tablet"
        initial="hidden"
        animate={isOpen ? "visible" : "hidden"}
        variants={variants}
        inert={!isOpen}
      >
        <div className="nav-items">
          {/* The page component stays mounted between pages, so the menu closes itself. */}
          <MenuItems menu={menu} onNavigate={() => setIsOpen(false)} />
        </div>
        <div className="overlay" onClick={() => setIsOpen(false)}></div>
      </motion.nav>
    </header>
  );
};
