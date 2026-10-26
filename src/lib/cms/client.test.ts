// @vitest-environment node
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { z } from "zod";
import { cmsGet, CmsError, parseCms } from "./client";

const stubFetch = (
  impl: (url: string, init?: RequestInit) => Promise<Response>
) => {
  const fetch = vi.fn(impl);
  vi.stubGlobal("fetch", fetch);
  return fetch;
};

beforeEach(() => {
  vi.stubEnv("NEXT_PUBLIC_API_URL", "https://api.example.com/api");
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

describe("cmsGet", () => {
  it("requests the endpoint with the query and returns the response's data", async () => {
    const fetch = stubFetch(async () =>
      Response.json({ data: [{ id: 1 }], meta: {} })
    );

    expect(
      await cmsGet("pages", { filters: { Slug: { $eq: "about" } } })
    ).toEqual([{ id: 1 }]);
    expect(fetch.mock.calls[0][0]).toBe(
      "https://api.example.com/api/pages?filters%5BSlug%5D%5B%24eq%5D=about"
    );
  });

  it("stops waiting after a timeout", async () => {
    const fetch = stubFetch(async () => Response.json({ data: null }));

    await cmsGet("labels");

    expect(fetch.mock.calls[0][1]?.signal).toBeInstanceOf(AbortSignal);
  });

  it.each([
    [
      "an error status",
      async () => new Response("Bad Gateway", { status: 502 }),
      "HTTP 502",
    ],
    [
      "a body that is not JSON",
      async () => new Response("<html>"),
      "Response is not JSON",
    ],
    [
      "a failed request",
      async () => {
        throw new TypeError("fetch failed");
      },
      "fetch failed",
    ],
  ])("throws a CmsError for %s", async (_case, impl, message) => {
    stubFetch(impl);

    const error = await cmsGet("pages").catch((e: unknown) => e);

    expect(error).toBeInstanceOf(CmsError);
    expect((error as CmsError).message).toContain(message);
    expect((error as CmsError).url).toBe("https://api.example.com/api/pages");
  });

  it("throws a CmsError when the API URL is not configured", async () => {
    vi.stubEnv("NEXT_PUBLIC_API_URL", "");

    await expect(cmsGet("pages")).rejects.toBeInstanceOf(CmsError);
  });
});

describe("parseCms", () => {
  const schema = z.object({ title: z.string() });

  it("returns the parsed value", () => {
    expect(parseCms(schema, { title: "About" }, "page")).toEqual({
      title: "About",
    });
  });

  it("throws a CmsError that says what did not fit", () => {
    expect(() => parseCms(schema, { title: 42 }, "page")).toThrowError(/title/);
    expect(() => parseCms(schema, { title: 42 }, "page")).toThrowError(
      CmsError
    );
  });
});
