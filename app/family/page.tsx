import Link from "next/link";
import { AppHeaderBar } from "@/components/app/AppHeaderBar";
import { RecentlyApprovedTable } from "@/components/features/approvals/RecentlyApprovedTable";
import { FamilySummaryCard } from "@/components/features/family/FamilySummaryCard";
import { PlayerCard } from "@/components/features/family/PlayerCard";
import { PARENT_INVITE_SESSION_COOKIE } from "@/lib/parent-session";
import { MOCK_RECENTLY_APPROVED_SUBMISSIONS } from "@/lib/mock/approvals";
import { createSupabaseAdminClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

type ParentInvite = {
  parent_email: string;
};

type Player = {
  id: string;
  first_name: string;
  last_initial: string;
  grade: number;
  division: string;
};

function getJerseyNumber(player: Player) {
  const numericLastInitial = Number.parseInt(player.last_initial, 10);

  if (Number.isInteger(numericLastInitial) && numericLastInitial > 0) {
    return numericLastInitial;
  }

  return player.grade;
}

async function getFamily() {
  const cookieStore = await cookies();
  const inviteId = cookieStore.get(PARENT_INVITE_SESSION_COOKIE)?.value;
  const supabase = createSupabaseAdminClient();

  if (!inviteId || !supabase) {
    return null;
  }

  const [{ data: invite }, { data: players }] = await Promise.all([
    supabase
      .from("parent_invites")
      .select("parent_email")
      .eq("id", inviteId)
      .eq("status", "accepted")
      .single(),
    supabase
      .from("players")
      .select("id,first_name,last_initial,grade,division")
      .eq("invite_id", inviteId)
      .eq("is_active", true)
      .order("created_at", { ascending: true }),
  ]);

  if (!invite || !players || players.length === 0) {
    return null;
  }

  return {
    invite: invite as ParentInvite,
    players: players as Player[],
  };
}

export default async function FamilyPage() {
  const pendingApprovalCount = 0;
  const family = await getFamily();

  if (!family) {
    return (
      <main className="flex min-h-dvh flex-col bg-canton-cream-grid">
        <AppHeaderBar dashboardHref="/family" />
        <div className="flex flex-1 flex-col justify-center px-8 pb-10 pt-12">
          <div className="rounded-2xl border-2 border-canton-ink bg-white px-5 py-6 text-center">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-canton-green">
              Family
            </p>
            <h1 className="mt-2 text-3xl font-black uppercase leading-tight text-canton-ink">
              Invite Needed
            </h1>
            <p className="mt-3 text-sm font-semibold leading-6 text-canton-muted">
              Open your Top Dog Hoops invite link to confirm your player and
              activate this dashboard.
            </p>
            <Link
              href="/"
              className="mt-5 inline-flex h-12 items-center justify-center rounded-xl bg-canton-green px-5 text-sm font-black uppercase tracking-wide text-white"
            >
              Back Home
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-dvh flex-col bg-canton-cream-grid">
      <AppHeaderBar dashboardHref="/family" />
      <div className="flex flex-1 flex-col items-center gap-6 px-10 pb-10 pt-12">
        <FamilySummaryCard
          parentEmail={family.invite.parent_email}
          pendingApprovalCount={pendingApprovalCount}
        />
        {family.players.map((player) => (
          <PlayerCard
            key={player.id}
            playerId={player.id}
            playerName={`${player.first_name} ${player.last_initial}.`}
            jerseyNumber={getJerseyNumber(player)}
            pendingApprovalCount={pendingApprovalCount}
          />
        ))}
        <Link
          href="/leaderboards?from=parent"
          className="text-sm font-bold uppercase tracking-wide text-canton-ink underline underline-offset-4"
        >
          Leaderboard
        </Link>
        <RecentlyApprovedTable entries={MOCK_RECENTLY_APPROVED_SUBMISSIONS} />
      </div>
    </main>
  );
}
