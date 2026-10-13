import "server-only";

export function logServerError(context, error) {
  const message =
    error instanceof Error
      ? error.message
          .replace(/mongodb(?:\+srv)?:\/\/\S+/gi, "[redacted MongoDB URI]")
          .slice(0, 240)
      : "Unknown server error";

  console.error(context, {
    name: error instanceof Error ? error.name : "UnknownError",
    code: Number.isInteger(error?.code) ? error.code : undefined,
    message,
  });
}
