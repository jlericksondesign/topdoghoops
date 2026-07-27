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
    return NextResponse.json(
      { error: "Enter the parent email address." },
      { status: 400 },
    );
  }

  const supabase = createSupabaseAdminClient();

  if (!supabase) {
    return NextResponse.json(
      { error: "Parent sign-in is not configured yet." },
      { status: 503 },
    );
  }

  const { data: invite, error } = await supabase
    .from("parent_invites")
    .select("id,parent_email")
    .eq("parent_email", email)
    .eq("status", "accepted")
    .order("accepted_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) {
    return NextResponse.json(
      { error: "We could not request a sign-in link. Try again shortly." },
      { status: 500 },
    );
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
    return NextResponse.json(
      { error: "Parent sign-in is not configured yet." },
      { status: 503 },
    );
  }

  const emailResult = await sendParentLoginEmail({
    to: acceptedInvite.parent_email,
    loginLink: createParentLoginLink(request, token),
  });

  if (!emailResult.ok) {
    return NextResponse.json(
      { error: "We could not send a sign-in link. Try again shortly." },
      { status: 502 },
    );
  }

  return okResponse();
}
