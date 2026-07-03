import { Minus, Plus } from "lucide-react";

type NumberStepperProps = {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  step?: number;
};

export function NumberStepper({
  value,
  onChange,
  min = 0,
  step = 1,
}: NumberStepperProps) {
  return (
    <div className="flex items-center justify-center gap-6">
      <button
        type="button"
        aria-label="Decrease total"
        onClick={() => onChange(Math.max(min, value - step))}
        className="flex h-14 w-14 items-center justify-center rounded-xl bg-canton-green text-white"
      >
        <Minus className="h-6 w-6" aria-hidden />
      </button>
      <span className="canton-score-font min-w-[4ch] text-center text-4xl font-bold text-white">
        {value}
      </span>
      <button
        type="button"
        aria-label="Increase total"
        onClick={() => onChange(value + step)}
        className="flex h-14 w-14 items-center justify-center rounded-xl bg-canton-green text-white"
      >
        <Plus className="h-6 w-6" aria-hidden />
      </button>
    </div>
  );
}
