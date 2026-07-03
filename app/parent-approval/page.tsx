import Link from "next/link";
import { AppHeaderBar } from "@/components/app/AppHeaderBar";
import { ApprovalQueueList } from "@/components/features/approvals/ApprovalQueueList";
import { MOCK_PENDING_SUBMISSIONS } from "@/lib/mock/approvals";

const MOCK_RECENT = [
  { playerName: "Marcus Johnson", date: "Mon", shotTotal: 31 },
  { playerName: "Marcus Johnson", date: "Sun", shotTotal: 18 },
];

export default function ParentApprovalPage() {
  return (
    <main className="flex min-h-dvh flex-col bg-canton-cream-grid">
      <AppHeaderBar dashboardHref="/family" />
      <div className="flex flex-1 flex-col items-center gap-8 px-10 pb-10 pt-12">
        <h1 className="text-center text-3xl font-black uppercase leading-tight text-canton-ink">
          Shot Log
          <br />
          Approvals
        </h1>

        <ApprovalQueueList entries={MOCK_PENDING_SUBMISSIONS} />

        {MOCK_RECENT.length > 0 ? (
          <div className="w-full">
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-canton-muted">
              Recently approved
            </p>
            <div className="flex flex-col divide-y divide-canton-cream-line rounded-2xl bg-white px-4">
              {MOCK_RECENT.map((entry, index) => (
                <div
                  key={`${entry.playerName}-${index}`}
                  className="flex items-center justify-between py-3 text-sm"
                >
                  <span className="text-canton-ink">
                    {entry.playerName} &middot; {entry.date}
                  </span>
                  <span className="canton-score-font font-bold text-canton-green">
                    +{entry.shotTotal}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        <Link
          href="/family"
          className="text-sm font-bold uppercase tracking-wide text-canton-ink underline underline-offset-4"
        >
          Back to Dashboard
        </Link>
      </div>
    </main>
  );
}
