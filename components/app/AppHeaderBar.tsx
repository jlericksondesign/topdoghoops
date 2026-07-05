"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type AppHeaderBarProps = {
  dashboardHref?: string;
};

export function AppHeaderBar({ dashboardHref = "/" }: AppHeaderBarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="relative z-50 flex h-[52px] shrink-0 items-center justify-between gap-3 bg-canton-green px-4">
      <Link
        href={dashboardHref}
        aria-label="Go to dashboard"
        className="flex items-center gap-3"
        onClick={() => setIsMenuOpen(false)}
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

      <button
        type="button"
        aria-label={isMenuOpen ? "Close navigation" : "Open navigation"}
        aria-expanded={isMenuOpen}
        onClick={() => setIsMenuOpen((currentValue) => !currentValue)}
        className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white/40 text-white"
      >
        <span className="grid gap-1">
          <span className="block h-0.5 w-5 bg-current" />
          <span className="block h-0.5 w-5 bg-current" />
          <span className="block h-0.5 w-5 bg-current" />
        </span>
      </button>

      {isMenuOpen ? (
        <nav className="absolute left-0 right-0 top-[52px] border-b-2 border-canton-ink bg-white px-5 py-5 shadow-[0_12px_24px_rgba(0,0,0,0.18)]">
          <div className="grid gap-5">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-canton-green">
                Parent
              </p>
              <div className="mt-3 grid gap-3 text-sm font-black uppercase tracking-wide text-canton-ink">
                <Link href="/family" onClick={() => setIsMenuOpen(false)}>
                  Dashboard
                </Link>
                <Link
                  href="/parent-approval"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Shot Approvals
                </Link>
                <Link
                  href="/leaderboards?from=parent"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Leaderboard
                </Link>
                <a href="mailto:hello@topdoghoops.com">Contact</a>
              </div>
            </div>

            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-canton-green">
                Player
              </p>
              <div className="mt-3 grid gap-3 text-sm font-black uppercase tracking-wide text-canton-ink">
                <Link href="/player" onClick={() => setIsMenuOpen(false)}>
                  Dashboard
                </Link>
                <Link href="/player-entry" onClick={() => setIsMenuOpen(false)}>
                  Shot Log
                </Link>
                <Link
                  href="/leaderboards?from=player"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Leaderboard
                </Link>
                <Link href="/rules" onClick={() => setIsMenuOpen(false)}>
                  Rules
                </Link>
              </div>
            </div>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
