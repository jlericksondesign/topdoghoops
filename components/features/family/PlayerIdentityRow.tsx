import { PlayerAvatar } from "@/components/features/family/PlayerAvatar";

type PlayerIdentityRowProps = {
  playerName: string;
  jerseyNumber: number;
  headerLabel?: string;
  teamLabel?: string;
  leagueLabel?: string;
};

export function PlayerIdentityRow({
  playerName,
  jerseyNumber,
  headerLabel = "Player",
  teamLabel = "Canton Bulldogs",
  leagueLabel = "Boys Middle School",
}: PlayerIdentityRowProps) {
  return (
    <div className="overflow-hidden rounded-t-2xl">
      <div className="flex items-center justify-between bg-canton-green px-5 py-2 text-xs font-bold uppercase tracking-widest text-white">
        <span>{headerLabel}</span>
        <span>{teamLabel}</span>
      </div>
      <div className="flex items-center gap-4 bg-canton-card px-5 py-5">
        <PlayerAvatar jerseyNumber={jerseyNumber} />
        <div>
          <p className="text-lg font-bold text-white">{playerName}</p>
          <p className="text-sm text-canton-pill">
            #{jerseyNumber} · {leagueLabel}
          </p>
        </div>
      </div>
    </div>
  );
}
