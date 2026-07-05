import { Minus, Plus } from "lucide-react";
import { ScoreIncrementButton } from "@/components/features/shots/ScoreIncrementButton";

type ScoreIncrementGridProps = {
  value: number;
  onChange: (value: number) => void;
};

export function ScoreIncrementGrid({ value, onChange }: ScoreIncrementGridProps) {
  return (
    <div className="flex w-full items-center justify-between">
      <ScoreIncrementButton
        aria-label="Remove one shot"
        disabled={value <= 0}
        onClick={() => onChange(Math.max(0, value - 1))}
      >
        <Minus className="h-11 w-11 stroke-[4]" aria-hidden />
      </ScoreIncrementButton>
      <ScoreIncrementButton
        aria-label="Add one shot"
        onClick={() => onChange(value + 1)}
      >
        <Plus className="h-11 w-11 stroke-[4]" aria-hidden />
      </ScoreIncrementButton>
    </div>
  );
}
