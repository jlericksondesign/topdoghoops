import { NextRequest, NextResponse } from "next/server";

import { verifyParentLoginToken } from "@/lib/parent-auth";
import {
  PARENT_INVITE_SESSION_COOKIE,
  PARENT_INVITE_SESSION_MAX_AGE,
} from "@/lib/parent-session";
import { createSupabaseAdminClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token") ?? "";
  const verifiedToken = verifyParentLoginToken(token);

  if (!verifiedToken) {
    return NextResponse.redirect(
      new URL("/parent/link-request?error=expired", request.url),
      303,
    );
  }

  const supabase = createSupabaseAdminClient();

  if (!supabase) {
    return NextResponse.redirect(
      new URL("/parent/link-request?error=config", request.url),
      303,
    );
  }

  const { data: invite, error } = await supabase
    .from("parent_invites")
    .select("id")
    .eq("id", verifiedToken.inviteId)
    .eq("parent_email", verifiedToken.email)
    .eq("status", "accepted")
    .maybeSingle();

  if (error || !invite) {
    return NextResponse.redirect(
      new URL("/parent/link-request?error=unavailable", request.url),
      303,
    );
  }

  const response = NextResponse.redirect(new URL("/family", request.url), 303);
  response.cookies.set({
    name: PARENT_INVITE_SESSION_COOKIE,
    value: verifiedToken.inviteId,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: PARENT_INVITE_SESSION_MAX_AGE,
  });

  return response;
}
