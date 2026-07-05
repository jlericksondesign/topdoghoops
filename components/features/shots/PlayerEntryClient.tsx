"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { AppHeaderBar } from "@/components/app/AppHeaderBar";
import { FirstVisitDisclosure } from "@/components/app/FirstVisitDisclosure";
import { MascotRevealBadge } from "@/components/features/rewards/MascotRevealBadge";
import { ArcadeScoreDisplay } from "@/components/features/shots/ArcadeScoreDisplay";
import { BasketballGraphic } from "@/components/features/shots/BasketballGraphic";
import { FriendBonusToggle } from "@/components/features/shots/FriendBonusToggle";
import { ScoreIncrementGrid } from "@/components/features/shots/ScoreIncrementGrid";
import { SubmitScoreButton } from "@/components/features/shots/SubmitScoreButton";

type PlayerEntryClientProps = {
  playerFirstName: string;
  playerName: string;
  previousShotTotal: number;
};

type Phase = "entry" | "celebrating" | "revealed";
type SubmitStatus = "idle" | "saving" | "error";

function AnimatedShotTotal({
  from,
  to,
}: {
  from: number;
  to: number;
}) {
  const [displayValue, setDisplayValue] = useState(from);

  useEffect(() => {
    if (to <= from) {
      setDisplayValue(to);
      return;
    }

    const difference = to - from;
    const steps = Math.min(24, Math.max(8, difference));
    const increment = difference / steps;
    let currentStep = 0;

    const timer = window.setInterval(() => {
      currentStep += 1;
      setDisplayValue(
        currentStep >= steps ? to : Math.round(from + increment * currentStep),
      );

      if (currentStep >= steps) {
        window.clearInterval(timer);
      }
    }, 45);

    return () => window.clearInterval(timer);
  }, [from, to]);

  return (
    <div className="text-center">
      <p className="canton-score-font text-[58px] font-bold leading-none text-canton-green">
        {String(displayValue).padStart(3, "0")}
      </p>
      <p className="mt-1 text-xs font-black uppercase tracking-[0.22em] text-canton-muted">
        Total Shots
      </p>
    </div>
  );
}

export function PlayerEntryClient({
  playerFirstName,
  playerName,
  previousShotTotal,
}: PlayerEntryClientProps) {
  const [score, setScore] = useState(0);
  const [shotWithFriend, setShotWithFriend] = useState(false);
  const [friendName, setFriendName] = useState("");
  const [phase, setPhase] = useState<Phase>("entry");
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");
  const [submitError, setSubmitError] = useState<string | null>(null);

  const isEntry = phase === "entry";
  const isRevealed = phase === "revealed";
  const submittedTotal = score + (shotWithFriend ? 10 : 0);
  const newShotTotal = previousShotTotal + submittedTotal;

  async function handleSubmit() {
    setSubmitStatus("saving");
    setSubmitError(null);

    try {
      const response = await fetch("/player-entry/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          baseBaskets: score,
          shotWithFriend,
        }),
      });
      const result = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(result.error ?? "Shot log could not be submitted.");
      }

      setSubmitStatus("idle");
      setPhase("celebrating");
    } catch (caughtError) {
      setSubmitStatus("error");
      setSubmitError(
        caughtError instanceof Error
          ? caughtError.message
          : "Shot log could not be submitted.",
      );
    }
  }

  return (
    <main className="flex min-h-dvh flex-col bg-canton-white-grid">
      <AppHeaderBar dashboardHref="/player" />
      <FirstVisitDisclosure
        storageKey="topdog-player-entry-rules"
        title="Shot Log Rules"
      >
        Log honest made shots only. Use the friend bonus only when you practiced
        with someone. A parent must approve shots before they count publicly.
      </FirstVisitDisclosure>

      <div
        className={`relative flex flex-col items-center px-11 ${
          isRevealed
            ? "min-h-[520px] justify-end pb-12 pt-14"
            : "min-h-[440px] pt-12"
        }`}
      >
        {!isRevealed ? (
          <>
            <div className="relative z-10 w-full max-w-[284px]">
              <ArcadeScoreDisplay playerName={playerName} value={score} padded />
            </div>

            <div className="relative z-20 -mt-8 flex h-[116px] w-[116px] items-center justify-center">
              <BasketballGraphic
                className={
                  phase === "celebrating"
                    ? "ball-bounce h-[116px] w-[116px]"
                    : "h-[116px] w-[116px]"
                }
                onAnimationEnd={
                  phase === "celebrating"
                    ? () => setPhase("revealed")
                    : undefined
                }
              />
            </div>

            <div className="mt-4 w-full max-w-[314px]">
              <ScoreIncrementGrid value={score} onChange={setScore} />
            </div>
          </>
        ) : (
          <MascotRevealBadge className="h-[260px] w-[260px]" />
        )}
      </div>

      <div className="relative flex-1 bg-canton-tan">
        <div
          className={`absolute inset-0 flex flex-col items-center gap-6 px-11 pb-8 pt-[172px] transition-opacity duration-500 ${
            isEntry ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        >
          <FriendBonusToggle
            checked={shotWithFriend}
            onCheckedChange={setShotWithFriend}
            friendName={friendName}
            onFriendNameChange={setFriendName}
          />

          <SubmitScoreButton
            disabled={score <= 0 || submitStatus === "saving"}
            label={submitStatus === "saving" ? "Submitting" : "Submit"}
            onClick={handleSubmit}
          />
          {submitError ? (
            <p className="text-center text-xs font-black uppercase text-canton-orange">
              {submitError}
            </p>
          ) : null}
          <Link
            href="/player"
            className="text-sm uppercase tracking-wide text-canton-ink"
          >
            &larr; Back
          </Link>
        </div>

        <div
          className={`absolute inset-0 flex flex-col items-center gap-7 px-10 pb-8 pt-10 transition-opacity duration-500 ${
            isRevealed ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        >
          <AnimatedShotTotal from={previousShotTotal} to={newShotTotal} />
          <h1 className="text-center font-heading text-3xl font-black uppercase leading-tight text-canton-ink">
            Let&apos;s Go,
            <br />
            {playerFirstName}!
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
