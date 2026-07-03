import Link from "next/link";

type FamilySummaryCardProps = {
  parentEmail: string;
  pendingApprovalCount?: number;
};

export function FamilySummaryCard({
  parentEmail,
  pendingApprovalCount = 0,
}: FamilySummaryCardProps) {
  return (
    <div className="flex w-full flex-col items-center gap-4">
      <h1 className="text-center text-3xl font-black uppercase leading-tight text-canton-ink">
        Welcome,
        <br />
        Bulldog Family
      </h1>
      <span className="rounded-full bg-canton-pill px-5 py-2 text-sm text-canton-ink">
        {parentEmail}
      </span>
      {pendingApprovalCount > 0 ? (
        <Link
          href="/parent-approval"
          className="flex w-full items-center justify-between rounded-xl bg-canton-card px-4 py-3 text-sm font-bold text-white"
        >
          <span className="flex items-center gap-3">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-canton-teal text-xs font-bold text-canton-card">
              {pendingApprovalCount}
            </span>
            Shot logs need your approval
          </span>
          <span aria-hidden>&rarr;</span>
        </Link>
      ) : null}
    </div>
  );
}
