"use client";

import { useEffect, useState } from "react";
import IconError from "../assets/images/contact/desktop/icon-error.svg";
import BgPattern from "../assets/shared/desktop/bg-pattern-small-circle.svg";
import BgPatternMobile from "../assets/images/shared/desktop/bg-pattern-two-circles.svg";
import { motion } from "framer-motion";
import { fadeInLeft, fadeInRight, stager } from "@/utils/transistions";

export type ContactFormType = {
  __component: "components.contact-form";
  Content: string;
  Title: string;
};

interface ContactFormProps {
  data: ContactFormType;
}

export const ContactForm = ({ data }: ContactFormProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [submited, setSubmited] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const validateEmail = (email: string) => emailRegex.test(email);

  const handleSubmit = async () => {
    setIsInvalid(!validateEmail(email));
    setSubmited(true);

    if (!name || !email || !phone || !message || !validateEmail(email)) return;

    setIsSubmitting(true);
    setIsSuccess(false);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/contact-form/send`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, phone, message }),
        }
      );

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result?.error || "Something went wrong");
      }

      setIsSuccess(true);
    } catch (err) {
      console.error("Submit error:", err);
      setIsSuccess(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="contact-form is-full-width">
      <div className="container">
        <div className="columns is-multiline">
          <motion.div
            variants={fadeInLeft}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: true }}
            className="column text-col is-12-tablet is-6-desktop"
          >
            <div className="title h1">{data.Title}</div>
            <div
              className="text"
              dangerouslySetInnerHTML={{ __html: data.Content }}
            />
          </motion.div>
          <motion.div
            variants={stager}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: true }}
            className="column form-col is-12-tablet is-5-desktop is-offset-1-desktop"
          >
            <motion.div variants={fadeInRight} className="field">
              <div className="control">
                <input
                  className={`input ${name ? "has-value" : ""}`}
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                {submited && name === "" && (
                  <div className="error-msg">
                    <span>Can&apos;t be empty</span>
                    <IconError />
                  </div>
                )}
              </div>
            </motion.div>
            <motion.div variants={fadeInRight} className="field">
              <div className="control has-icons-right">
                <input
                  className={`input ${email ? "has-value" : ""}`}
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => (
                    setEmail(e.target.value), setIsInvalid(false)
                  )}
                />
                {submited ? (
                  email === "" ? (
                    <div className="error-msg">
                      <span>Can&apos;t be empty</span>
                      <IconError />
                    </div>
                  ) : isInvalid ? (
                    <div className="error-msg invalid">
                      <span>Please enter a valid email address.</span>
                      <IconError />
                    </div>
                  ) : null
                ) : null}
              </div>
            </motion.div>
            <motion.div variants={fadeInRight} className="field">
              <div className="control has-icons-right">
                <input
                  className={`input phone${phone ? "has-value" : ""}`}
                  type="number"
                  inputMode="numeric"
                  placeholder="Phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                {submited && phone === "" && (
                  <div className="error-msg">
                    <span>Can&apos;t be empty</span>
                    <IconError />
                  </div>
                )}
              </div>
            </motion.div>
            <motion.div variants={fadeInRight} className="field">
              <div className="control has-icons-right">
                {/* textarea not expanded */}
                <textarea
                  className={`textarea ${message ? "has-value" : ""}`}
                  placeholder="Your Message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  style={{ resize: "none" }}
                />
                {submited && message === "" && (
                  <div className="error-msg">
                    <span>Can&apos;t be empty</span>
                    <IconError />
                  </div>
                )}
              </div>
            </motion.div>
            <motion.div variants={fadeInRight} className="field">
              <div
                className={`control is-flex btn-wrapper ${
                  isSuccess && "is-success"
                } ${isSubmitting && "is-submitting"}`}
              >
                {isSuccess && (
                  <div className="success-msg">
                    <span>Thanks for submitting!</span>
                  </div>
                )}
                {isSubmitting && (
                  <div className="loading">
                    <div className="loader" />
                  </div>
                )}
                <div className="btn onDark" onClick={() => handleSubmit()}>
                  submit
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
        <div className="bg-pattern" />
        <div className="bg-pattern-mobile">
          <BgPatternMobile />
        </div>
      </div>
    </section>
  );
};
