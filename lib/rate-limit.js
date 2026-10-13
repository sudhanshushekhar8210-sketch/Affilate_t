import "server-only";

import { createHmac } from "node:crypto";
import RateLimit from "./models/rate-limit.js";

function getClientAddress(request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  const address = forwardedFor?.split(",")[0]?.trim();
  return address || request.headers.get("x-real-ip")?.trim() || "unknown";
}

export async function checkRateLimit(request, action, maximum, windowMs) {
  const secret = process.env.SESSION_SECRET;
  if (!secret || Buffer.byteLength(secret, "utf8") < 32) {
    throw new Error("SESSION_SECRET must contain at least 32 bytes.");
  }

  const addressHash = createHmac("sha256", secret)
    .update(getClientAddress(request))
    .digest("hex");
  const key = `${action}:${addressHash}`;
  const now = new Date();
  const windowEnd = new Date(now.getTime() + windowMs);

  await RateLimit.init();
  for (let attempt = 0; attempt < 2; attempt += 1) {
    try {
      const record = await RateLimit.findOneAndUpdate(
        { key },
        [
          {
            $set: {
              count: {
                $cond: [
                  { $gt: ["$expiresAt", now] },
                  { $add: ["$count", 1] },
                  1,
                ],
              },
              expiresAt: {
                $cond: [
                  { $gt: ["$expiresAt", now] },
                  "$expiresAt",
                  windowEnd,
                ],
              },
            },
          },
        ],
        {
          new: true,
          upsert: true,
          setDefaultsOnInsert: false,
          updatePipeline: true,
        },
      );

      if (record.count <= maximum) return { allowed: true, retryAfter: 0 };

      return {
        allowed: false,
        retryAfter: Math.max(
          1,
          Math.ceil((record.expiresAt.getTime() - Date.now()) / 1000),
        ),
      };
    } catch (error) {
      if (error?.code !== 11000 || attempt === 1) throw error;
    }
  }

  throw new Error("Rate limit counter could not be updated.");
}
