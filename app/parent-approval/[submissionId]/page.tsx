import Link from "next/link";
import { cookies } from "next/headers";

import { AppHeaderBar } from "@/components/app/AppHeaderBar";
import { ApprovalDetailClient } from "@/components/features/approvals/ApprovalDetailClient";
import { PARENT_INVITE_SESSION_COOKIE } from "@/lib/parent-session";
import { createSupabaseAdminClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

type ApprovalDetailPageProps = {
  params: Promise<{
    submissionId: string;
  }>;
};

type Player = {
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

async function getSubmission(submissionId: string) {
  const cookieStore = await cookies();
  const inviteId = cookieStore.get(PARENT_INVITE_SESSION_COOKIE)?.value;
  const supabase = createSupabaseAdminClient();

  if (!inviteId || !supabase) {
    return null;
  }

  const { data: submission } = await supabase
    .from("shot_submissions")
    .select(
      "id,submission_date,total_baskets,shot_with_friend,created_at,players!inner(first_name,last_initial,grade,invite_id)",
    )
    .eq("id", submissionId)
    .eq("status", "pending")
    .eq("players.invite_id", inviteId)
    .single();

  if (!submission) {
    return null;
  }

  const player = Array.isArray(submission.players)
    ? submission.players[0]
    : submission.players;

  if (!player) {
    return null;
  }

  return {
    friendBonus: submission.shot_with_friend,
    jerseyNumber: getJerseyNumber(player),
    playerName: `${player.first_name} ${player.last_initial}.`,
    shotTotal: submission.total_baskets,
    submittedAt: formatTime(submission.created_at),
    submissionDate: formatDate(submission.submission_date),
    submissionId: submission.id,
  };
}

export default async function ApprovalDetailPage({
  params,
}: ApprovalDetailPageProps) {
  const { submissionId } = await params;
  const submission = await getSubmission(submissionId);

  return (
    <main className="flex min-h-dvh flex-col bg-canton-cream-grid">
      <AppHeaderBar dashboardHref="/family" />
      <div className="flex flex-1 flex-col items-center gap-6 px-10 pb-10 pt-8">
        {submission ? (
          <ApprovalDetailClient submission={submission} />
        ) : (
          <div className="rounded-2xl border-2 border-canton-ink bg-white px-5 py-6 text-center">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-canton-green">
              Approvals
            </p>
            <h1 className="mt-2 text-3xl font-black uppercase leading-tight text-canton-ink">
              Nothing To Review
            </h1>
            <p className="mt-3 text-sm font-semibold leading-6 text-canton-muted">
              This shot log may have already been approved.
            </p>
            <Link
              href="/parent-approval"
              className="mt-5 inline-flex h-12 items-center justify-center rounded-xl bg-canton-green px-5 text-sm font-black uppercase tracking-wide text-white"
            >
              Back To Approvals
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
