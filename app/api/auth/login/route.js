import bcrypt from "bcryptjs";
import { createSession } from "@/lib/auth/session.js";
import { connectToDatabase } from "@/lib/db.js";
import { isSameOriginRequest, readJsonObject } from "@/lib/http.js";
import User from "@/lib/models/user.js";
import { checkRateLimit } from "@/lib/rate-limit.js";
import { logServerError } from "@/lib/log-error.js";
import { validateLoginInput } from "@/lib/validation.js";

export async function POST(request) {
  if (!isSameOriginRequest(request)) {
    return Response.json({ message: "This request is not allowed." }, { status: 403 });
  }

  if (!process.env.MONGODB_URI) {
    console.error("Login unavailable.", { reason: "mongodb_uri_missing" });
    return Response.json(
      { message: "Login is not configured: MONGODB_URI is missing from the server environment." },
      { status: 503 },
    );
  }
  if (
    !process.env.SESSION_SECRET ||
    Buffer.byteLength(process.env.SESSION_SECRET, "utf8") < 32
  ) {
    console.error("Login unavailable.", { reason: "session_secret_missing_or_weak" });
    return Response.json(
      { message: "Login is not configured: SESSION_SECRET must contain at least 32 bytes." },
      { status: 503 },
    );
  }

  const parsed = await readJsonObject(request);
  if (!parsed.ok) {
    return Response.json({ message: parsed.message }, { status: parsed.status });
  }

  const { value, fieldErrors } = validateLoginInput(parsed.value);
  if (Object.keys(fieldErrors).length) {
    return Response.json(
      { message: "Check your details and try again.", fieldErrors },
      { status: 400 },
    );
  }

  try {
    await connectToDatabase();
    const rateLimit = await checkRateLimit(request, "login", 10, 15 * 60 * 1000);
    if (!rateLimit.allowed) {
      return Response.json(
        { message: "Too many login attempts. Please try again later." },
        { status: 429, headers: { "Retry-After": String(rateLimit.retryAfter) } },
      );
    }
  } catch (error) {
    logServerError("Login protection is unavailable.", error);
    return Response.json(
      { message: "Login is temporarily unavailable. Please try again later." },
      { status: 503 },
    );
  }

  try {
    const user = await User.findOne({ email: value.email }).select("+passwordHash");
    const passwordMatches =
      user && (await bcrypt.compare(value.password, user.passwordHash));

    if (!passwordMatches) {
      console.info("Login rejected.", {
        reason: user ? "password_mismatch" : "account_not_found",
      });
      return Response.json(
        { message: "The email or password is incorrect." },
        { status: 401 },
      );
    }

    await createSession(user._id);
    return Response.json({
      message: "You are signed in.",
      redirectTo: user.role === "admin" ? "/admin/users" : "/training",
    });
  } catch (error) {
    logServerError("Login could not be completed.", error);
    return Response.json(
      { message: "We could not sign you in right now. Please try again later." },
      { status: 503 },
    );
  }
}
