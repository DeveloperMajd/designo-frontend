import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat({ baseDirectory: import.meta.dirname });

const eslintConfig = [
  {
    ignores: [".next/", "coverage/", "playwright-report/", "test-results/", "next-env.d.ts"],
  },
  // "prettier" comes last: it switches off the rules that would fight the formatter.
  ...compat.config({
    extends: ["next/core-web-vitals", "next/typescript", "prettier"],
  }),
];

export default eslintConfig;
