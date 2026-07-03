import { createHash, timingSafeEqual } from "crypto";

export const ADMIN_SESSION_COOKIE = "topdog_admin_session";
export const ADMIN_SESSION_MAX_AGE = 60 * 60 * 8;

export function getAdminPasscode() {
  return process.env.ADMIN_ACCESS_PASSWORD;
}

export function createAdminSessionValue(passcode = getAdminPasscode()) {
  if (!passcode) {
    return null;
  }

  return createHash("sha256").update(passcode).digest("hex");
}

export function isAdminSessionValid(cookieValue?: string) {
  const expectedValue = createAdminSessionValue();

  if (!cookieValue || !expectedValue) {
    return false;
  }

  const cookieBuffer = Buffer.from(cookieValue);
  const expectedBuffer = Buffer.from(expectedValue);

  return (
    cookieBuffer.length === expectedBuffer.length &&
    timingSafeEqual(cookieBuffer, expectedBuffer)
  );
}
