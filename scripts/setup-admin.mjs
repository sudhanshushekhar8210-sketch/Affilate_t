import bcrypt from "bcryptjs";
import readline from "node:readline/promises";
import { stdin, stdout } from "node:process";
import mongoose from "mongoose";
import { connectToDatabase } from "../lib/db-core.js";
import User from "../lib/models/user.js";
import { cleanHumanText, normalizeEmail } from "../lib/validation.js";

const ADMIN_EMAIL = normalizeEmail(process.env.ADMIN_EMAIL);

class SetupError extends Error {}

function readHidden(prompt) {
  if (!stdin.isTTY || typeof stdin.setRawMode !== "function") {
    throw new SetupError("Run this setup in an interactive terminal.");
  }

  return new Promise((resolve, reject) => {
    const characters = [];
    stdout.write(prompt);
    stdin.setEncoding("utf8");
    stdin.setRawMode(true);
    stdin.resume();

    function finish(error) {
      stdin.removeListener("data", onData);
      stdin.setRawMode(false);
      stdin.pause();
      stdout.write("\n");
      if (error) reject(error);
      else resolve(characters.join(""));
    }

    function onData(chunk) {
      for (const character of chunk) {
        if (character === "\u0003") {
          finish(new SetupError("Administrator setup cancelled."));
          return;
        }
        if (character === "\r" || character === "\n") {
          finish();
          return;
        }
        if (character === "\u007f" || character === "\b") {
          if (characters.length) {
            characters.pop();
            stdout.write("\b \b");
          }
          continue;
        }
        if (character >= " ") {
          characters.push(character);
          stdout.write("*");
        }
      }
    }

    stdin.on("data", onData);
  });
}

async function main() {
  if (!process.env.MONGODB_URI) {
    throw new SetupError("Set MONGODB_URI in .env.local before initializing the administrator.");
  }
  if (!ADMIN_EMAIL || !ADMIN_EMAIL.includes("@")) {
    throw new SetupError(
      "Set ADMIN_EMAIL in .env.local before initializing the administrator.",
    );
  }

  if (process.argv.includes("--check")) {
    await connectToDatabase();
    const account = await User.findOne({ email: ADMIN_EMAIL })
      .select("+passwordHash role")
      .lean();
    stdout.write(`Admin account exists: ${account ? "yes" : "no"}\n`);
    stdout.write(`Admin account role: ${account?.role || "not applicable"}\n`);
    stdout.write(`Password hash present: ${account?.passwordHash ? "yes" : "no"}\n`);
    return;
  }

  if (
    !process.env.SESSION_SECRET ||
    Buffer.byteLength(process.env.SESSION_SECRET, "utf8") < 32
  ) {
    throw new SetupError(
      "Set SESSION_SECRET to at least 32 random bytes in .env.local before initializing the administrator.",
    );
  }

  const prompt = readline.createInterface({ input: stdin, output: stdout });
  stdout.write("This one-time setup can only create or promote the designated LearnIND administrator.\n");
  const suppliedEmail = await prompt.question(`Type the administrator email (${ADMIN_EMAIL}): `);
  if (normalizeEmail(suppliedEmail) !== ADMIN_EMAIL) {
    prompt.close();
    throw new SetupError("The email does not match the designated administrator.");
  }

  await connectToDatabase();
  await User.init();
  const existingUser = await User.findOne({ email: ADMIN_EMAIL }).select("role");
  const otherAdmin = await User.findOne({
    role: "admin",
    email: { $ne: ADMIN_EMAIL },
  }).select("_id");
  if (otherAdmin) {
    prompt.close();
    throw new SetupError(
      "Another administrator account exists. Resolve it securely before changing the designated administrator.",
    );
  }

  let name = "";
  if (existingUser) {
    if (existingUser.role === "admin") {
      const confirmation = await prompt.question(
        "Administrator account exists. Type RESET to replace its password: ",
      );
      if (confirmation !== "RESET") {
        prompt.close();
        throw new SetupError("Administrator password reset was not confirmed.");
      }
    } else {
      const confirmation = await prompt.question(
        `Type PROMOTE to promote this account and replace its password: `,
      );
      if (confirmation !== "PROMOTE") {
        prompt.close();
        throw new SetupError("Existing account promotion was not confirmed.");
      }
    }
  } else {
    const confirmation = await prompt.question("Type CREATE to create the administrator account: ");
    if (confirmation !== "CREATE") {
      prompt.close();
      throw new SetupError("Administrator account creation was not confirmed.");
    }
    name = cleanHumanText(await prompt.question("Administrator full name: "));
    if (!name || name.length > 80) {
      prompt.close();
      throw new SetupError("Enter a full name of 1 to 80 characters.");
    }
  }
  prompt.close();

  const password = await readHidden("Choose a new password (16–72 characters): ");
  const confirmation = await readHidden("Confirm the password: ");
  if (
    password.length < 16 ||
    Buffer.byteLength(password, "utf8") > 72 ||
    password !== confirmation ||
    normalizeEmail(password) === ADMIN_EMAIL ||
    !/[a-z]/.test(password) ||
    !/[A-Z]/.test(password) ||
    !/\d/.test(password) ||
    !/[^A-Za-z0-9]/.test(password)
  ) {
    throw new SetupError(
      "Use matching passwords of 16–72 bytes containing uppercase, lowercase, number, and symbol characters.",
    );
  }

  const passwordHash = await bcrypt.hash(password, 12);
  if (existingUser) {
    const result = await User.updateOne(
      { _id: existingUser._id, email: ADMIN_EMAIL },
      { $set: { role: "admin", passwordHash } },
      { runValidators: true },
    );
    if (result.modifiedCount !== 1) {
      throw new SetupError("The designated administrator account could not be updated.");
    }
  } else {
    await User.create({
      name,
      email: ADMIN_EMAIL,
      passwordHash,
      role: "admin",
      trainingAccess: false,
    });
  }

  stdout.write(`Administrator account initialized for ${ADMIN_EMAIL}.\n`);
}

try {
  await main();
} catch (error) {
  if (error instanceof SetupError) {
    console.error(`Administrator setup stopped: ${error.message}`);
  } else {
    console.error("Administrator setup failed. Check the MongoDB connection and account state.");
    process.exitCode = 1;
  }
  if (process.exitCode === undefined) process.exitCode = 1;
} finally {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }
}
