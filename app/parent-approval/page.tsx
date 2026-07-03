import Link from "next/link";
import { AppHeaderBar } from "@/components/app/AppHeaderBar";
import { ApprovalQueueList } from "@/components/features/approvals/ApprovalQueueList";
import { MOCK_PENDING_SUBMISSIONS } from "@/lib/mock/approvals";

export default function ParentApprovalPage() {
  return (
    <main className="flex min-h-dvh flex-col bg-canton-cream-grid">
      <AppHeaderBar dashboardHref="/family" />
      <div className="flex flex-1 flex-col items-center gap-8 px-10 pb-10 pt-12">
        <h1 className="text-center font-heading text-3xl font-black uppercase leading-tight text-canton-ink">
          Shot Log
          <br />
          Approvals
        </h1>

        <ApprovalQueueList entries={MOCK_PENDING_SUBMISSIONS} />

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
