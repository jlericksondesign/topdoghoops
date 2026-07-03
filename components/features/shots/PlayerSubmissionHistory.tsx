import Link from "next/link";

type SubmissionHistoryEntry = {
  submissionId: string;
  dateShort: string;
  submittedAt: string;
  shotTotal: number;
  status: "Pending" | "Approved";
  canEdit?: boolean;
};

type PlayerSubmissionHistoryProps = {
  entries: SubmissionHistoryEntry[];
};

export function PlayerSubmissionHistory({ entries }: PlayerSubmissionHistoryProps) {
  if (entries.length === 0) {
    return null;
  }

  return (
    <div className="w-full">
      <p className="mb-2 text-xs font-bold uppercase tracking-widest text-canton-muted">
        Shot log
      </p>
      <div className="flex flex-col divide-y divide-canton-cream-line rounded-2xl bg-white px-4">
        {entries.map((entry) => (
          <div
            key={entry.submissionId}
            className="grid grid-cols-[1fr_auto] gap-3 py-3 text-sm"
          >
            <div>
              <p className="font-bold text-canton-ink">
                {entry.dateShort} · {entry.submittedAt}
              </p>
              <p className="mt-1 text-xs font-bold uppercase tracking-wide text-canton-muted">
                {entry.status}
              </p>
            </div>
            <div className="flex flex-col items-end justify-center gap-1">
              <span className="canton-score-font font-bold text-canton-green">
                {entry.shotTotal}
              </span>
              {entry.canEdit ? (
                <Link
                  href="/player-entry"
                  className="text-xs font-bold uppercase tracking-wide text-canton-ink underline underline-offset-2"
                >
                  Edit
                </Link>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
