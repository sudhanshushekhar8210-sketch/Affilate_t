"use client";

import { useState } from "react";
import { AlertCircle, CheckCircle2, LoaderCircle, UserPlus } from "lucide-react";

const initialForm = {
  name: "",
  email: "",
  password: "",
  trainingAccess: true,
};

function formatDate(value) {
  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeZone: "UTC",
  }).format(new Date(value));
}

export default function AdminUsers({ initialUsers }) {
  const [users, setUsers] = useState(initialUsers);
  const [form, setForm] = useState(initialForm);
  const [fieldErrors, setFieldErrors] = useState({});
  const [message, setMessage] = useState(null);
  const [busy, setBusy] = useState(false);
  const [changingId, setChangingId] = useState("");

  async function submit(event) {
    event.preventDefault();
    setBusy(true);
    setMessage(null);
    setFieldErrors({});

    try {
      const response = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const result = await response.json();
      if (!response.ok) {
        setFieldErrors(result.fieldErrors || {});
        setMessage({ type: "error", text: result.message || "Account creation failed." });
        return;
      }

      setUsers((current) =>
        [result.user, ...current].sort(
          (left, right) => new Date(right.createdAt) - new Date(left.createdAt),
        ),
      );
      setForm(initialForm);
      setMessage({ type: "success", text: "Student account created successfully." });
    } catch {
      setMessage({ type: "error", text: "We could not reach LearnIND. Please try again." });
    } finally {
      setBusy(false);
    }
  }

  async function toggleAccess(user) {
    setChangingId(user.id);
    setMessage(null);
    try {
      const response = await fetch(`/api/admin/users/${encodeURIComponent(user.id)}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ trainingAccess: !user.trainingAccess }),
      });
      const result = await response.json();
      if (!response.ok) {
        setMessage({ type: "error", text: result.message || "Access update failed." });
        return;
      }

      setUsers((current) =>
        current.map((student) => student.id === user.id ? result.user : student),
      );
      setMessage({ type: "success", text: `Training access ${result.user.trainingAccess ? "enabled" : "revoked"} for ${result.user.email}.` });
    } catch {
      setMessage({ type: "error", text: "We could not reach LearnIND. Please try again." });
    } finally {
      setChangingId("");
    }
  }

  return (
    <div className="admin-content">
      <form className="form-card surface-card admin-form" onSubmit={submit}>
        <h2><UserPlus size={19} /> Create student account</h2>
        <p className="form-intro">
          Set a temporary password and choose whether training access starts enabled. Share credentials securely.
        </p>
        <div className="admin-fields">
          <Field
            id="student-name"
            label="Student full name"
            value={form.name}
            error={fieldErrors.name}
            onChange={(name) => setForm((current) => ({ ...current, name }))}
          />
          <Field
            id="student-email"
            label="Student email"
            type="email"
            value={form.email}
            error={fieldErrors.email}
            onChange={(email) => setForm((current) => ({ ...current, email }))}
          />
          <Field
            id="student-password"
            label="Temporary password"
            type="password"
            value={form.password}
            error={fieldErrors.password}
            onChange={(password) => setForm((current) => ({ ...current, password }))}
          />
          <div className="field">
            <label htmlFor="student-access">Training access</label>
            <select
              id="student-access"
              value={String(form.trainingAccess)}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  trainingAccess: event.target.value === "true",
                }))
              }
            >
              <option value="true">Enabled</option>
              <option value="false">Disabled</option>
            </select>
          </div>
        </div>
        {message && (
          <div className={message.type === "success" ? "form-success" : "form-error"} role="status">
            {message.type === "success" ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
            {message.text}
          </div>
        )}
        <button className="button button-primary form-submit" type="submit" disabled={busy}>
          {busy ? <LoaderCircle className="spinner" size={17} /> : <UserPlus size={17} />}
          {busy ? "Creating account…" : "Create Student Account"}
        </button>
      </form>

      <section className="surface-card user-list-card">
        <div className="user-list-heading">
          <div>
            <span className="info-card-kicker">ACCOUNT DIRECTORY</span>
            <h2>Students</h2>
          </div>
          <span className="user-count">{users.length}</span>
        </div>

        {users.length === 0 ? (
          <p className="user-list-empty">No student accounts yet.</p>
        ) : (
          <div className="user-table-wrap">
            <table className="user-table">
              <thead>
                <tr>
                  <th scope="col">Student</th>
                  <th scope="col">Created</th>
                  <th scope="col">Training access</th>
                  <th scope="col"><span className="visually-hidden">Manage access</span></th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>
                      <strong>{user.name}</strong>
                      <span>{user.email}</span>
                    </td>
                    <td>{user.createdAt ? formatDate(user.createdAt) : "—"}</td>
                    <td>
                      <span className={`access-status ${user.trainingAccess ? "is-enabled" : "is-disabled"}`}>
                        {user.trainingAccess ? "Enabled" : "Disabled"}
                      </span>
                    </td>
                    <td className="user-action-cell">
                      <button
                        className="button button-quiet access-toggle"
                        type="button"
                        disabled={changingId === user.id}
                        onClick={() => toggleAccess(user)}
                      >
                        {changingId === user.id ? "Saving…" : user.trainingAccess ? "Revoke" : "Enable"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}

function Field({ id, label, type = "text", value, error, onChange }) {
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type={type}
        value={value}
        maxLength={type === "email" ? 254 : 120}
        autoComplete="off"
        required
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        onChange={(event) => onChange(event.target.value)}
      />
      {error && <span className="field-error" id={`${id}-error`}>{error}</span>}
    </div>
  );
}
