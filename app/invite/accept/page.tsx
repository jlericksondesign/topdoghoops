import { AppHeaderBar } from "@/components/app/AppHeaderBar";
import { FamilySummaryCard } from "@/components/features/family/FamilySummaryCard";
import { PlayerProfilePreviewCard } from "@/components/features/family/PlayerProfilePreviewCard";

export default function InviteAcceptPage() {
  return (
    <main className="flex min-h-dvh flex-col bg-canton-cream-grid">
      <AppHeaderBar />
      <div className="flex flex-1 flex-col items-center gap-16 px-10 pb-10 pt-12">
        <FamilySummaryCard parentEmail="parent@example.com" />
        <PlayerProfilePreviewCard
          playerName="Marcus Johnson"
          jerseyNumber={23}
          onAcceptHref="/family"
        />
      </div>
    </main>
  );
}
