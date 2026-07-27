import { NextRequest, NextResponse } from "next/server";

import {
  createInviteLink,
  createInviteToken,
  getInviteExpirationDate,
  hashInviteToken,
} from "@/lib/invite-token";
import { createParentLoginToken } from "@/lib/parent-auth";
import {
  sendParentInviteEmail,
  sendParentLoginEmail,
} from "@/lib/email/resend";
import { createSupabaseAdminClient } from "@/lib/supabase/server";

type AcceptedInvite = {
  id: string;
  parent_email: string;
};

type RosterInvite = {
  id: string;
  parent_email: string;
  parent_name: string | null;
  player_first_name: string;
  player_last_initial: string;
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

function getInviteDisplayName(invite: RosterInvite) {
  return `${invite.player_first_name} ${invite.player_last_initial}.`;
}

async function sendRosterInviteLink(request: NextRequest, invite: RosterInvite) {
  const supabase = createSupabaseAdminClient();

  if (!supabase) {
    return;
  }

  const token = createInviteToken();
  const expiresAt = getInviteExpirationDate();
  const inviteLink = createInviteLink(token, request.url);
  const emailResult = await sendParentInviteEmail({
    to: invite.parent_email,
    parentName: invite.parent_name,
    playerName: getInviteDisplayName(invite),
    inviteLink,
  });

  if (!emailResult.ok) {
    console.error("Parent roster invite email failed", {
      error: emailResult.error,
    });
    return;
  }

  const { error } = await supabase
    .from("parent_invites")
    .update({
      token_hash: hashInviteToken(token),
      status: "sent",
      expires_at: expiresAt,
      last_sent_at: new Date().toISOString(),
    })
    .eq("id", invite.id)
    .neq("status", "accepted");

  if (error) {
    console.error("Parent roster invite status update failed", {
      code: error.code,
      details: error.details,
      message: error.message,
    });
  }
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
    const { data: rosterInvite, error: rosterError } = await supabase
      .from("parent_invites")
      .select(
        "id,parent_email,parent_name,player_first_name,player_last_initial",
      )
      .eq("parent_email", email)
      .in("status", ["draft", "sent"])
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (rosterError) {
      console.error("Parent roster invite lookup failed", {
        code: rosterError.code,
        details: rosterError.details,
        message: rosterError.message,
      });

      return okResponse();
    }

    if (rosterInvite) {
      await sendRosterInviteLink(request, rosterInvite as RosterInvite);
    }

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
