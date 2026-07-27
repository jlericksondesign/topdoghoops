import { Button } from "@/components/ui/button";

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
    <Button
      type="button"
      onClick={onClick}
      disabled={disabled}
      variant="cantonInk"
      size="cantonCta"
    >
      {label}
    </Button>
  );
}
