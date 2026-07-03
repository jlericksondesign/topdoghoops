import Image from "next/image";

type BasketballGraphicProps = {
  className?: string;
  onAnimationEnd?: () => void;
};

export function BasketballGraphic({
  className,
  onAnimationEnd,
}: BasketballGraphicProps) {
  return (
    <Image
      src="/basketball.png"
      alt=""
      width={116}
      height={119}
      aria-hidden
      onAnimationEnd={onAnimationEnd}
      className={className ?? "h-24 w-24"}
    />
  );
}
