// create trnasition for the components in framer motions

import { easeInOut } from "framer-motion";

export const stager = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const fadeInLeft = {
  hidden: { x: -200, opacity: 0 },
  show: { x: 0, opacity: 1, transition: { duration: 0.4, ease: easeInOut } },
};

export const fadeInRight = {
  hidden: { x: 200, opacity: 0 },
  show: { x: 0, opacity: 1, transition: { duration: 0.4, ease: easeInOut } },
};

export const fadeInUp = {
  hidden: { y: 100, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.4, ease: easeInOut } },
};

export const fadeInDown = {
  hidden: { y: -100, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.4, ease: easeInOut } },
};

export const fadeInHomeImgDesk = {
  hidden: { y: 200, opacity: 0, scale: 1 },
  show: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: easeInOut },
  },
};

export const fadeInHomeImgMob = {
  hidden: { y: 600, opacity: 0, scale: 1.4 },
  show: {
    y: "10rem",
    opacity: 1,
    scale: 1.4,
    transition: { duration: 0.4, ease: easeInOut },
  },
};

export const fadeInHomeImgTab = {
  hidden: { y: 600, opacity: 0, scale: 1.4 },
  show: {
    y: "20rem",
    opacity: 1,
    scale: 1.4,
    transition: { duration: 0.4, ease: easeInOut },
  },
};
