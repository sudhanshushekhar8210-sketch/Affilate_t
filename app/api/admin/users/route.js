import bcrypt from "bcryptjs";
import { requireAdminRequest } from "@/lib/auth/admin.js";
import { connectToDatabase } from "@/lib/db.js";
import { isSameOriginRequest, readJsonObject } from "@/lib/http.js";
import User from "@/lib/models/user.js";
import { checkRateLimit } from "@/lib/rate-limit.js";
import { logServerError } from "@/lib/log-error.js";
import { validateStudentInput } from "@/lib/validation.js";

export async function GET() {
  const { response } = await requireAdminRequest();
  if (response) return response;

  try {
    await connectToDatabase();
    const students = await User.find({
      $or: [{ role: "user" }, { role: { $exists: false } }],
    })
      .select("name email trainingAccess createdAt")
      .sort({ createdAt: -1 })
      .lean();

    return Response.json({
      users: students.map((student) => ({
        id: student._id.toString(),
        name: student.name,
        email: student.email,
        trainingAccess: student.trainingAccess === true,
        createdAt: student.createdAt?.toISOString() || "",
      })),
    });
  } catch (error) {
    logServerError("Admin could not list student accounts.", error);
    return Response.json(
      { message: "Student accounts are temporarily unavailable." },
      { status: 503 },
    );
  }
}

export async function POST(request) {
  const { response } = await requireAdminRequest();
  if (response) return response;
  if (!isSameOriginRequest(request)) {
    return Response.json({ message: "This request is not allowed." }, { status: 403 });
  }

  const parsed = await readJsonObject(request);
  if (!parsed.ok) {
    return Response.json({ message: parsed.message }, { status: parsed.status });
  }

  const permittedFields = new Set(["name", "email", "password", "trainingAccess"]);
  if (Object.keys(parsed.value).some((key) => !permittedFields.has(key))) {
    return Response.json({ message: "The account details include an unsupported field." }, { status: 400 });
  }

  const { value, fieldErrors } = validateStudentInput(parsed.value);
  if (typeof value.trainingAccess !== "boolean") {
    fieldErrors.trainingAccess = "Choose whether training access should be enabled.";
  }
  if (Object.keys(fieldErrors).length) {
    return Response.json(
      { message: "Check the student details and try again.", fieldErrors },
      { status: 400 },
    );
  }

  try {
    await connectToDatabase();
    const limit = await checkRateLimit(request, "admin-create-user", 30, 60 * 60 * 1000);
    if (!limit.allowed) {
      return Response.json(
        { message: "Too many account changes. Please try again later." },
        { status: 429, headers: { "Retry-After": String(limit.retryAfter) } },
      );
    }

    await User.init();
    const passwordHash = await bcrypt.hash(value.password, 12);
    const student = await User.create({
      name: value.name,
      email: value.email,
      passwordHash,
      role: "user",
      trainingAccess: value.trainingAccess,
    });

    return Response.json(
      {
        message: "Student account created.",
        user: {
          id: student._id.toString(),
          name: student.name,
          email: student.email,
          trainingAccess: student.trainingAccess,
          createdAt: student.createdAt.toISOString(),
        },
      },
      { status: 201 },
    );
  } catch (error) {
    if (error?.code === 11000) {
      return Response.json(
        { message: "An account with that email already exists." },
        { status: 409 },
      );
    }
    logServerError("Admin could not create a student account.", error);
    return Response.json(
      { message: "The account could not be created right now." },
      { status: 503 },
    );
  }
}
