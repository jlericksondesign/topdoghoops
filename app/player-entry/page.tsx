"use client";

import { useState } from "react";
import Link from "next/link";
import { AppHeaderBar } from "@/components/app/AppHeaderBar";
import { ArcadeScoreDisplay } from "@/components/features/shots/ArcadeScoreDisplay";
import { BasketballGraphic } from "@/components/features/shots/BasketballGraphic";
import { ScoreIncrementGrid } from "@/components/features/shots/ScoreIncrementGrid";
import { FriendBonusToggle } from "@/components/features/shots/FriendBonusToggle";
import { SubmitScoreButton } from "@/components/features/shots/SubmitScoreButton";
import { MascotRevealBadge } from "@/components/features/rewards/MascotRevealBadge";

const MOCK_PLAYER_NAME = "Marcus Johnson";
const MOCK_PLAYER_FIRST_NAME = "Marcus";

type Phase = "entry" | "celebrating" | "revealed";

export default function PlayerEntryPage() {
  const [score, setScore] = useState(0);
  const [shotWithFriend, setShotWithFriend] = useState(false);
  const [friendName, setFriendName] = useState("");
  const [phase, setPhase] = useState<Phase>("entry");

  const isEntry = phase === "entry";
  const isRevealed = phase === "revealed";

  return (
    <main className="flex min-h-dvh flex-col bg-canton-white-grid">
      <AppHeaderBar dashboardHref="/player" />

      <div className="flex flex-col items-center gap-6 px-10 pb-6 pt-8">
        <div
          className={`w-full transition-opacity duration-500 ${
            isEntry ? "opacity-100" : "opacity-0"
          }`}
        >
          <ArcadeScoreDisplay
            playerName={MOCK_PLAYER_NAME}
            value={score}
            padded={!isEntry}
          />
        </div>

        <div className="flex h-96 w-96 items-center justify-center">
          {!isRevealed ? (
            <BasketballGraphic
              className={
                phase === "celebrating" ? "ball-bounce h-24 w-24" : "h-24 w-24"
              }
              onAnimationEnd={
                phase === "celebrating"
                  ? () => setPhase("revealed")
                  : undefined
              }
            />
          ) : (
            <MascotRevealBadge />
          )}
        </div>

        <div
          className={`w-full transition-opacity duration-500 ${
            isEntry ? "opacity-100" : "opacity-0"
          }`}
        >
          <ScoreIncrementGrid value={score} onChange={setScore} />
        </div>
      </div>

      <div className="relative flex-1 bg-canton-tan">
        <div
          className={`absolute inset-0 flex flex-col items-center gap-6 px-10 pb-8 pt-8 transition-opacity duration-500 ${
            isEntry ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        >
          <FriendBonusToggle
            checked={shotWithFriend}
            onCheckedChange={setShotWithFriend}
            friendName={friendName}
            onFriendNameChange={setFriendName}
          />

          <div className="flex-1" />

          <SubmitScoreButton
            disabled={score <= 0}
            onClick={() => setPhase("celebrating")}
          />
          <Link
            href="/player"
            className="text-sm uppercase tracking-wide text-canton-muted"
          >
            &larr; Back
          </Link>
        </div>

        <div
          className={`absolute inset-0 flex flex-col items-center justify-center gap-6 px-10 transition-opacity duration-500 ${
            isRevealed ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        >
          <h1 className="text-center font-heading text-3xl font-black uppercase leading-tight text-canton-ink">
            Let&apos;s Go,
            <br />
            {MOCK_PLAYER_FIRST_NAME}!
          </h1>
          <Link
            href="/leaderboards?from=player"
            className="w-full rounded-2xl border-2 border-white bg-canton-orange py-4 text-center text-base font-bold uppercase tracking-wide text-white shadow-[0_4px_0_rgba(0,0,0,0.15)]"
          >
            Leaderboard
          </Link>
        </div>
      </div>
    </main>
  );
}
