import { DivisionSelect } from "@/components/features/leaderboards/DivisionSelect";
import { LeaderboardRow } from "@/components/features/leaderboards/LeaderboardRow";

type LeaderboardEntry = {
  playerName: string;
  score: number;
};

type LeaderboardCardProps = {
  division: string;
  onDivisionChange: (value: string) => void;
  entries: LeaderboardEntry[];
};

export function LeaderboardCard({
  division,
  onDivisionChange,
  entries,
}: LeaderboardCardProps) {
  return (
    <div className="flex w-full flex-col gap-4">
      <DivisionSelect value={division} onChange={onDivisionChange} />
      {entries.length > 0 ? (
        <div className="flex flex-col">
          {entries.map((entry) => (
            <LeaderboardRow
              key={entry.playerName}
              playerName={entry.playerName}
              score={entry.score}
            />
          ))}
        </div>
      ) : (
        <p className="py-8 text-center text-sm text-canton-muted">
          No scores yet for this division.
        </p>
      )}
    </div>
  );
}
