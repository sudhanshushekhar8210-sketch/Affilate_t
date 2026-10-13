import "server-only";

import { getCurrentUser } from "./current-user.js";
import { logServerError } from "../log-error.js";

export async function requireAdminRequest() {
  let user;
  try {
    user = await getCurrentUser();
  } catch (error) {
    logServerError("Admin authorization is unavailable.", error);
    return {
      user: null,
      response: Response.json(
        { message: "Account management is temporarily unavailable." },
        { status: 503 },
      ),
    };
  }
  if (!user) {
    return {
      user: null,
      response: Response.json({ message: "Please log in to continue." }, { status: 401 }),
    };
  }

  if (user.role !== "admin") {
    return {
      user: null,
      response: Response.json({ message: "You are not allowed to manage accounts." }, { status: 403 }),
    };
  }

  return { user, response: null };
}
