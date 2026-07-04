import Link from "next/link";
import { AppHeaderBar } from "@/components/app/AppHeaderBar";
import { RecentlyApprovedTable } from "@/components/features/approvals/RecentlyApprovedTable";
import { FamilySummaryCard } from "@/components/features/family/FamilySummaryCard";
import { PlayerCard } from "@/components/features/family/PlayerCard";
import { PARENT_INVITE_SESSION_COOKIE } from "@/lib/parent-session";
import {
  MOCK_PENDING_SUBMISSIONS,
  MOCK_RECENTLY_APPROVED_SUBMISSIONS,
} from "@/lib/mock/approvals";
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
  const pendingApprovalCount = MOCK_PENDING_SUBMISSIONS.length;
  const family = await getFamily();

  if (!family) {
    return (
      <main className="flex min-h-dvh flex-col bg-canton-cream-grid">
        <AppHeaderBar dashboardHref="/family" />
        <div className="flex flex-1 flex-col items-center gap-6 px-10 pb-10 pt-12">
          <FamilySummaryCard
            parentEmail="parent@example.com"
            pendingApprovalCount={pendingApprovalCount}
          />
          <PlayerCard
            playerId="marcus-johnson"
            playerName="Marcus Johnson"
            jerseyNumber={23}
            pendingApprovalCount={pendingApprovalCount}
            devicePaired
          />
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
