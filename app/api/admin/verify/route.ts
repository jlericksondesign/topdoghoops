import { NextRequest, NextResponse } from "next/server";

import {
  ADMIN_SESSION_COOKIE,
  ADMIN_SESSION_MAX_AGE,
  createAdminToken,
  verifyAdminToken,
} from "@/lib/admin-auth";

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token") ?? "";
  const verifiedToken = verifyAdminToken(token, "admin_login");

  if (!verifiedToken) {
    return NextResponse.redirect(
      new URL("/admin/login?error=expired", request.url),
      303,
    );
  }

  const sessionToken = createAdminToken(
    verifiedToken.email,
    "admin_session",
    ADMIN_SESSION_MAX_AGE,
  );

  if (!sessionToken) {
    return NextResponse.redirect(
      new URL("/admin/login?error=session", request.url),
      303,
    );
  }

  const response = NextResponse.redirect(new URL("/admin", request.url), 303);
  response.cookies.set({
    name: ADMIN_SESSION_COOKIE,
    value: sessionToken,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: ADMIN_SESSION_MAX_AGE,
  });

  return response;
}
