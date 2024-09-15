"use client";

import Image from "next/image";
import Logo from "../assets/images/shared/desktop/logo-dark.png";
import { useEffect, useState } from "react";
import Hamburger from "hamburger-react";
import { motion } from "framer-motion";
import Link from "next/link";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const variants = {
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
            <Link href="/about" className="nav-item">
              out compoany
            </Link>
            <Link href="/locations" className="nav-item">
              locations
            </Link>
            <Link href="/contact" className="nav-item">
              contact
            </Link>
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
          <div className="nav-item">out compoany</div>
          <div className="nav-item">locations</div>
          <div className="nav-item">contact</div>
        </div>
        <div className="overlay" onClick={() => setIsOpen(false)}></div>
      </motion.div>
    </div>
  );
};
