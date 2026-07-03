import Link from "next/link";
import { AppHeaderBar } from "@/components/app/AppHeaderBar";
import { RecentlyApprovedTable } from "@/components/features/approvals/RecentlyApprovedTable";
import { FamilySummaryCard } from "@/components/features/family/FamilySummaryCard";
import { PlayerCard } from "@/components/features/family/PlayerCard";
import {
  MOCK_PENDING_SUBMISSIONS,
  MOCK_RECENTLY_APPROVED_SUBMISSIONS,
} from "@/lib/mock/approvals";

export default function FamilyPage() {
  const pendingApprovalCount = MOCK_PENDING_SUBMISSIONS.length;

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
