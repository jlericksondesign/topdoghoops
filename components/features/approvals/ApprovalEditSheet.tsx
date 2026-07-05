import { NumberStepper } from "@/components/app/NumberStepper";

type ApprovalEditSheetProps = {
  playerName: string;
  originalTotal: number;
  editedTotal: number;
  approveLabel?: string;
  onChange: (value: number) => void;
  onApprove: () => void;
  onCancel: () => void;
};

export function ApprovalEditSheet({
  playerName,
  originalTotal,
  editedTotal,
  approveLabel,
  onChange,
  onApprove,
  onCancel,
}: ApprovalEditSheetProps) {
  return (
    <div className="w-full overflow-hidden rounded-2xl bg-canton-card px-5 py-6">
      <p className="text-center text-sm text-canton-pill">
        Editing {playerName}&apos;s total
      </p>
      <p className="mt-1 text-center text-xs text-canton-pill">
        Originally submitted: {originalTotal}
      </p>

      <div className="mt-6">
        <NumberStepper value={editedTotal} onChange={onChange} min={0} />
      </div>

      <div className="mt-6 flex flex-col gap-3">
        <button
          type="button"
          onClick={onApprove}
          className="w-full rounded-2xl border-2 border-white bg-canton-orange py-4 text-center text-base font-bold uppercase tracking-wide text-white shadow-[0_4px_0_rgba(0,0,0,0.15)]"
        >
          {approveLabel ?? `Approve ${editedTotal} Shots`}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="text-sm uppercase tracking-wide text-canton-pill"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
