import { readFileSync } from "node:fs";
import { expect, test } from "@playwright/test";
import type { AxeResults } from "axe-core";
import { routes } from "./routes";

declare global {
  interface Window {
    axe: { run: (context: Document) => Promise<AxeResults> };
  }
}

const axeSource = readFileSync(require.resolve("axe-core/axe.min.js"), "utf8");

// Serious problems the site knowingly has. Any other serious or critical violation fails
// the test.
const KNOWN = new Set<string>([
  // White text on the brand peach (#E7816B) is about 2.7:1; AA needs 4.5:1 (3:1 large).
  // Fixing it means changing the brand colours, which is a design decision.
  "color-contrast",
]);

for (const { path } of [...routes, { path: "/no-such-page" }]) {
  test(`${path} has no new serious accessibility problems`, async ({
    page,
  }) => {
    await page.goto(path);
    // Text measured mid fade-in has the wrong colour, so let the animations finish.
    await page.waitForFunction(() =>
      document.getAnimations().every((a) => a.playState !== "running")
    );
    await page.addScriptTag({ content: axeSource });

    const { violations } = await page.evaluate(() => window.axe.run(document));

    const serious = violations
      .filter((v) => v.impact === "serious" || v.impact === "critical")
      .map((v) => `${v.id} (${v.impact}, ${v.nodes.length}x): ${v.help}`);
    expect(serious.filter((v) => !KNOWN.has(v.split(" ")[0]))).toEqual([]);
  });
}
