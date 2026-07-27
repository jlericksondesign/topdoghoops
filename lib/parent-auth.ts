import { createHmac, timingSafeEqual } from "crypto";

export const PARENT_LOGIN_TOKEN_MAX_AGE = 60 * 15;

type ParentTokenPurpose = "parent_login";

type ParentTokenPayload = {
  email: string;
  exp: number;
  inviteId: string;
  purpose: ParentTokenPurpose;
};

function base64UrlEncode(value: string) {
  return Buffer.from(value).toString("base64url");
}

function base64UrlDecode(value: string) {
  return Buffer.from(value, "base64url").toString("utf8");
}

function getParentAuthSecret() {
  return (
    process.env.PARENT_AUTH_SECRET ??
    process.env.ADMIN_AUTH_SECRET ??
    process.env.ADMIN_ACCESS_PASSWORD
  );
}

function signPayload(encodedPayload: string) {
  const secret = getParentAuthSecret();

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

export function createParentLoginToken({
  email,
  inviteId,
}: {
  email: string;
  inviteId: string;
}) {
  const normalizedEmail = email.trim().toLowerCase();

  if (!normalizedEmail || !inviteId) {
    return null;
  }

  const payload: ParentTokenPayload = {
    email: normalizedEmail,
    exp: Math.floor(Date.now() / 1000) + PARENT_LOGIN_TOKEN_MAX_AGE,
    inviteId,
    purpose: "parent_login",
  };
  const encodedPayload = base64UrlEncode(JSON.stringify(payload));
  const signature = signPayload(encodedPayload);

  if (!signature) {
    return null;
  }

  return `${encodedPayload}.${signature}`;
}

export function verifyParentLoginToken(token: string | undefined) {
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
      ParentTokenPayload
    >;

    if (
      payload.purpose !== "parent_login" ||
      typeof payload.email !== "string" ||
      typeof payload.inviteId !== "string" ||
      typeof payload.exp !== "number" ||
      payload.exp < Math.floor(Date.now() / 1000)
    ) {
      return null;
    }

    return {
      email: payload.email,
      inviteId: payload.inviteId,
    };
  } catch {
    return null;
  }
}
