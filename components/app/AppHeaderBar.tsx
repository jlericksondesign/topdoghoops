import Image from "next/image";
import Link from "next/link";

type AppHeaderBarProps = {
  dashboardHref?: string;
};

export function AppHeaderBar({ dashboardHref = "/" }: AppHeaderBarProps) {
  return (
    <header className="flex h-[52px] shrink-0 items-center gap-3 bg-canton-green px-4">
      <Link
        href={dashboardHref}
        aria-label="Go to dashboard"
        className="flex items-center gap-3"
      >
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white p-0.5">
          <Image
            src="/bulldog-mascot.png"
            alt=""
            width={600}
            height={590}
            aria-hidden
            className="h-full w-full object-contain"
          />
        </div>
        <span className="canton-wordmark-sm text-lg uppercase tracking-wide text-white">
          Top Dog Hoops
        </span>
      </Link>
    </header>
  );
}
