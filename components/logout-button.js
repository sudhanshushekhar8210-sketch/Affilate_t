"use client";

import { useRef, useState } from "react";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const logoutInProgress = useRef(false);

  async function logout() {
    if (logoutInProgress.current) return;
    logoutInProgress.current = true;
    setBusy(true);
    setError("");
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: "{}",
      });
      const result = await response.json().catch(() => null);
      if (!response.ok) {
        setError(result?.message || "Sign out failed. Please try again.");
        return;
      }
      window.location.replace("/login");
    } catch {
      setError("We could not reach LearnIND. Check your connection and try again.");
    } finally {
      logoutInProgress.current = false;
      setBusy(false);
    }
  }

  return (
    <div>
      <button className="button button-quiet" type="button" onClick={logout} disabled={busy}>
        <LogOut size={15} />
        {busy ? "Signing out…" : "Logout"}
      </button>
      {error && <p className="logout-error" role="alert">{error}</p>}
    </div>
  );
}
