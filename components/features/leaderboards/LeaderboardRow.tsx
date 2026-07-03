type LeaderboardRowProps = {
  playerName: string;
  score: number;
};

export function LeaderboardRow({ playerName, score }: LeaderboardRowProps) {
  return (
    <div className="flex items-baseline justify-between py-3">
      <span className="canton-score-font text-xl text-canton-orange">
        {playerName}
      </span>
      <span className="canton-score-font text-xl font-bold text-canton-ink">
        {String(score).padStart(2, "0")}
      </span>
    </div>
  );
}
