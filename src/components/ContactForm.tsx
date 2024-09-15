"use client";

import { useEffect, useState } from "react";
import IconError from "../assets/contact/desktop/icon-error.svg";
import BgPattern from "../assets/shared/desktop/bg-pattern-small-circle.svg";
import BgPatternMobile from "../assets/shared/desktop/bg-pattern-two-circles.svg";

export const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [submited, setSubmited] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);

  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const validateEmail = (email: string) => emailRegex.test(email);

  const handleSubmit = () => {
    setIsInvalid(!validateEmail(email));
    setSubmited(true);
  };

  return (
    <section className="contact-form is-full-width">
      <div className="container">
        <div className="columns is-multiline">
          <div className="column text-col is-12-tablet is-6-desktop">
            <div className="title h1">Contact Us</div>
            <p className="text">
              Ready to take it to the next level? Let’s talk about your project
              or idea and find out how we can help your business grow. If you
              are looking for unique digital experiences that’s relatable to
              your users, drop us a line.
            </p>
          </div>
          <div className="column form-col is-12-tablet is-5-desktop is-offset-1-desktop">
            <div className="field">
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
            </div>
            <div className="field">
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
            </div>
            <div className="field">
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
            </div>
            <div className="field">
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
            </div>
            <div className="field">
              <div className="control is-flex btn-wrapper">
                <div className="btn onDark" onClick={() => handleSubmit()}>
                  submit
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-pattern" />
        <div className="bg-pattern-mobile">
          <BgPatternMobile />
        </div>
      </div>
    </section>
  );
};
