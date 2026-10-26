import qs from "qs";
import { z } from "zod";

/** A request to the CMS that failed, or returned something the site does not understand. */
export class CmsError extends Error {
  constructor(
    message: string,
    readonly url: string
  ) {
    super(`${message} (${url})`);
    this.name = "CmsError";
  }
}

const TIMEOUT_MS = 10_000;

/** The Strapi API base URL, including /api. */
export const apiUrl = () => {
  const url = process.env.NEXT_PUBLIC_API_URL;
  if (!url) throw new CmsError("NEXT_PUBLIC_API_URL is not set", "(no url)");
  return url;
};

/**
 * GETs a Strapi endpoint and returns the response's `data`. A timeout, an error status or
 * a body that is not JSON is a CmsError; what a failure means for a page is up to the caller.
 */
export async function cmsGet(path: string, query?: object): Promise<unknown> {
  const url = `${apiUrl()}/${path}${query ? `?${qs.stringify(query)}` : ""}`;

  let res: Response;
  try {
    res = await fetch(url, { signal: AbortSignal.timeout(TIMEOUT_MS) });
  } catch (error) {
    throw new CmsError(
      error instanceof Error ? error.message : "Request failed",
      url
    );
  }
  if (!res.ok) throw new CmsError(`HTTP ${res.status}`, url);

  let body: unknown;
  try {
    body = await res.json();
  } catch {
    throw new CmsError("Response is not JSON", url);
  }
  return (body as { data?: unknown } | null)?.data;
}

/** Checks CMS data against a schema and returns the parsed value, or throws a CmsError saying what did not fit. */
export function parseCms<S extends z.ZodType>(
  schema: S,
  data: unknown,
  what: string
): z.output<S> {
  const result = schema.safeParse(data);
  if (!result.success) {
    throw new CmsError(
      `Unexpected data:\n${z.prettifyError(result.error)}`,
      what
    );
  }
  return result.data;
}
