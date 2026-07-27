import { createHmac, timingSafeEqual } from "crypto";

export const LEGAL_REVIEW_ACCESS_COOKIE = "topdog_legal_review_access";
export const LEGAL_REVIEW_ACCESS_MAX_AGE = 60 * 60 * 24 * 7;

function getReviewCode() {
  return (
    process.env.LEGAL_REVIEW_ACCESS_CODE ??
    process.env.ADMIN_ACCESS_PASSWORD ??
    ""
  );
}

function getReviewSecret() {
  return (
    process.env.ADMIN_AUTH_SECRET ??
    process.env.ADMIN_ACCESS_PASSWORD ??
    process.env.LEGAL_REVIEW_ACCESS_CODE ??
    ""
  );
}

function signAccessCode(code: string) {
  const secret = getReviewSecret();

  if (!code || !secret) {
    return null;
  }

  return createHmac("sha256", secret).update(code).digest("base64url");
}

function isSafeMatch(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);

  return (
    leftBuffer.length === rightBuffer.length &&
    timingSafeEqual(leftBuffer, rightBuffer)
  );
}

export function createLegalReviewAccessCookie(code: string) {
  const normalizedCode = code.trim();
  const expectedCode = getReviewCode();

  if (!expectedCode || normalizedCode !== expectedCode) {
    return null;
  }

  return signAccessCode(expectedCode);
}

export function isLegalReviewAccessValid(cookieValue?: string) {
  const expectedCode = getReviewCode();
  const expectedCookie = signAccessCode(expectedCode);

  if (!cookieValue || !expectedCookie) {
    return false;
  }

  return isSafeMatch(cookieValue, expectedCookie);
}
