import { NextRequest, NextResponse } from "next/server";

import { createParentLoginToken } from "@/lib/parent-auth";
import { sendParentLoginEmail } from "@/lib/email/resend";
import { createSupabaseAdminClient } from "@/lib/supabase/server";

type AcceptedInvite = {
  id: string;
  parent_email: string;
};

function createParentLoginLink(request: NextRequest, token: string) {
  const baseUrl = process.env.APP_BASE_URL ?? request.nextUrl.origin;
  return `${baseUrl.replace(
    /\/$/,
    "",
  )}/parent/verify?token=${encodeURIComponent(token)}`;
}

function okResponse() {
  return NextResponse.json({ ok: true });
}

export async function POST(request: NextRequest) {
  const body = (await request.json().catch(() => null)) as {
    email?: unknown;
  } | null;
  const email =
    typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";

  if (!email) {
    return okResponse();
  }

  const supabase = createSupabaseAdminClient();

  if (!supabase) {
    console.error("Parent magic link Supabase config is missing");
    return okResponse();
  }

  const { data: invite, error } = await supabase
    .from("parent_invites")
    .select("id,parent_email")
    .eq("parent_email", email)
    .eq("status", "accepted")
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error("Parent magic link invite lookup failed", {
      code: error.code,
      details: error.details,
      message: error.message,
    });

    return okResponse();
  }

  if (!invite) {
    return okResponse();
  }

  const acceptedInvite = invite as AcceptedInvite;
  const token = createParentLoginToken({
    email: acceptedInvite.parent_email,
    inviteId: acceptedInvite.id,
  });

  if (!token) {
    console.error("Parent magic link token could not be created");

    return okResponse();
  }

  const emailResult = await sendParentLoginEmail({
    to: acceptedInvite.parent_email,
    loginLink: createParentLoginLink(request, token),
  });

  if (!emailResult.ok) {
    console.error("Parent magic link email failed", {
      error: emailResult.error,
    });

    return okResponse();
  }

  return okResponse();
}
