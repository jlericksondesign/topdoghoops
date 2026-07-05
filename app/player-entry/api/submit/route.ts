import { NextRequest, NextResponse } from "next/server";

import { CHILD_DEVICE_SESSION_COOKIE } from "@/lib/child-session";
import { PARENT_INVITE_SESSION_COOKIE } from "@/lib/parent-session";
import { createSupabaseAdminClient } from "@/lib/supabase/server";

type SubmitShotLogBody = {
  baseBaskets?: unknown;
  shotWithFriend?: unknown;
};

function getTodayDate() {
  return new Date().toISOString().slice(0, 10);
}

function parseBaseBaskets(value: unknown) {
  const parsedValue = Number(value);

  if (!Number.isInteger(parsedValue) || parsedValue < 1) {
    return null;
  }

  return parsedValue;
}

export async function POST(request: NextRequest) {
  const childDeviceTokenId = request.cookies.get(
    CHILD_DEVICE_SESSION_COOKIE,
  )?.value;
  const inviteId = request.cookies.get(PARENT_INVITE_SESSION_COOKIE)?.value;
  const supabase = createSupabaseAdminClient();

  if (!supabase || (!inviteId && !childDeviceTokenId)) {
    return NextResponse.json(
      { error: "Player access is not ready on this device." },
      { status: 401 },
    );
  }

  const body = (await request.json()) as SubmitShotLogBody;
  const baseBaskets = parseBaseBaskets(body.baseBaskets);
  const shotWithFriend = body.shotWithFriend === true;
  const friendBonusBaskets = shotWithFriend ? 10 : 0;

  if (baseBaskets === null) {
    return NextResponse.json(
      { error: "Add at least one shot before submitting." },
      { status: 400 },
    );
  }

  let player:
    | {
        id: string;
        parent_profile_id: string | null;
      }
    | null = null;

  if (childDeviceTokenId) {
    const { data: deviceToken } = await supabase
      .from("child_device_tokens")
      .select(
        "revoked_at,expires_at,players!inner(id,parent_profile_id,is_active)",
      )
      .eq("id", childDeviceTokenId)
      .single();

    if (
      deviceToken &&
      !deviceToken.revoked_at &&
      (!deviceToken.expires_at ||
        new Date(deviceToken.expires_at) >= new Date())
    ) {
      const tokenPlayer = Array.isArray(deviceToken.players)
        ? deviceToken.players[0]
        : deviceToken.players;

      if (tokenPlayer?.is_active) {
        player = tokenPlayer;
      }
    }
  }

  if (!player && inviteId) {
    const { data: players } = await supabase
      .from("players")
      .select("id,parent_profile_id")
      .eq("invite_id", inviteId)
      .eq("is_active", true)
      .order("created_at", { ascending: true })
      .limit(1);
    player = players?.[0] ?? null;
  }

  const { data: challenge } = await supabase
    .from("challenges")
    .select("id")
    .eq("is_active", true)
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  if (!player || !challenge) {
    return NextResponse.json(
      { error: "Player or challenge is not ready yet." },
      { status: 400 },
    );
  }

  const totalBaskets = baseBaskets + friendBonusBaskets;
  const { data: submission, error } = await supabase
    .from("shot_submissions")
    .insert({
      challenge_id: challenge.id,
      player_id: player.id,
      submitted_by_profile_id: player.parent_profile_id,
      submitted_by_child_device_token_id: childDeviceTokenId ?? null,
      submission_date: getTodayDate(),
      base_baskets: baseBaskets,
      shot_with_friend: shotWithFriend,
      friend_bonus_baskets: friendBonusBaskets,
      total_baskets: totalBaskets,
      status: "pending",
    })
    .select("id,total_baskets")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    submissionId: submission.id,
    submittedTotal: submission.total_baskets,
  });
}
