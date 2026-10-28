import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { sendContactMessage } from "@/utils/sendContactMessage";
import type { SectionOf } from "@/lib/cms/sections";
import { ContactForm } from "./ContactForm";

vi.mock("@/utils/sendContactMessage", () => ({ sendContactMessage: vi.fn() }));
const send = vi.mocked(sendContactMessage);

const data: SectionOf<"contact-form"> = {
  kind: "contact-form",
  id: 1,
  title: "Contact Us",
  text: "Ready to take it to the next level?",
};

const message = {
  name: "Ada Lovelace",
  email: "ada@example.com",
  phone: "+44 20 7946 0958",
  message: "Hello",
};

const setup = () => {
  const user = userEvent.setup();
  render(<ContactForm data={data} />);
  const fill = async (values: Partial<typeof message>) => {
    const fields = {
      name: "Name",
      email: "Email Address",
      phone: "Phone",
      message: "Your Message",
    };
    for (const [field, value] of Object.entries(values)) {
      await user.type(
        screen.getByLabelText(fields[field as keyof typeof fields]),
        value
      );
    }
  };
  const submit = () =>
    user.click(screen.getByRole("button", { name: "submit" }));
  return { user, fill, submit };
};

beforeEach(() => {
  send.mockReset();
});

describe("ContactForm", () => {
  it("marks every empty field and sends nothing", async () => {
    const { submit } = setup();

    await submit();

    expect(screen.getAllByText("Can't be empty")).toHaveLength(4);
    expect(send).not.toHaveBeenCalled();
  });

  it("ties each error to its field and moves focus to the first one", async () => {
    const { fill, submit } = setup();

    await fill({ name: message.name, email: "ada@" });
    await submit();

    const email = screen.getByLabelText("Email Address");
    expect(email.getAttribute("aria-invalid")).toBe("true");
    expect(
      document.getElementById(email.getAttribute("aria-describedby")!)
        ?.textContent
    ).toBe("Please enter a valid email address.");
    expect(document.activeElement).toBe(email);
    expect(
      screen.getByLabelText("Name").getAttribute("aria-invalid")
    ).toBeNull();
  });

  it("clears a field's error once the visitor changes it", async () => {
    const { fill, submit } = setup();

    await submit();
    await fill({ name: "A" });

    expect(screen.getAllByText("Can't be empty")).toHaveLength(3);
    expect(
      screen.getByLabelText("Name").getAttribute("aria-invalid")
    ).toBeNull();
  });

  it("can be sent with the keyboard alone", async () => {
    send.mockResolvedValue({ ok: true });
    const { user, fill } = setup();

    await fill(message);
    await user.keyboard("{Tab}{Enter}");

    expect(send).toHaveBeenCalledWith(message);
  });

  it("rejects an invalid email address", async () => {
    const { fill, submit } = setup();

    await fill({ ...message, email: "ada@" });
    await submit();

    expect(
      screen.getByText("Please enter a valid email address.")
    ).toBeTruthy();
    expect(send).not.toHaveBeenCalled();
  });

  it("sends the message and thanks the visitor", async () => {
    send.mockResolvedValue({ ok: true });
    const { fill, submit } = setup();

    await fill(message);
    await submit();

    expect(await screen.findByText("Thanks for submitting!")).toBeTruthy();
    expect(send).toHaveBeenCalledWith(message);
  });

  it("shows what went wrong when sending fails", async () => {
    send.mockResolvedValue({
      ok: false,
      message: "Too many attempts. Please try again later.",
    });
    const { fill, submit } = setup();

    await fill(message);
    await submit();

    expect(await screen.findByRole("alert")).toHaveProperty(
      "textContent",
      "Too many attempts. Please try again later."
    );
  });

  it("sends only once when submit is clicked again while sending", async () => {
    send.mockReturnValue(new Promise(() => {}));
    const { fill, submit } = setup();

    await fill(message);
    await submit();
    await submit();

    expect(send).toHaveBeenCalledTimes(1);
  });
});
