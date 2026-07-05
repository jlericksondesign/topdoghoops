"use client";

import { useMemo, useState } from "react";

import { LeaderboardCard } from "@/components/features/leaderboards/LeaderboardCard";

export type LeaderboardEntry = {
  division: string;
  playerName: string;
  score: number;
};

function formatDivisionKey(value: string) {
  return value.toLowerCase().replaceAll(" ", "_");
}

export function LeaderboardsClient({
  entries,
}: {
  entries: LeaderboardEntry[];
}) {
  const [division, setDivision] = useState("Overall");
  const visibleEntries = useMemo(() => {
    if (division === "Overall") {
      return [...entries].sort((a, b) => b.score - a.score);
    }

    const divisionKey = formatDivisionKey(division);

    return entries
      .filter((entry) => entry.division === divisionKey)
      .sort((a, b) => b.score - a.score);
  }, [division, entries]);

  return (
    <LeaderboardCard
      division={division}
      onDivisionChange={setDivision}
      entries={visibleEntries}
    />
  );
}
