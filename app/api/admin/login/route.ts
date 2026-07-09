import { NextRequest, NextResponse } from "next/server";

import {
  ADMIN_LOGIN_TOKEN_MAX_AGE,
  createAdminToken,
  isAllowedAdminEmail,
} from "@/lib/admin-auth";
import { sendAdminLoginEmail } from "@/lib/email/resend";

function createAdminLoginLink(request: NextRequest, token: string) {
  const baseUrl = process.env.APP_BASE_URL ?? request.nextUrl.origin;
  return `${baseUrl.replace(/\/$/, "")}/api/admin/verify?token=${encodeURIComponent(
    token,
  )}`;
}

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();

  if (email && isAllowedAdminEmail(email)) {
    const token = createAdminToken(
      email,
      "admin_login",
      ADMIN_LOGIN_TOKEN_MAX_AGE,
    );

    if (token) {
      await sendAdminLoginEmail({
        to: email,
        loginLink: createAdminLoginLink(request, token),
      });
    }
  }

  return NextResponse.redirect(new URL("/admin/login?sent=1", request.url), 303);
}
