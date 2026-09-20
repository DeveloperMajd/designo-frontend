export type ContactPayload = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

export type SendResult = { ok: true } | { ok: false; message: string };

const GENERIC_ERROR = "Something went wrong. Please try again later.";
const NETWORK_ERROR =
  "Could not reach the server. Please check your connection and try again.";

/**
 * Posts the contact form to the backend and turns every outcome into something the form
 * can show. The backend explains client errors (validation, rate limits) in words a
 * visitor can act on, so those are passed through; server errors are not worth showing.
 */
export async function sendContactMessage(
  payload: ContactPayload
): Promise<SendResult> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/contact-form/send`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    if (res.ok) return { ok: true };

    const body = await res.json().catch(() => null);
    const message = body?.error?.message;
    if ((res.status === 400 || res.status === 429) && typeof message === "string") {
      return { ok: false, message };
    }
    return { ok: false, message: GENERIC_ERROR };
  } catch {
    return { ok: false, message: NETWORK_ERROR };
  }
}
