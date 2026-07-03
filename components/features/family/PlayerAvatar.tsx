import Image from "next/image";

type PlayerAvatarProps = {
  jerseyNumber: number;
};

export function PlayerAvatar({ jerseyNumber }: PlayerAvatarProps) {
  return (
    <div className="relative h-16 w-16 shrink-0">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-canton-green p-2">
        <Image
          src="/bulldog-mascot.png"
          alt=""
          width={600}
          height={590}
          aria-hidden
          className="h-full w-full object-contain"
        />
      </div>
      <span className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-canton-card bg-canton-cream text-xs font-bold text-canton-ink">
        {jerseyNumber}
      </span>
    </div>
  );
}
