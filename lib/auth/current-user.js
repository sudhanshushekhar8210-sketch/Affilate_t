import "server-only";

import { cache } from "react";
import { connectToDatabase } from "../db.js";
import User from "../models/user.js";
import { readSessionUserId } from "./session.js";

export const getCurrentUser = cache(async () => {
  const userId = await readSessionUserId();
  if (!userId) return null;

  await connectToDatabase();
  const user = await User.findById(userId)
    .select("name email role trainingAccess")
    .lean();

  if (!user) return null;
  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    role: user.role || "user",
    trainingAccess: user.trainingAccess === true,
  };
});
