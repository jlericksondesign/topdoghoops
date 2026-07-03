import Link from "next/link";
import { PlayerIdentityRow } from "@/components/features/family/PlayerIdentityRow";

type PairingSuccessCardProps = {
  playerName: string;
  jerseyNumber: number;
  startHref: string;
};

export function PairingSuccessCard({
  playerName,
  jerseyNumber,
  startHref,
}: PairingSuccessCardProps) {
  return (
    <div className="flex w-full flex-col gap-4">
      <div className="overflow-hidden rounded-2xl bg-canton-card">
        <PlayerIdentityRow playerName={playerName} jerseyNumber={jerseyNumber} />
      </div>
      <Link
        href={startHref}
        className="rounded-2xl border-2 border-white bg-canton-orange py-4 text-center text-base font-bold uppercase tracking-wide text-white shadow-[0_4px_0_rgba(0,0,0,0.15)]"
      >
        Let&apos;s Go!
      </Link>
    </div>
  );
}
