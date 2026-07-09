import { createHmac, timingSafeEqual } from "crypto";

export const ADMIN_SESSION_COOKIE = "topdog_admin_session";
export const ADMIN_SESSION_MAX_AGE = 60 * 60 * 8;
export const ADMIN_LOGIN_TOKEN_MAX_AGE = 60 * 15;

type AdminTokenPurpose = "admin_login" | "admin_session";

type AdminTokenPayload = {
  email: string;
  exp: number;
  purpose: AdminTokenPurpose;
};

function base64UrlEncode(value: string) {
  return Buffer.from(value).toString("base64url");
}

function base64UrlDecode(value: string) {
  return Buffer.from(value, "base64url").toString("utf8");
}

function getAdminAuthSecret() {
  return process.env.ADMIN_AUTH_SECRET ?? process.env.ADMIN_ACCESS_PASSWORD;
}

function getAllowedAdminEmails() {
  return (process.env.ADMIN_ALLOWED_EMAILS ?? "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

function signPayload(encodedPayload: string) {
  const secret = getAdminAuthSecret();

  if (!secret) {
    return null;
  }

  return createHmac("sha256", secret).update(encodedPayload).digest("base64url");
}

function isSafeMatch(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);

  return (
    leftBuffer.length === rightBuffer.length &&
    timingSafeEqual(leftBuffer, rightBuffer)
  );
}

export function isAllowedAdminEmail(email: string) {
  return getAllowedAdminEmails().includes(email.trim().toLowerCase());
}

export function createAdminToken(
  email: string,
  purpose: AdminTokenPurpose,
  maxAgeSeconds: number,
) {
  const normalizedEmail = email.trim().toLowerCase();

  if (!normalizedEmail || !isAllowedAdminEmail(normalizedEmail)) {
    return null;
  }

  const payload: AdminTokenPayload = {
    email: normalizedEmail,
    exp: Math.floor(Date.now() / 1000) + maxAgeSeconds,
    purpose,
  };
  const encodedPayload = base64UrlEncode(JSON.stringify(payload));
  const signature = signPayload(encodedPayload);

  if (!signature) {
    return null;
  }

  return `${encodedPayload}.${signature}`;
}

export function verifyAdminToken(
  token: string | undefined,
  expectedPurpose: AdminTokenPurpose,
) {
  if (!token) {
    return null;
  }

  const [encodedPayload, signature] = token.split(".");

  if (!encodedPayload || !signature) {
    return null;
  }

  const expectedSignature = signPayload(encodedPayload);

  if (!expectedSignature || !isSafeMatch(signature, expectedSignature)) {
    return null;
  }

  try {
    const payload = JSON.parse(base64UrlDecode(encodedPayload)) as Partial<
      AdminTokenPayload
    >;

    if (
      payload.purpose !== expectedPurpose ||
      typeof payload.email !== "string" ||
      typeof payload.exp !== "number" ||
      payload.exp < Math.floor(Date.now() / 1000) ||
      !isAllowedAdminEmail(payload.email)
    ) {
      return null;
    }

    return {
      email: payload.email,
    };
  } catch {
    return null;
  }
}

export function isAdminSessionValid(cookieValue?: string) {
  return verifyAdminToken(cookieValue, "admin_session") !== null;
}
