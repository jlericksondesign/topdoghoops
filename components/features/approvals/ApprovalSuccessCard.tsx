import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

type ApprovalSuccessCardProps = {
  playerName: string;
  approvedTotal: number;
};

export function ApprovalSuccessCard({
  playerName,
  approvedTotal,
}: ApprovalSuccessCardProps) {
  return (
    <div className="flex w-full flex-col items-center gap-4 rounded-2xl bg-canton-callout px-6 py-10 text-center">
      <CheckCircle2 className="h-10 w-10 text-canton-green" aria-hidden />
      <p className="text-lg font-bold text-canton-ink">
        {playerName}&apos;s shots are approved
      </p>
      <p className="canton-score-font text-3xl font-bold text-canton-green">
        +{approvedTotal}
      </p>
      <p className="text-sm text-canton-callout-text">
        The leaderboard and streak will update with this total.
      </p>
      <Link
        href="/parent-approval"
        className="mt-2 rounded-2xl bg-canton-green px-6 py-3 text-sm font-bold uppercase tracking-wide text-white"
      >
        Back to Approvals
      </Link>
    </div>
  );
}
