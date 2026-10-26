import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

// jsdom has no IntersectionObserver, which Motion's whileInView needs. Nothing ever
// "enters the viewport" here; the tests look at content and behaviour, not animation.
class NoopIntersectionObserver {
  readonly root = null;
  readonly rootMargin = "";
  readonly thresholds = [];
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return [];
  }
}
globalThis.IntersectionObserver ??=
  NoopIntersectionObserver as unknown as typeof IntersectionObserver;

// Testing Library only unmounts automatically when Vitest's globals are enabled.
afterEach(() => {
  cleanup();
});
