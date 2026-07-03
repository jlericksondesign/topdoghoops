import type { ReactNode } from "react";

type ScoreIncrementButtonProps = {
  onClick: () => void;
  disabled?: boolean;
  "aria-label": string;
  children: ReactNode;
};

export function ScoreIncrementButton({
  onClick,
  disabled = false,
  children,
  ...rest
}: ScoreIncrementButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="flex h-20 w-20 items-center justify-center rounded-xl bg-canton-green text-white disabled:opacity-40"
      {...rest}
    >
      {children}
    </button>
  );
}
