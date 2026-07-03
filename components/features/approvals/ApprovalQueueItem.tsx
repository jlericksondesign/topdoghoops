import Link from "next/link";
import { ChevronRight, Users } from "lucide-react";
import { PlayerAvatar } from "@/components/features/family/PlayerAvatar";

type ApprovalQueueItemProps = {
  submissionId: string;
  playerName: string;
  jerseyNumber: number;
  date: string;
  submittedAt: string;
  shotTotal: number;
  friendBonus: boolean;
};

export function ApprovalQueueItem({
  submissionId,
  playerName,
  jerseyNumber,
  date,
  submittedAt,
  shotTotal,
  friendBonus,
}: ApprovalQueueItemProps) {
  return (
    <Link
      href={`/parent-approval/${submissionId}`}
      className="flex items-center gap-4 rounded-2xl bg-canton-card px-4 py-4"
    >
      <PlayerAvatar jerseyNumber={jerseyNumber} />
      <div className="flex-1">
        <p className="font-bold text-white">{playerName}</p>
        <p className="text-xs text-canton-pill">
          {date} &middot; {submittedAt}
        </p>
        {friendBonus ? (
          <p className="mt-1 flex items-center gap-1 text-xs font-bold text-canton-teal">
            <Users className="h-3 w-3" aria-hidden />
            Shot with a friend
          </p>
        ) : null}
      </div>
      <span className="canton-score-font text-2xl font-bold text-white">
        {shotTotal}
      </span>
      <ChevronRight className="h-5 w-5 text-canton-pill" aria-hidden />
    </Link>
  );
}
