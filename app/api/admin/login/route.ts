import { NextRequest, NextResponse } from "next/server";

import {
  ADMIN_SESSION_COOKIE,
  ADMIN_SESSION_MAX_AGE,
  createAdminSessionValue,
  getAdminPasscode,
} from "@/lib/admin-auth";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const submittedPasscode = String(formData.get("passcode") ?? "");
  const adminPasscode = getAdminPasscode();

  if (!adminPasscode || submittedPasscode !== adminPasscode) {
    return NextResponse.redirect(
      new URL("/admin/login?error=1", request.url),
      303,
    );
  }

  const sessionValue = createAdminSessionValue(adminPasscode);
  const response = NextResponse.redirect(new URL("/admin", request.url), 303);

  if (sessionValue) {
    response.cookies.set({
      name: ADMIN_SESSION_COOKIE,
      value: sessionValue,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/admin",
      maxAge: ADMIN_SESSION_MAX_AGE,
    });
  }

  return response;
}
