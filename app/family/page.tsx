import Link from "next/link";
import { AppHeaderBar } from "@/components/app/AppHeaderBar";
import { FamilySummaryCard } from "@/components/features/family/FamilySummaryCard";
import { PlayerCard } from "@/components/features/family/PlayerCard";

export default function FamilyPage() {
  return (
    <main className="flex min-h-dvh flex-col bg-canton-cream-grid">
      <AppHeaderBar dashboardHref="/family" />
      <div className="flex flex-1 flex-col items-center gap-8 px-10 pb-10 pt-12">
        <FamilySummaryCard parentEmail="parent@example.com" pendingApprovalCount={0} />
        <PlayerCard
          playerId="marcus-johnson"
          playerName="Marcus Johnson"
          jerseyNumber={23}
          pendingApprovalCount={0}
        />
        <div className="flex-1" />
        <Link
          href="/leaderboards?from=parent"
          className="text-sm font-bold uppercase tracking-wide text-canton-ink underline underline-offset-4"
        >
          Go to Leader Board
        </Link>
      </div>
    </main>
  );
}
