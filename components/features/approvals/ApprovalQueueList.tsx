import { ClipboardCheck } from "lucide-react";
import { EmptyState } from "@/components/app/EmptyState";
import { ApprovalQueueItem } from "@/components/features/approvals/ApprovalQueueItem";

type QueueEntry = {
  submissionId: string;
  playerName: string;
  jerseyNumber: number;
  date: string;
  submittedAt: string;
  shotTotal: number;
  friendBonus: boolean;
};

type ApprovalQueueListProps = {
  entries: QueueEntry[];
};

export function ApprovalQueueList({ entries }: ApprovalQueueListProps) {
  if (entries.length === 0) {
    return (
      <EmptyState
        icon={ClipboardCheck}
        title="All caught up!"
        description="No shot logs are waiting on your approval right now."
      />
    );
  }

  return (
    <div className="flex w-full flex-col gap-3">
      {entries.map((entry) => (
        <ApprovalQueueItem key={entry.submissionId} {...entry} />
      ))}
    </div>
  );
}
