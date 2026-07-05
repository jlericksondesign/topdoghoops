import { NextRequest, NextResponse } from "next/server";

import {
  CHILD_DEVICE_SESSION_COOKIE,
  CHILD_DEVICE_SESSION_MAX_AGE,
} from "@/lib/child-session";
import { hashInviteToken } from "@/lib/invite-token";
import { createSupabaseAdminClient } from "@/lib/supabase/server";

type ActivatePairingRouteProps = {
  params: Promise<{
    token: string;
  }>;
};

export async function GET(
  request: NextRequest,
  { params }: ActivatePairingRouteProps,
) {
  const { token } = await params;
  const supabase = createSupabaseAdminClient();

  if (!supabase) {
    return NextResponse.redirect(new URL("/kid/sign-in", request.url));
  }

  const { data: deviceToken } = await supabase
    .from("child_device_tokens")
    .select("id,revoked_at,expires_at")
    .eq("token_hash", hashInviteToken(token))
    .single();

  if (
    !deviceToken ||
    deviceToken.revoked_at ||
    (deviceToken.expires_at && new Date(deviceToken.expires_at) < new Date())
  ) {
    return NextResponse.redirect(new URL("/kid/sign-in", request.url));
  }

  await supabase
    .from("child_device_tokens")
    .update({ last_used_at: new Date().toISOString() })
    .eq("id", deviceToken.id);

  const response = NextResponse.redirect(new URL("/player", request.url));
  response.cookies.set(CHILD_DEVICE_SESSION_COOKIE, deviceToken.id, {
    httpOnly: true,
    maxAge: CHILD_DEVICE_SESSION_MAX_AGE,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  return response;
}
