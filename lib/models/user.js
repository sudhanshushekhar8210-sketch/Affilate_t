import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 80,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      maxlength: 254,
      lowercase: true,
      trim: true,
      unique: true,
      index: true,
    },
    passwordHash: {
      type: String,
      required: true,
      select: false,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
      required: true,
    },
    trainingAccess: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  {
    timestamps: true,
    strict: "throw",
    toJSON: {
      transform(_document, result) {
        delete result.passwordHash;
        delete result.__v;
        return result;
      },
    },
  },
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
