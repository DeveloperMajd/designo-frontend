// Motion variants for sections that animate in as they scroll into view. The banners at
// the top of a page animate with CSS instead (.enter-* in styles/_main.scss), so they
// show without waiting for the JavaScript.

import { easeInOut, type Variants } from "motion/react";

export const stager: Variants = {
  hidden: {
    opacity: 0,
    transition: {
      staggerChildren: 0.2,
    },
  },
  show: {
    opacity: 1,
    transition: {
      duration: 0.4,
      staggerChildren: 0.2,
    },
  },
};

/** Delay for item `index` of a row, passed as `custom`, so the items arrive one by one. */
export const revealDelay = (index: number) => index * 0.2;

// `delay` is only set when given: a delay of 0 would override the stagger of a parent.
const slideIn = (x: number): Variants => ({
  hidden: { x, opacity: 0 },
  show: (delay?: number) => ({
    x: 0,
    opacity: 1,
    transition: { duration: 0.4, ease: easeInOut, ...(delay ? { delay } : {}) },
  }),
});

export const fadeInLeft = slideIn(-200);
export const fadeInRight = slideIn(200);

export const scaleDown: Variants = {
  hidden: { scale: 1.2 },
  show: { scale: 1, transition: { duration: 0.6, ease: easeInOut } },
};
