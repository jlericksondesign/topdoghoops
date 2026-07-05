import { cookies } from "next/headers";

import { PlayerEntryClient } from "@/components/features/shots/PlayerEntryClient";
import { PARENT_INVITE_SESSION_COOKIE } from "@/lib/parent-session";
import { createSupabaseAdminClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

type PlayerEntryPageProps = {
  searchParams: Promise<{
    playerName?: string;
  }>;
};

type PlayerEntryData = {
  playerFirstName: string;
  playerName: string;
  previousShotTotal: number;
};

function getFirstName(playerName: string) {
  return playerName.trim().split(/\s+/)[0] || "Player";
}

async function getPlayerEntryData(
  playerNameOverride?: string,
): Promise<PlayerEntryData> {
  const fallbackPlayerName = playerNameOverride?.trim() || "Player";
  const fallback = {
    playerFirstName: getFirstName(fallbackPlayerName),
    playerName: fallbackPlayerName,
    previousShotTotal: 0,
  };
  const cookieStore = await cookies();
  const inviteId = cookieStore.get(PARENT_INVITE_SESSION_COOKIE)?.value;
  const supabase = createSupabaseAdminClient();

  if (!inviteId || !supabase) {
    return fallback;
  }

  const { data: players } = await supabase
    .from("players")
    .select("id,first_name,last_initial")
    .eq("invite_id", inviteId)
    .eq("is_active", true)
    .order("created_at", { ascending: true })
    .limit(1);
  const player = players?.[0];

  if (!player) {
    return fallback;
  }

  const { data: approvedSubmissions } = await supabase
    .from("shot_submissions")
    .select("total_baskets")
    .eq("player_id", player.id)
    .eq("status", "approved");
  const previousShotTotal = (approvedSubmissions ?? []).reduce(
    (total, submission) => total + (submission.total_baskets ?? 0),
    0,
  );
  const playerName = `${player.first_name} ${player.last_initial}.`;

  return {
    playerFirstName: player.first_name,
    playerName,
    previousShotTotal,
  };
}

export default async function PlayerEntryPage({
  searchParams,
}: PlayerEntryPageProps) {
  const { playerName } = await searchParams;
  const playerEntryData = await getPlayerEntryData(playerName);

  return <PlayerEntryClient {...playerEntryData} />;
}
