"use client";

import Image from "next/image";
import Logo from "../assets/images/shared/desktop/logo-dark.png";
import { useEffect, useState } from "react";
import Hamburger from "hamburger-react";
import { motion, type Variants } from "motion/react";
import Link from "next/link";
import type { Link as MenuLink } from "@/lib/cms/links";

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

const MenuItems = ({ menu }: NavbarProps) =>
  menu.map((item) => (
    <Link
      key={item.href}
      href={item.href}
      target={item.newTab ? "_blank" : undefined}
      className="nav-item"
    >
      {item.label}
    </Link>
  ));

export const Navbar = ({ menu }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const html = document.documentElement;

    if (isOpen) {
      // Save the original overflow value
      const originalOverflow = html.style.overflow;

      // Set overflow to hidden
      html.style.overflow = "hidden";

      // Cleanup function to reset overflow back to the original value
      return () => {
        html.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  return (
    <div className="navbar">
      <div className="container is-flex">
        <Link href="/" className="logo">
          <Image src={Logo} alt="logo" />
        </Link>
        <div className="hamburger-wrapper is-hidden-tablet">
          <Hamburger toggled={isOpen} toggle={setIsOpen} size={24} />
        </div>
        <div className="nav-items-wrapper is-hidden-mobile">
          <div className="nav-items">
            <MenuItems menu={menu} />
          </div>
        </div>
      </div>
      <motion.div
        className="nav-items-wrapper is-hidden-tablet"
        initial="hidden"
        animate={isOpen ? "visible" : "hidden"}
        variants={variants}
      >
        <div className="nav-items">
          <MenuItems menu={menu} />
        </div>
        <div className="overlay" onClick={() => setIsOpen(false)}></div>
      </motion.div>
    </div>
  );
};
