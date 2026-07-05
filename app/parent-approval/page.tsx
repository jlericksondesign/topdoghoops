import Link from "next/link";
import { AppHeaderBar } from "@/components/app/AppHeaderBar";
import { FirstVisitDisclosure } from "@/components/app/FirstVisitDisclosure";
import { ApprovalQueueList } from "@/components/features/approvals/ApprovalQueueList";
import { PARENT_INVITE_SESSION_COOKIE } from "@/lib/parent-session";
import { createSupabaseAdminClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

type Player = {
  id: string;
  first_name: string;
  last_initial: string;
  grade: number;
};

function getJerseyNumber(player: Player) {
  const numericLastInitial = Number.parseInt(player.last_initial, 10);

  if (Number.isInteger(numericLastInitial) && numericLastInitial > 0) {
    return numericLastInitial;
  }

  return player.grade;
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
  }).format(new Date(value));
}

function formatTime(value: string) {
  return new Intl.DateTimeFormat("en", {
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));
}

async function getPendingSubmissions() {
  const cookieStore = await cookies();
  const inviteId = cookieStore.get(PARENT_INVITE_SESSION_COOKIE)?.value;
  const supabase = createSupabaseAdminClient();

  if (!inviteId || !supabase) {
    return [];
  }

  const { data: players } = await supabase
    .from("players")
    .select("id,first_name,last_initial,grade")
    .eq("invite_id", inviteId)
    .eq("is_active", true);
  const typedPlayers = (players ?? []) as Player[];
  const playerIds = typedPlayers.map((player) => player.id);

  if (playerIds.length === 0) {
    return [];
  }

  const { data: submissions } = await supabase
    .from("shot_submissions")
    .select(
      "id,player_id,submission_date,total_baskets,shot_with_friend,created_at",
    )
    .in("player_id", playerIds)
    .eq("status", "pending")
    .order("created_at", { ascending: false });
  const playersById = new Map(
    typedPlayers.map((player) => [player.id, player]),
  );

  return (submissions ?? []).flatMap((submission) => {
    const player = playersById.get(submission.player_id);

    if (!player) {
      return [];
    }

    return [
      {
        submissionId: submission.id,
        playerName: `${player.first_name} ${player.last_initial}.`,
        jerseyNumber: getJerseyNumber(player),
        date: formatDate(submission.submission_date),
        submittedAt: formatTime(submission.created_at),
        shotTotal: submission.total_baskets,
        friendBonus: submission.shot_with_friend,
      },
    ];
  });
}

export default async function ParentApprovalPage() {
  const pendingSubmissions = await getPendingSubmissions();

  return (
    <main className="flex min-h-dvh flex-col bg-canton-cream-grid">
      <AppHeaderBar dashboardHref="/family" />
      <FirstVisitDisclosure
        storageKey="topdog-parent-approval-rules"
        title="Approval Rules"
      >
        Approve shot logs only after checking that the entry looks correct.
        Approved shots can appear on family totals and leaderboards.
      </FirstVisitDisclosure>
      <div className="flex flex-1 flex-col items-center gap-8 px-10 pb-10 pt-12">
        <h1 className="text-center font-heading text-3xl font-black uppercase leading-tight text-canton-ink">
          Shot Log
          <br />
          Approvals
        </h1>

        <ApprovalQueueList entries={pendingSubmissions} />

        <Link
          href="/family"
          className="text-sm font-bold uppercase tracking-wide text-canton-ink underline underline-offset-4"
        >
          Back to Dashboard
        </Link>
      </div>
    </main>
  );
}
