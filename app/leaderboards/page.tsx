import Link from "next/link";

import { AppHeaderBar } from "@/components/app/AppHeaderBar";
import {
  LeaderboardsClient,
  type LeaderboardEntry,
} from "@/components/features/leaderboards/LeaderboardsClient";
import { createSupabaseAdminClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

type LeaderboardsPageProps = {
  searchParams: Promise<{
    from?: string;
  }>;
};

async function getLeaderboardEntries(): Promise<LeaderboardEntry[]> {
  const supabase = createSupabaseAdminClient();

  if (!supabase) {
    return [];
  }

  const { data: activeChallenge } = await supabase
    .from("challenges")
    .select("id")
    .eq("is_active", true)
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  if (!activeChallenge) {
    return [];
  }

  const { data } = await supabase
    .from("leaderboard_challenge_totals")
    .select("player_display_name,division,approved_baskets_total")
    .eq("challenge_id", activeChallenge.id)
    .order("overall_rank", { ascending: true })
    .limit(100);

  return (data ?? []).map((entry) => ({
    division: entry.division,
    playerName: entry.player_display_name,
    score: entry.approved_baskets_total,
  }));
}

export default async function LeaderboardsPage({
  searchParams,
}: LeaderboardsPageProps) {
  const { from } = await searchParams;
  const isParent = from === "parent";
  const entries = await getLeaderboardEntries();

  return (
    <main className="flex min-h-dvh flex-col bg-canton-cream-grid">
      <AppHeaderBar dashboardHref={isParent ? "/family" : "/player"} />
      <div className="flex flex-1 flex-col items-center gap-6 px-10 pb-10 pt-10">
        <h1 className="text-center font-heading text-3xl font-black uppercase text-canton-ink">
          Leaderboard
        </h1>
        <LeaderboardsClient entries={entries} />
        <Link
          href={isParent ? "/family" : "/player"}
          className="text-sm font-bold uppercase tracking-wide text-canton-ink underline underline-offset-4"
        >
          {isParent ? "Back to Parent Dashboard" : "Back to My Dashboard"}
        </Link>
      </div>
    </main>
  );
}
