import { NextRequest, NextResponse } from "next/server";

import {
  ADMIN_SESSION_COOKIE,
  isAdminSessionValid,
} from "@/lib/admin-auth";
import {
  createInviteLink,
  createInviteToken,
  getInviteExpirationDate,
  hashInviteToken,
} from "@/lib/invite-token";
import { sendParentInviteEmail } from "@/lib/email/resend";
import { createSupabaseAdminClient } from "@/lib/supabase/server";

type MagicLinkRouteProps = {
  params: Promise<{
    inviteId: string;
  }>;
};

export async function POST(request: NextRequest, props: MagicLinkRouteProps) {
  const adminSession = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;

  if (!isAdminSessionValid(adminSession)) {
    return NextResponse.json(
      { error: "Admin access required." },
      { status: 401 },
    );
  }

  const supabase = createSupabaseAdminClient();

  if (!supabase) {
    return NextResponse.json(
      { error: "Supabase environment variables are not available yet." },
      { status: 500 },
    );
  }

  const { inviteId } = await props.params;
  const token = createInviteToken();
  const tokenHash = hashInviteToken(token);
  const expiresAt = getInviteExpirationDate();
  const inviteLink = createInviteLink(token, request.url);

  const { data: invite, error: inviteError } = await supabase
    .from("parent_invites")
    .select(
      "parent_email,parent_name,player_first_name,player_last_initial,status",
    )
    .eq("id", inviteId)
    .single();

  if (inviteError || !invite) {
    return NextResponse.json(
      { error: inviteError?.message ?? "Invite was not found." },
      { status: 404 },
    );
  }

  if (invite.status === "accepted") {
    return NextResponse.json(
      { error: "This invite has already been accepted." },
      { status: 400 },
    );
  }

  const playerName = `${invite.player_first_name} ${invite.player_last_initial}.`;
  const emailResult = await sendParentInviteEmail({
    to: invite.parent_email,
    parentName: invite.parent_name,
    playerName,
    inviteLink,
  });

  if (!emailResult.ok) {
    return NextResponse.json({ error: emailResult.error }, { status: 500 });
  }

  const { data, error } = await supabase
    .from("parent_invites")
    .update({
      token_hash: tokenHash,
      status: "sent",
      expires_at: expiresAt,
      last_sent_at: new Date().toISOString(),
    })
    .eq("id", inviteId)
    .neq("status", "accepted")
    .select("id")
    .single();

  if (error || !data) {
    return NextResponse.json(
      { error: error?.message ?? "Invite was not found." },
      { status: 404 },
    );
  }

  return NextResponse.json({
    inviteLink,
    expiresAt,
    emailId: emailResult.id,
  });
}
