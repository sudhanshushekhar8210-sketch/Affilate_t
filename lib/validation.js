export function cleanHumanText(value) {
  if (typeof value !== "string") return "";

  return value
    .normalize("NFKC")
    .replace(/[\u0000-\u001f\u007f]/g, " ")
    .replace(/[<>]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function normalizeEmail(value) {
  return typeof value === "string" ? value.normalize("NFKC").trim().toLowerCase() : "";
}

export function isValidEmail(value) {
  return (
    value.length <= 254 &&
    /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(value)
  );
}

export function validateStudentInput(input) {
  const name = cleanHumanText(input.name);
  const email = normalizeEmail(input.email);
  const password = typeof input.password === "string" ? input.password : "";
  const fieldErrors = {};

  if (!name) fieldErrors.name = "Enter your full name.";
  else if (name.length > 80) fieldErrors.name = "Name must be 80 characters or fewer.";

  if (!email) fieldErrors.email = "Enter your email address.";
  else if (!isValidEmail(email)) fieldErrors.email = "Enter a valid email address.";

  if (password.length < 10) {
    fieldErrors.password = "Use a temporary password with at least 10 characters.";
  } else if (new TextEncoder().encode(password).length > 72) {
    fieldErrors.password = "Password must be 72 bytes or fewer.";
  }

  return {
    value: {
      name,
      email,
      password,
      trainingAccess: input.trainingAccess,
    },
    fieldErrors,
  };
}

export function validateLoginInput(input) {
  const email = normalizeEmail(input.email);
  const password = typeof input.password === "string" ? input.password : "";
  const fieldErrors = {};

  if (!email) fieldErrors.email = "Enter your email address.";
  else if (!isValidEmail(email)) fieldErrors.email = "Enter a valid email address.";

  if (!password) fieldErrors.password = "Enter your password.";
  else if (new TextEncoder().encode(password).length > 72) {
    fieldErrors.password = "Password must be 72 bytes or fewer.";
  }

  return {
    value: { email, password },
    fieldErrors,
  };
}
