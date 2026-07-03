type ArcadeScoreDisplayProps = {
  playerName: string;
  value: number;
  padded?: boolean;
};

export function ArcadeScoreDisplay({
  playerName,
  value,
  padded = false,
}: ArcadeScoreDisplayProps) {
  const display = padded ? String(value).padStart(2, "0") : String(value);

  return (
    <div className="w-full rounded-xl bg-canton-teal px-6 pb-6 pt-4">
      <p className="text-center text-xl font-bold text-canton-ink">
        {playerName}
      </p>
      <div className="mt-3 rounded-lg border-4 border-canton-cream bg-canton-teal py-6">
        <p className="canton-score-font text-center text-6xl font-bold text-white">
          {display}
        </p>
      </div>
    </div>
  );
}
