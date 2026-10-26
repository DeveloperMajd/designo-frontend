import path from "node:path";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [
    react(),
    // Components import SVG files as React components (@svgr/webpack in next.config.js).
    svgr({ include: "**/*.svg" }),
  ],
  resolve: {
    alias: { "@": path.join(import.meta.dirname, "src") },
  },
  test: {
    environment: "jsdom",
    include: ["src/**/*.test.{ts,tsx}"],
    setupFiles: ["src/test/setup.ts"],
  },
});
