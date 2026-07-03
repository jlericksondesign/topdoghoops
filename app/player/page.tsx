import Link from "next/link";
import { AppHeaderBar } from "@/components/app/AppHeaderBar";
import { PlayerIdentityRow } from "@/components/features/family/PlayerIdentityRow";
import { PlayerSubmissionHistory } from "@/components/features/shots/PlayerSubmissionHistory";
import {
  MOCK_PENDING_SUBMISSIONS,
  MOCK_RECENTLY_APPROVED_SUBMISSIONS,
} from "@/lib/mock/approvals";

const MOCK_PLAYER_NAME = "Marcus Johnson";
const MOCK_JERSEY_NUMBER = 23;

export default function PlayerHomePage() {
  const submissionHistory = [
    ...MOCK_PENDING_SUBMISSIONS.map((entry) => ({
      submissionId: entry.submissionId,
      dateShort: entry.dateShort,
      submittedAt: entry.submittedAt,
      shotTotal: entry.shotTotal,
      status: "Pending" as const,
      canEdit: true,
    })),
    ...MOCK_RECENTLY_APPROVED_SUBMISSIONS.map((entry) => ({
      submissionId: entry.submissionId,
      dateShort: entry.dateShort,
      submittedAt: entry.submittedAt,
      shotTotal: entry.shotTotal,
      status: "Approved" as const,
    })),
  ];

  return (
    <main className="flex min-h-dvh flex-col bg-canton-grid">
      <AppHeaderBar dashboardHref="/player" />
      <div className="flex flex-1 flex-col items-center gap-6 px-10 pb-10 pt-8">
        <h1 className="text-center font-heading text-3xl font-black uppercase text-canton-ink">
          You&apos;re In!
        </h1>

        <div className="w-full overflow-hidden rounded-2xl">
          <PlayerIdentityRow
            playerName={MOCK_PLAYER_NAME}
            jerseyNumber={MOCK_JERSEY_NUMBER}
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
