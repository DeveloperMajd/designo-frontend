import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { sendContactMessage } from "./sendContactMessage";

const payload = {
  name: "Ada Lovelace",
  email: "ada@example.com",
  phone: "+44 20 7946 0958",
  message: "Hello",
};

const respond = (status: number, body: unknown) =>
  vi.stubGlobal(
    "fetch",
    vi.fn(
      async () =>
        new Response(typeof body === "string" ? body : JSON.stringify(body), {
          status,
        })
    )
  );

const strapiError = (status: number, message: string) => ({
  data: null,
  error: { status, message },
});

beforeEach(() => {
  vi.stubEnv("NEXT_PUBLIC_API_URL", "https://api.example.com/api");
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

describe("sendContactMessage", () => {
  it("posts the message as JSON and reports success", async () => {
    respond(200, { success: true });

    expect(await sendContactMessage(payload)).toEqual({ ok: true });
    expect(fetch).toHaveBeenCalledWith(
      "https://api.example.com/api/contact-form/send",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );
  });

  it.each([
    [400, "Invalid phone number"],
    [429, "Too many attempts. Please try again later."],
  ])("passes on the server's explanation for a %i", async (status, message) => {
    respond(status, strapiError(status, message));

    expect(await sendContactMessage(payload)).toEqual({ ok: false, message });
  });

  it("does not show server errors to the visitor", async () => {
    respond(500, strapiError(500, "Internal Server Error"));

    expect(await sendContactMessage(payload)).toEqual({
      ok: false,
      message: "Something went wrong. Please try again later.",
    });
  });

  it("copes with an error body that is not JSON", async () => {
    respond(400, "<html>Bad Request</html>");

    expect(await sendContactMessage(payload)).toEqual({
      ok: false,
      message: "Something went wrong. Please try again later.",
    });
  });

  it("explains when the server cannot be reached", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockRejectedValue(new TypeError("Failed to fetch"))
    );

    expect(await sendContactMessage(payload)).toEqual({
      ok: false,
      message:
        "Could not reach the server. Please check your connection and try again.",
    });
  });
});
