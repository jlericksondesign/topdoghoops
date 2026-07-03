import { ShieldCheck } from "lucide-react";

type ChildDeviceSetupCardProps = {
  playerName: string;
  onGenerate: () => void;
};

export function ChildDeviceSetupCard({
  playerName,
  onGenerate,
}: ChildDeviceSetupCardProps) {
  return (
    <div className="flex w-full flex-col items-center gap-6 px-1 pb-2 pt-1">
      <div className="text-center">
        <h2 className="text-2xl font-black uppercase text-canton-ink">
          Child Device Setup
        </h2>
        <p className="mt-1 text-sm font-bold text-canton-muted">
          for {playerName}
        </p>
      </div>

      <div className="w-full rounded-xl border border-canton-callout-border bg-canton-callout px-4 py-4">
        <p className="flex items-center gap-2 text-sm font-bold text-canton-green">
          <ShieldCheck className="h-4 w-4" aria-hidden />
          Child-safe access
        </p>
        <p className="mt-2 text-sm leading-6 text-canton-callout-text">
          {playerName} can log shots from their own device but cannot approve
          submissions, manage players, or access any parent controls.
        </p>
      </div>

      <button
        type="button"
        onClick={onGenerate}
        className="w-full rounded-2xl bg-canton-green py-4 text-center text-base font-bold uppercase tracking-wide text-white"
      >
        Generate Link
      </button>
    </div>
  );
}
