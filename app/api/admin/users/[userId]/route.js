import mongoose from "mongoose";
import { requireAdminRequest } from "@/lib/auth/admin.js";
import { connectToDatabase } from "@/lib/db.js";
import { isSameOriginRequest, readJsonObject } from "@/lib/http.js";
import User from "@/lib/models/user.js";
import { checkRateLimit } from "@/lib/rate-limit.js";
import { logServerError } from "@/lib/log-error.js";

export async function PATCH(request, { params }) {
  const { response } = await requireAdminRequest();
  if (response) return response;
  if (!isSameOriginRequest(request)) {
    return Response.json({ message: "This request is not allowed." }, { status: 403 });
  }

  const { userId } = await params;
  if (!mongoose.isValidObjectId(userId)) {
    return Response.json({ message: "Student account not found." }, { status: 404 });
  }

  const parsed = await readJsonObject(request);
  if (!parsed.ok) {
    return Response.json({ message: parsed.message }, { status: parsed.status });
  }
  if (
    Object.keys(parsed.value).length !== 1 ||
    typeof parsed.value.trainingAccess !== "boolean"
  ) {
    return Response.json(
      { message: "Choose whether training access should be enabled." },
      { status: 400 },
    );
  }

  try {
    await connectToDatabase();
    const limit = await checkRateLimit(request, "admin-update-user", 60, 60 * 60 * 1000);
    if (!limit.allowed) {
      return Response.json(
        { message: "Too many account changes. Please try again later." },
        { status: 429, headers: { "Retry-After": String(limit.retryAfter) } },
      );
    }

    const student = await User.findOneAndUpdate(
      { _id: userId, role: { $ne: "admin" } },
      { $set: { trainingAccess: parsed.value.trainingAccess } },
      { new: true, runValidators: true },
    ).select("name email trainingAccess createdAt");

    if (!student) {
      return Response.json({ message: "Student account not found." }, { status: 404 });
    }

    return Response.json({
      message: "Training access updated.",
      user: {
        id: student._id.toString(),
        name: student.name,
        email: student.email,
        trainingAccess: student.trainingAccess,
        createdAt: student.createdAt.toISOString(),
      },
    });
  } catch (error) {
    logServerError("Admin could not update student access.", error);
    return Response.json(
      { message: "Training access could not be updated right now." },
      { status: 503 },
    );
  }
}
