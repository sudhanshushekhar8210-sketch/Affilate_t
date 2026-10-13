"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle, ArrowRight, LoaderCircle } from "lucide-react";

const loginFields = [
  {
    name: "email",
    label: "Email address",
    type: "email",
    autoComplete: "email",
    maxLength: 254,
    placeholder: "you@example.com",
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    autoComplete: "current-password",
    maxLength: 72,
    placeholder: "Your password",
  },
];

export default function AuthForm() {
  const router = useRouter();
  const [fieldErrors, setFieldErrors] = useState({});
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const submissionInProgress = useRef(false);
  const fields = loginFields;

  async function handleSubmit(event) {
    event.preventDefault();
    if (submissionInProgress.current) return;
    submissionInProgress.current = true;
    setFieldErrors({});
    setMessage("");
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const values = Object.fromEntries(
      fields.map((field) => [field.name, String(formData.get(field.name) || "")]),
    );

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const result = await response.json().catch(() => null);
      if (!result || typeof result !== "object") {
        setMessage("LearnIND returned an unexpected response. Please try again.");
        return;
      }

      if (!response.ok) {
        setFieldErrors(result.fieldErrors || {});
        setMessage(result.message || "We could not complete that request. Please try again.");
        return;
      }

      if (result.redirectTo !== "/training" && result.redirectTo !== "/admin/users") {
        setMessage("We could not complete sign-in. Please try again.");
        return;
      }

      router.replace(result.redirectTo);
    } catch {
      setMessage("We could not reach LearnIND. Check your connection and try again.");
    } finally {
      submissionInProgress.current = false;
      setIsSubmitting(false);
    }
  }

  return (
    <form className="form-card surface-card" onSubmit={handleSubmit}>
      <h2>Welcome back</h2>
      <p className="form-intro">
        Sign in with the credentials issued to you by LearnIND.
      </p>

      <div className="form-fields">
        {fields.map((field) => {
          const error = fieldErrors[field.name];
          return (
            <div className="field" key={field.name}>
              <label htmlFor={field.name}>{field.label}</label>
              <input
                autoComplete={field.autoComplete}
                id={field.name}
                name={field.name}
                type={field.type}
                maxLength={field.maxLength}
                required
                aria-invalid={Boolean(error)}
                aria-describedby={error ? `${field.name}-error` : undefined}
                onChange={() => {
                  setFieldErrors((current) => {
                    if (!current[field.name]) return current;
                    const next = { ...current };
                    delete next[field.name];
                    return next;
                  });
                  setMessage("");
                }}
                placeholder={field.placeholder}
              />
              {error && <span className="field-error" id={`${field.name}-error`}>{error}</span>}
            </div>
          );
        })}
      </div>

      {message && (
        <div className="form-error" role="alert">
          <AlertCircle size={16} />
          <span>{message}</span>
        </div>
      )}

      <button className="button button-primary form-submit" type="submit" disabled={isSubmitting}>
        {isSubmitting ? <LoaderCircle className="spinner" size={17} /> : null}
        {isSubmitting ? "Please wait…" : "Login"}
        {!isSubmitting && <ArrowRight className="button-arrow" size={16} />}
      </button>

      <p className="form-footnote">
        Training access is enabled by LearnIND after payment is confirmed.
      </p>
    </form>
  );
}
