import { Users } from "lucide-react";
import { PlayerIdentityRow } from "@/components/features/family/PlayerIdentityRow";

type ApprovalCardProps = {
  playerName: string;
  jerseyNumber: number;
  date: string;
  submittedAt: string;
  shotTotal: number;
  friendBonus: boolean;
  onApprove: () => void;
  onEdit: () => void;
};

export function ApprovalCard({
  playerName,
  jerseyNumber,
  date,
  submittedAt,
  shotTotal,
  friendBonus,
  onApprove,
  onEdit,
}: ApprovalCardProps) {
  return (
    <div className="w-full overflow-hidden rounded-2xl bg-canton-card">
      <PlayerIdentityRow playerName={playerName} jerseyNumber={jerseyNumber} />
      <div className="flex flex-col items-center gap-4 px-5 pb-6 pt-5">
        <div className="flex items-center gap-3 text-xs text-canton-pill">
          <span>{date}</span>
          <span aria-hidden>&middot;</span>
          <span>Submitted {submittedAt}</span>
        </div>

        {friendBonus ? (
          <span className="flex items-center gap-1 rounded-full bg-canton-teal px-3 py-1 text-xs font-bold text-canton-card">
            <Users className="h-3 w-3" aria-hidden />
            Shot with a friend (+10)
          </span>
        ) : null}

        <span className="canton-score-font text-6xl font-bold text-white">
          {shotTotal}
        </span>

        <button
          type="button"
          onClick={onApprove}
          className="w-full rounded-2xl border-2 border-white bg-canton-orange py-4 text-center text-base font-bold uppercase tracking-wide text-white shadow-[0_4px_0_rgba(0,0,0,0.15)]"
        >
          Approve +{shotTotal} Shots
        </button>
        <button
          type="button"
          onClick={onEdit}
          className="text-sm uppercase tracking-wide text-canton-pill"
        >
          Edit before approving
        </button>
      </div>
    </div>
  );
}
