import { NextRequest, NextResponse } from "next/server";

import { PARENT_INVITE_SESSION_COOKIE } from "@/lib/parent-session";
import { createSupabaseAdminClient } from "@/lib/supabase/server";

type ApproveShotLogBody = {
  approvedTotal?: unknown;
  submissionId?: unknown;
};

function parseApprovedTotal(value: unknown) {
  const parsedValue = Number(value);

  if (!Number.isInteger(parsedValue) || parsedValue < 0) {
    return null;
  }

  return parsedValue;
}

export async function POST(request: NextRequest) {
  const inviteId = request.cookies.get(PARENT_INVITE_SESSION_COOKIE)?.value;
  const supabase = createSupabaseAdminClient();

  if (!inviteId || !supabase) {
    return NextResponse.json(
      { error: "Parent access is not ready on this device." },
      { status: 401 },
    );
  }

  const body = (await request.json()) as ApproveShotLogBody;
  const submissionId =
    typeof body.submissionId === "string" ? body.submissionId : "";
  const approvedTotal = parseApprovedTotal(body.approvedTotal);

  if (!submissionId || approvedTotal === null) {
    return NextResponse.json(
      { error: "Approval details are missing." },
      { status: 400 },
    );
  }

  const { data: submission, error: submissionError } = await supabase
    .from("shot_submissions")
    .select(
      "id,challenge_id,player_id,total_baskets,friend_bonus_baskets,status,players!inner(invite_id,parent_profile_id)",
    )
    .eq("id", submissionId)
    .eq("status", "pending")
    .eq("players.invite_id", inviteId)
    .single();

  if (submissionError || !submission) {
    return NextResponse.json(
      { error: "Pending shot log was not found." },
      { status: 404 },
    );
  }

  const player = Array.isArray(submission.players)
    ? submission.players[0]
    : submission.players;
  const friendBonusBaskets =
    approvedTotal >= submission.friend_bonus_baskets
      ? submission.friend_bonus_baskets
      : 0;
  const baseBaskets = approvedTotal - friendBonusBaskets;
  const wasEdited = approvedTotal !== submission.total_baskets;
  const { error: updateError } = await supabase
    .from("shot_submissions")
    .update({
      base_baskets: baseBaskets,
      friend_bonus_baskets: friendBonusBaskets,
      shot_with_friend: friendBonusBaskets > 0,
      total_baskets: approvedTotal,
      status: "approved",
      approved_by_profile_id: player?.parent_profile_id ?? null,
      approved_at: new Date().toISOString(),
      parent_edited: wasEdited,
      original_total_baskets: wasEdited ? submission.total_baskets : null,
    })
    .eq("id", submission.id);

  if (updateError) {
    return NextResponse.json({ error: updateError.message }, { status: 500 });
  }

  const { data: existingStats } = await supabase
    .from("player_stats")
    .select("approved_baskets_total,friend_bonus_count")
    .eq("player_id", submission.player_id)
    .eq("challenge_id", submission.challenge_id)
    .maybeSingle();
  const { error: statsError } = await supabase.from("player_stats").upsert({
    player_id: submission.player_id,
    challenge_id: submission.challenge_id,
    approved_baskets_total:
      (existingStats?.approved_baskets_total ?? 0) + approvedTotal,
    friend_bonus_count:
      (existingStats?.friend_bonus_count ?? 0) + (friendBonusBaskets > 0 ? 1 : 0),
    last_approved_submission_date: new Date().toISOString().slice(0, 10),
    updated_at: new Date().toISOString(),
  });

  if (statsError) {
    return NextResponse.json({ error: statsError.message }, { status: 500 });
  }

  return NextResponse.json({ approvedTotal });
}
