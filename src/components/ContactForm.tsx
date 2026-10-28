import { useId, useState, type FormEvent } from "react";
import IconError from "../assets/images/contact/desktop/icon-error.svg";
import BgPatternMobile from "../assets/images/shared/desktop/bg-pattern-two-circles.svg";
import { motion } from "motion/react";
import { fadeInRight, stager } from "@/utils/transitions";
import {
  sendContactMessage,
  type ContactPayload,
} from "@/utils/sendContactMessage";
import type { SectionOf } from "@/lib/cms/sections";
import { useLabel } from "@/lib/labels";

type Field = keyof ContactPayload;
type Problem = "empty" | "invalid" | null;

const FIELDS: Field[] = ["name", "email", "phone", "message"];

const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const findProblems = (values: ContactPayload): Record<Field, Problem> => ({
  name: values.name ? null : "empty",
  email: !values.email
    ? "empty"
    : emailRegex.test(values.email)
      ? null
      : "invalid",
  phone: values.phone ? null : "empty",
  message: values.message ? null : "empty",
});

interface ContactFormProps {
  data: SectionOf<"contact-form">;
}

export const ContactForm = ({ data }: ContactFormProps) => {
  const id = useId();
  const [values, setValues] = useState<ContactPayload>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  // Problems show from the first submit on, and each one clears when its field changes.
  const [problems, setProblems] = useState<Record<Field, Problem> | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);

  const labels: Record<Field, string> = {
    name: useLabel("form-name", "Name"),
    email: useLabel("form-email", "Email Address"),
    phone: useLabel("form-phone", "Phone"),
    message: useLabel("form-message", "Your Message"),
  };
  const messages: Record<Exclude<Problem, null>, string> = {
    empty: useLabel("form-empty", "Can't be empty"),
    invalid: useLabel(
      "form-invalid-email",
      "Please enter a valid email address."
    ),
  };
  const submitText = useLabel("form-submit", "submit");
  const successText = useLabel("form-success", "Thanks for submitting!");

  const fieldId = (field: Field) => `${id}-${field}`;
  const errorId = (field: Field) => `${id}-${field}-error`;

  const update = (field: Field, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    setProblems((current) => current && { ...current, [field]: null });
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (isSubmitting) return;

    const found = findProblems(values);
    setProblems(found);

    // Take keyboard and screen reader users straight to what needs fixing.
    const firstProblem = FIELDS.find((field) => found[field]);
    if (firstProblem) {
      document.getElementById(fieldId(firstProblem))?.focus();
      return;
    }

    setIsSubmitting(true);
    setIsSuccess(false);
    setSendError(null);

    const result = await sendContactMessage(values);

    if (result.ok) {
      setIsSuccess(true);
    } else {
      setSendError(result.message);
    }
    setIsSubmitting(false);
  };

  /** The attributes that tie a field to its hidden label and its error message. */
  const fieldProps = (field: Field) => {
    const problem = problems?.[field];
    return {
      id: fieldId(field),
      name: field,
      placeholder: labels[field],
      value: values[field],
      required: true,
      "aria-invalid": problem ? true : undefined,
      "aria-describedby": problem ? errorId(field) : undefined,
    };
  };

  const label = (field: Field) => (
    <label htmlFor={fieldId(field)} className="is-sr-only">
      {labels[field]}
    </label>
  );

  const error = (field: Field) => {
    const problem = problems?.[field];
    return (
      problem && (
        <div className="error-msg" id={errorId(field)}>
          <span>{messages[problem]}</span>
          <IconError aria-hidden />
        </div>
      )
    );
  };

  const hasValue = (field: Field) => (values[field] ? "has-value" : "");

  return (
    <section className="contact-form is-full-width">
      <div className="container">
        <div className="columns is-multiline">
          <div className="column text-col is-12-tablet is-6-desktop enter-from-left">
            <div className="title h1" role="heading" aria-level={1}>
              {data.title}
            </div>
            <div className="text">{data.text}</div>
          </div>
          {/* noValidate: the form shows its own messages instead of the browser's. */}
          <motion.form
            variants={stager}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: true }}
            className="column form-col is-12-tablet is-5-desktop is-offset-1-desktop"
            onSubmit={handleSubmit}
            noValidate
          >
            <motion.div variants={fadeInRight} className="field">
              <div className="control">
                {label("name")}
                <input
                  {...fieldProps("name")}
                  className={`input ${hasValue("name")}`}
                  type="text"
                  autoComplete="name"
                  onChange={(e) => update("name", e.target.value)}
                />
                {error("name")}
              </div>
            </motion.div>
            <motion.div variants={fadeInRight} className="field">
              <div className="control has-icons-right">
                {label("email")}
                <input
                  {...fieldProps("email")}
                  className={`input ${hasValue("email")}`}
                  type="email"
                  autoComplete="email"
                  onChange={(e) => update("email", e.target.value)}
                />
                {error("email")}
              </div>
            </motion.div>
            <motion.div variants={fadeInRight} className="field">
              <div className="control has-icons-right">
                {label("phone")}
                <input
                  {...fieldProps("phone")}
                  className={`input phone ${hasValue("phone")}`}
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  onChange={(e) => update("phone", e.target.value)}
                />
                {error("phone")}
              </div>
            </motion.div>
            <motion.div variants={fadeInRight} className="field">
              <div className="control has-icons-right">
                {label("message")}
                {/* textarea not expanded */}
                <textarea
                  {...fieldProps("message")}
                  className={`textarea ${hasValue("message")}`}
                  onChange={(e) => update("message", e.target.value)}
                  style={{ resize: "none" }}
                />
                {error("message")}
              </div>
            </motion.div>
            <motion.div variants={fadeInRight} className="field">
              <div
                className={[
                  "control is-flex btn-wrapper",
                  isSuccess && "is-success",
                  sendError && "is-error",
                  isSubmitting && "is-submitting",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                {isSuccess && (
                  <div className="success-msg" role="status">
                    <span>{successText}</span>
                  </div>
                )}
                {sendError && (
                  <div className="send-error-msg" role="alert">
                    <span>{sendError}</span>
                    <IconError aria-hidden />
                  </div>
                )}
                {isSubmitting && (
                  <div className="loading">
                    <div className="loader" />
                  </div>
                )}
                <button type="submit" className="btn onDark">
                  {submitText}
                </button>
              </div>
            </motion.div>
          </motion.form>
        </div>
        <div className="bg-pattern" />
        <div className="bg-pattern-mobile">
          <BgPatternMobile />
        </div>
      </div>
    </section>
  );
};
