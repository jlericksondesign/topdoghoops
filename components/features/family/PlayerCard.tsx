import Link from "next/link";
import { PlayerIdentityRow } from "@/components/features/family/PlayerIdentityRow";

type PlayerCardProps = {
  playerId: string;
  playerName: string;
  jerseyNumber: number;
  pendingApprovalCount: number;
  devicePaired?: boolean;
};

export function PlayerCard({
  playerId,
  playerName,
  jerseyNumber,
  pendingApprovalCount,
  devicePaired = false,
}: PlayerCardProps) {
  return (
    <div className="w-full overflow-hidden rounded-2xl bg-canton-card">
      <PlayerIdentityRow
        playerName={playerName}
        jerseyNumber={jerseyNumber}
        headerLabel="Your Player"
      />
      <div className="flex flex-col gap-2 px-5 pb-5 pt-1">
        <Link
          href={`/family/${playerId}/device-setup`}
          className="rounded-xl bg-canton-green py-2.5 text-center text-sm font-bold uppercase tracking-wide text-white"
        >
          {devicePaired ? "Reconnect Player Device" : "Set Up Player Device"}
        </Link>
        <Link
          href="/parent-approval"
          className="rounded-xl bg-canton-orange py-2.5 text-center text-sm font-bold uppercase tracking-wide text-white"
        >
          Approve Shot Log ({pendingApprovalCount})
        </Link>
      </div>
    </div>
  );
}
