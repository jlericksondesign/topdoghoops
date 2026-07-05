import Link from "next/link";
import { cookies } from "next/headers";

import { AppHeaderBar } from "@/components/app/AppHeaderBar";
import { PlayerIdentityRow } from "@/components/features/family/PlayerIdentityRow";
import { PlayerSubmissionHistory } from "@/components/features/shots/PlayerSubmissionHistory";
import { CHILD_DEVICE_SESSION_COOKIE } from "@/lib/child-session";
import { PARENT_INVITE_SESSION_COOKIE } from "@/lib/parent-session";
import { createSupabaseAdminClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

type Player = {
  id: string;
  first_name: string;
  grade: number;
  last_initial: string;
};

function getJerseyNumber(player: Player) {
  const numericLastInitial = Number.parseInt(player.last_initial, 10);

  if (Number.isInteger(numericLastInitial) && numericLastInitial > 0) {
    return numericLastInitial;
  }

  return player.grade;
}

function formatDateShort(value: string) {
  return new Intl.DateTimeFormat("en", {
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(value));
}

function formatTime(value: string) {
  return new Intl.DateTimeFormat("en", {
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));
}

async function getPlayerDashboardData() {
  const cookieStore = await cookies();
  const childDeviceTokenId = cookieStore.get(CHILD_DEVICE_SESSION_COOKIE)?.value;
  const inviteId = cookieStore.get(PARENT_INVITE_SESSION_COOKIE)?.value;
  const supabase = createSupabaseAdminClient();

  if (!supabase) {
    return null;
  }

  let player: Player | null = null;

  if (childDeviceTokenId) {
    const { data: deviceToken } = await supabase
      .from("child_device_tokens")
      .select("revoked_at,expires_at,players!inner(id,first_name,last_initial,grade)")
      .eq("id", childDeviceTokenId)
      .single();

    if (
      deviceToken &&
      !deviceToken.revoked_at &&
      (!deviceToken.expires_at ||
        new Date(deviceToken.expires_at) >= new Date())
    ) {
      player = Array.isArray(deviceToken.players)
        ? deviceToken.players[0]
        : deviceToken.players;
    }
  }

  if (!player && inviteId) {
    const { data: players } = await supabase
      .from("players")
      .select("id,first_name,last_initial,grade")
      .eq("invite_id", inviteId)
      .eq("is_active", true)
      .order("created_at", { ascending: true })
      .limit(1);
    player = players?.[0] ?? null;
  }

  if (!player) {
    return null;
  }

  const { data: submissions } = await supabase
    .from("shot_submissions")
    .select("id,submission_date,total_baskets,status,created_at")
    .eq("player_id", player.id)
    .order("created_at", { ascending: false })
    .limit(5);

  return {
    player,
    submissionHistory: (submissions ?? []).map((submission) => ({
      submissionId: submission.id,
      dateShort: formatDateShort(submission.submission_date),
      submittedAt: formatTime(submission.created_at),
      shotTotal: submission.total_baskets,
      status:
        submission.status === "approved"
          ? ("Approved" as const)
          : ("Pending" as const),
      canEdit: submission.status === "pending",
    })),
  };
}

export default async function PlayerHomePage() {
  const dashboardData = await getPlayerDashboardData();

  if (!dashboardData) {
    return (
      <main className="flex min-h-dvh flex-col bg-canton-grid">
        <AppHeaderBar dashboardHref="/player" />
        <div className="flex flex-1 flex-col justify-center px-8 pb-10 pt-12">
          <div className="rounded-2xl border-2 border-canton-ink bg-white px-5 py-6 text-center">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-canton-green">
              Player
            </p>
            <h1 className="mt-2 text-3xl font-black uppercase leading-tight text-canton-ink">
              Link Needed
            </h1>
            <p className="mt-3 text-sm font-semibold leading-6 text-canton-muted">
              Ask your parent to set up this device from the family dashboard.
            </p>
            <Link
              href="/kid/sign-in"
              className="mt-5 inline-flex h-12 items-center justify-center rounded-xl bg-canton-green px-5 text-sm font-black uppercase tracking-wide text-white"
            >
              Kid Sign In
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const { player, submissionHistory } = dashboardData;

  return (
    <main className="flex min-h-dvh flex-col bg-canton-grid">
      <AppHeaderBar dashboardHref="/player" />
      <div className="flex flex-1 flex-col items-center gap-6 px-10 pb-10 pt-8">
        <h1 className="text-center font-heading text-3xl font-black uppercase text-canton-ink">
          You&apos;re In!
        </h1>

        <div className="w-full overflow-hidden rounded-2xl">
          <PlayerIdentityRow
            playerName={`${player.first_name} ${player.last_initial}.`}
            jerseyNumber={getJerseyNumber(player)}
          />
        </div>

        <PlayerSubmissionHistory entries={submissionHistory} />

        <div className="flex w-full flex-col gap-4">
          <Link
            href="/player-entry"
            className="rounded-2xl border-2 border-white bg-canton-green py-4 text-center text-base font-bold uppercase tracking-wide text-white shadow-[0_4px_0_rgba(0,0,0,0.15)]"
          >
            Log Today&apos;s Shots
          </Link>
          <Link
            href="/leaderboards?from=player"
            className="rounded-2xl border-2 border-white bg-canton-orange py-4 text-center text-base font-bold uppercase tracking-wide text-white shadow-[0_4px_0_rgba(0,0,0,0.15)]"
          >
            Leaderboard
          </Link>
        </div>
      </div>
    </main>
  );
}
