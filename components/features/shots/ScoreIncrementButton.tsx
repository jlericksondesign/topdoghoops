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
      className="flex h-[88px] w-[88px] items-center justify-center rounded-none border-2 border-canton-ink bg-canton-green text-white"
      {...rest}
    >
      {children}
    </button>
  );
}
