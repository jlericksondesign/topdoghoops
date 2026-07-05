import { NextRequest, NextResponse } from "next/server";

import { createInviteToken, hashInviteToken } from "@/lib/invite-token";
import { PARENT_INVITE_SESSION_COOKIE } from "@/lib/parent-session";
import { createSupabaseAdminClient } from "@/lib/supabase/server";

type GeneratePlayerLinkRouteProps = {
  params: Promise<{
    playerId: string;
  }>;
};

function getPairingLink(request: NextRequest, token: string) {
  const baseUrl = process.env.APP_BASE_URL ?? request.nextUrl.origin;
  return `${baseUrl.replace(/\/$/, "")}/pair/${token}`;
}

function getExpirationDate() {
  const expirationDate = new Date();
  expirationDate.setFullYear(expirationDate.getFullYear() + 1);
  return expirationDate.toISOString();
}

export async function POST(
  request: NextRequest,
  { params }: GeneratePlayerLinkRouteProps,
) {
  const { playerId } = await params;
  const inviteId = request.cookies.get(PARENT_INVITE_SESSION_COOKIE)?.value;
  const supabase = createSupabaseAdminClient();

  if (!inviteId || !supabase) {
    return NextResponse.json(
      { error: "Parent access is not ready on this device." },
      { status: 401 },
    );
  }

  const { data: player, error: playerError } = await supabase
    .from("players")
    .select("id,parent_profile_id,invite_id")
    .eq("id", playerId)
    .eq("invite_id", inviteId)
    .eq("is_active", true)
    .single();

  if (playerError || !player?.parent_profile_id) {
    return NextResponse.json(
      { error: "Player was not found for this family." },
      { status: 404 },
    );
  }

  const token = createInviteToken();
  const { error } = await supabase.from("child_device_tokens").insert({
    player_id: player.id,
    parent_profile_id: player.parent_profile_id,
    token_hash: hashInviteToken(token),
    label: "Player device link",
    expires_at: getExpirationDate(),
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    pairingLink: getPairingLink(request, token),
  });
}
