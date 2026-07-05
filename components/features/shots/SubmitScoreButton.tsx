type SubmitScoreButtonProps = {
  onClick: () => void;
  disabled?: boolean;
  label?: string;
};

export function SubmitScoreButton({
  onClick,
  disabled,
  label = "Submit",
}: SubmitScoreButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="w-full rounded border-2 border-white bg-canton-ink py-4 text-center text-base font-bold uppercase tracking-wide text-white disabled:opacity-40"
    >
      {label}
    </button>
  );
}
