"use client";

import { useState } from "react";
import { AlertCircle, ArrowRight, CheckCircle2, MessageCircle } from "lucide-react";
import {
  cleanHumanText,
  isValidEmail,
  normalizeEmail,
} from "@/lib/validation.js";

export default function BuyForm() {
  const [errors, setErrors] = useState({});
  const [notice, setNotice] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = cleanHumanText(String(formData.get("name") || ""));
    const state = cleanHumanText(String(formData.get("state") || ""));
    const email = normalizeEmail(String(formData.get("email") || ""));
    const nextErrors = {};

    if (!name) nextErrors.name = "Enter your full name.";
    else if (name.length > 80) nextErrors.name = "Name must be 80 characters or fewer.";

    if (!state) nextErrors.state = "Enter your state.";
    else if (state.length > 80) nextErrors.state = "State must be 80 characters or fewer.";

    if (!email) nextErrors.email = "Enter your email address.";
    else if (!isValidEmail(email)) {
      nextErrors.email = "Enter a valid email address.";
    }

    setErrors(nextErrors);
    setNotice("");

    if (Object.keys(nextErrors).length) {
      document.getElementById(Object.keys(nextErrors)[0])?.focus();
      return;
    }

    const message = [
      "Hello LearnIND, I want to buy Affiliate Training for ₹149.",
      "",
      `Name: ${name}`,
      `State: ${state}`,
      `Email ID: ${email}`,
      "",
      "Please share the payment process and training login ID/password.",
    ].join("\n");
    const whatsappUrl = `https://wa.me/917369851886?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    setNotice("If WhatsApp opens, review the message and press Send to contact LearnIND.");
  }

  function clearFieldError(fieldName) {
    if (errors[fieldName]) {
      setErrors((current) => {
        const next = { ...current };
        delete next[fieldName];
        return next;
      });
    }
    setNotice("");
  }

  return (
    <form className="form-card surface-card" onSubmit={handleSubmit} noValidate>
      <h2>Your details</h2>
      <p className="form-intro">
        Add your contact details. WhatsApp will open with a message for you to review and send.
      </p>

      <div className="form-fields">
        <div className="field">
          <label htmlFor="name">Full name</label>
          <input
            autoComplete="name"
            id="name"
            name="name"
            maxLength={120}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
            onChange={() => clearFieldError("name")}
            placeholder="Your full name"
          />
          {errors.name && <span className="field-error" id="name-error">{errors.name}</span>}
        </div>

        <div className="field">
          <label htmlFor="state">State</label>
          <input
            autoComplete="address-level1"
            id="state"
            name="state"
            maxLength={120}
            aria-invalid={Boolean(errors.state)}
            aria-describedby={errors.state ? "state-error" : undefined}
            onChange={() => clearFieldError("state")}
            placeholder="Your state"
          />
          {errors.state && <span className="field-error" id="state-error">{errors.state}</span>}
        </div>

        <div className="field">
          <label htmlFor="email">Email ID</label>
          <input
            autoComplete="email"
            id="email"
            name="email"
            type="email"
            maxLength={254}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
            onChange={() => clearFieldError("email")}
            placeholder="you@example.com"
          />
          {errors.email && <span className="field-error" id="email-error">{errors.email}</span>}
        </div>
      </div>

      <button className="button button-primary form-submit" type="submit">
        <MessageCircle size={18} />
        Buy Now with WhatsApp
        <ArrowRight className="button-arrow" size={16} />
      </button>
      <p className="form-footnote">
        WhatsApp will not send anything automatically. You review the message and press Send.
      </p>

      {Object.keys(errors).length > 0 && (
        <div className="form-error" role="alert">
          <AlertCircle size={16} />
          Check the highlighted details and try again.
        </div>
      )}
      {notice && (
        <div className="form-success" role="status">
          <CheckCircle2 size={16} />
          {notice}
        </div>
      )}
    </form>
  );
}
