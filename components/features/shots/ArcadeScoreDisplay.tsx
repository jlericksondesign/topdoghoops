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
    <div className="w-full bg-canton-teal px-4 pb-3 pt-4">
      <p className="text-center text-[30px] font-bold leading-none text-canton-ink">
        {playerName}
      </p>
      <div className="mt-4 border-[10px] border-canton-cream bg-canton-teal px-3 py-6">
        <p className="canton-score-font text-center text-[76px] font-bold leading-none text-white">
          {display}
        </p>
      </div>
    </div>
  );
}
