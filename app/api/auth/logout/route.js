import { deleteSession } from "@/lib/auth/session.js";
import { isSameOriginRequest, readJsonObject } from "@/lib/http.js";
import { logServerError } from "@/lib/log-error.js";

export async function POST(request) {
  if (!isSameOriginRequest(request)) {
    return Response.json({ message: "This request is not allowed." }, { status: 403 });
  }

  const parsed = await readJsonObject(request);
  if (!parsed.ok) {
    return Response.json({ message: parsed.message }, { status: parsed.status });
  }

  try {
    await deleteSession();
    return Response.json({ message: "You are signed out." });
  } catch (error) {
    logServerError("Logout could not clear the session.", error);
    return Response.json(
      { message: "We could not sign you out right now. Please try again." },
      { status: 503 },
    );
  }
}
