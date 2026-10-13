export function isSameOriginRequest(request) {
  const origin = request.headers.get("origin");
  if (!origin) return request.headers.get("sec-fetch-site") === "same-origin";

  try {
    return new URL(origin).origin === new URL(request.url).origin;
  } catch {
    return false;
  }
}

export async function readJsonObject(request) {
  const contentType = request.headers
    .get("content-type")
    ?.toLowerCase()
    .split(";", 1)[0]
    .trim();
  if (contentType !== "application/json") {
    return { ok: false, status: 415, message: "Send the request as JSON." };
  }

  const declaredLength = Number(request.headers.get("content-length") || 0);
  if (declaredLength > 10_240) {
    return { ok: false, status: 413, message: "The request is too large." };
  }

  const reader = request.body?.getReader();
  if (!reader) return { ok: false, status: 400, message: "A request body is required." };

  const chunks = [];
  let total = 0;

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    total += value.byteLength;
    if (total > 10_240) {
      await reader.cancel();
      return { ok: false, status: 413, message: "The request is too large." };
    }
    chunks.push(value);
  }

  try {
    const text = new TextDecoder("utf-8", { fatal: true }).decode(
      Buffer.concat(chunks.map((chunk) => Buffer.from(chunk))),
    );
    const value = JSON.parse(text);
    if (!value || typeof value !== "object" || Array.isArray(value)) {
      return { ok: false, status: 400, message: "Enter valid details and try again." };
    }
    return { ok: true, value };
  } catch {
    return { ok: false, status: 400, message: "Enter valid details and try again." };
  }
}
