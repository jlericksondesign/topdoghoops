import { NextRequest, NextResponse } from "next/server";

import {
  createLegalReviewAccessCookie,
  LEGAL_REVIEW_ACCESS_COOKIE,
  LEGAL_REVIEW_ACCESS_MAX_AGE,
} from "@/lib/legal-review-auth";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const code = String(formData.get("review_code") ?? "");
  const cookieValue = createLegalReviewAccessCookie(code);

  if (!cookieValue) {
    return NextResponse.redirect(
      new URL("/legal-review?error=1", request.url),
      303,
    );
  }

  const response = NextResponse.redirect(new URL("/legal-review", request.url), 303);
  response.cookies.set(LEGAL_REVIEW_ACCESS_COOKIE, cookieValue, {
    httpOnly: true,
    maxAge: LEGAL_REVIEW_ACCESS_MAX_AGE,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  return response;
}
