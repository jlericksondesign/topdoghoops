import Link from "next/link";
import { PlayerIdentityRow } from "@/components/features/family/PlayerIdentityRow";

type PlayerProfilePreviewCardProps = {
  playerName: string;
  jerseyNumber: number;
  onAcceptHref: string;
};

export function PlayerProfilePreviewCard({
  playerName,
  jerseyNumber,
  onAcceptHref,
}: PlayerProfilePreviewCardProps) {
  return (
    <div className="w-full">
      <div className="overflow-hidden rounded-2xl bg-canton-card">
        <PlayerIdentityRow playerName={playerName} jerseyNumber={jerseyNumber} />
        <div className="px-5 pb-5 pt-1">
          <Link
            href={onAcceptHref}
            className="block rounded-xl bg-canton-green py-2.5 text-center text-sm font-bold uppercase tracking-wide text-white"
          >
            Accept &amp; Continue
          </Link>
        </div>
      </div>
      <p className="mt-3 text-center text-xs text-canton-muted">
        By continuing you confirm this is your child&apos;s account.
      </p>
    </div>
  );
}
