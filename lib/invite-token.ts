import { createHash, randomBytes } from "crypto";

export function createInviteToken() {
  return randomBytes(32).toString("base64url");
}

export function hashInviteToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

export function getInviteExpirationDate() {
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + 30);
  return expirationDate.toISOString();
}

export function createInviteLink(token: string, requestUrl: string) {
  const baseUrl = process.env.APP_BASE_URL ?? new URL(requestUrl).origin;
  return `${baseUrl.replace(/\/$/, "")}/invite/accept?token=${token}`;
}
