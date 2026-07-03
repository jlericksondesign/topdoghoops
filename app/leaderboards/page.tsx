"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { AppHeaderBar } from "@/components/app/AppHeaderBar";
import { LeaderboardCard } from "@/components/features/leaderboards/LeaderboardCard";

const MOCK_ENTRIES = [
  { playerName: "Marcus Johnson", score: 47 },
  { playerName: "Ava Thompson", score: 42 },
  { playerName: "Jackson Reed", score: 39 },
  { playerName: "Mia Carter", score: 35 },
  { playerName: "Liam Brooks", score: 31 },
  { playerName: "Sophia Diaz", score: 28 },
  { playerName: "Noah Bennett", score: 24 },
  { playerName: "Ella Foster", score: 19 },
  { playerName: "Owen Hayes", score: 15 },
  { playerName: "Grace Nolan", score: 11 },
];

function BackToDashboardLink() {
  const searchParams = useSearchParams();
  const isParent = searchParams.get("from") === "parent";

  return (
    <Link
      href={isParent ? "/family" : "/player"}
      className="text-sm font-bold uppercase tracking-wide text-canton-ink underline underline-offset-4"
    >
      {isParent ? "Back to Parent Dashboard" : "Back to My Dashboard"}
    </Link>
  );
}

function DashboardHeader() {
  const searchParams = useSearchParams();
  const isParent = searchParams.get("from") === "parent";

  return <AppHeaderBar dashboardHref={isParent ? "/family" : "/player"} />;
}

export default function LeaderboardsPage() {
  const [division, setDivision] = useState("Overall");

  return (
    <main className="flex min-h-dvh flex-col bg-canton-cream-grid">
      <Suspense fallback={<AppHeaderBar dashboardHref="/player" />}>
        <DashboardHeader />
      </Suspense>
      <div className="flex flex-1 flex-col items-center gap-6 px-10 pb-10 pt-10">
        <h1 className="text-center text-3xl font-black uppercase text-canton-ink">
          High Score
        </h1>
        <LeaderboardCard
          division={division}
          onDivisionChange={setDivision}
          entries={MOCK_ENTRIES}
        />
        <Suspense fallback={null}>
          <BackToDashboardLink />
        </Suspense>
      </div>
    </main>
  );
}
