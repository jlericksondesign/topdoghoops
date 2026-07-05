import Image from "next/image";

type MascotRevealBadgeProps = {
  className?: string;
};

export function MascotRevealBadge({ className }: MascotRevealBadgeProps) {
  return (
    <Image
      src="/bulldog-mascot.png"
      alt="Canton Bulldogs mascot"
      width={600}
      height={590}
      priority
      className={`mascot-pop-in object-contain ${className ?? "h-56 w-56"}`}
    />
  );
}
