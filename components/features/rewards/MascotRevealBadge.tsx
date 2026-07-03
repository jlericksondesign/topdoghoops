import Image from "next/image";

export function MascotRevealBadge() {
  return (
    <Image
      src="/bulldog-mascot.png"
      alt="Canton Bulldogs mascot"
      width={600}
      height={590}
      priority
      className="mascot-pop-in h-96 w-96 object-contain"
    />
  );
}
