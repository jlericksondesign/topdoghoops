type RecentlyApprovedEntry = {
  playerName: string;
  dateShort: string;
  submittedAt: string;
  shotTotal: number;
};

type RecentlyApprovedTableProps = {
  entries: RecentlyApprovedEntry[];
};

export function RecentlyApprovedTable({ entries }: RecentlyApprovedTableProps) {
  if (entries.length === 0) {
    return null;
  }

  return (
    <div className="w-full">
      <p className="mb-2 text-xs font-bold uppercase tracking-widest text-canton-muted">
        Recently approved
      </p>
      <div className="flex flex-col divide-y divide-canton-cream-line rounded-2xl bg-white px-4">
        {entries.map((entry) => (
          <div
            key={`${entry.playerName}-${entry.dateShort}-${entry.submittedAt}`}
            className="grid grid-cols-[1fr_auto] gap-3 py-3 text-sm"
          >
            <div>
              <p className="font-bold text-canton-ink">{entry.playerName}</p>
              <p className="text-xs text-canton-muted">
                {entry.dateShort} · {entry.submittedAt}
              </p>
            </div>
            <span className="canton-score-font self-center font-bold text-canton-green">
              +{entry.shotTotal}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
