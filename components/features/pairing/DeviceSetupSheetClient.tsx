"use client";

import { useRef, useState, type PointerEvent } from "react";
import { useRouter } from "next/navigation";

import { AppHeaderBar } from "@/components/app/AppHeaderBar";
import { FamilySummaryCard } from "@/components/features/family/FamilySummaryCard";
import { PlayerCard } from "@/components/features/family/PlayerCard";
import { ChildDeviceSetupCard } from "@/components/features/pairing/ChildDeviceSetupCard";
import { PairingQrCodeCard } from "@/components/features/pairing/PairingQrCodeCard";

const DISMISS_DRAG_DISTANCE = 80;

type DeviceSetupSheetClientProps = {
  generatePath: string;
  parentEmail: string;
  pendingApprovalCount: number;
  playerId: string;
  playerName: string;
  jerseyNumber: number;
};

export function DeviceSetupSheetClient({
  generatePath,
  parentEmail,
  pendingApprovalCount,
  playerId,
  playerName,
  jerseyNumber,
}: DeviceSetupSheetClientProps) {
  const router = useRouter();
  const [pairingLink, setPairingLink] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "generating" | "error">(
    "idle",
  );
  const [error, setError] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartY = useRef<number | null>(null);

  function dismissSheet() {
    router.push("/family");
  }

  async function generateLink() {
    setStatus("generating");
    setError(null);

    try {
      const response = await fetch(generatePath, {
        method: "POST",
      });
      const result = (await response.json()) as {
        error?: string;
        pairingLink?: string;
      };

      if (!response.ok || !result.pairingLink) {
        throw new Error(result.error ?? "Player link could not be created.");
      }

      setPairingLink(result.pairingLink);
      setStatus("idle");
    } catch (caughtError) {
      setStatus("error");
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "Player link could not be created.",
      );
    }
  }

  function handlePointerDown(event: PointerEvent<HTMLButtonElement>) {
    dragStartY.current = event.clientY;
    setIsDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function handlePointerMove(event: PointerEvent<HTMLButtonElement>) {
    if (dragStartY.current === null) {
      return;
    }

    setDragOffset(Math.max(0, event.clientY - dragStartY.current));
  }

  function handlePointerEnd() {
    if (dragOffset >= DISMISS_DRAG_DISTANCE) {
      dismissSheet();
      return;
    }

    dragStartY.current = null;
    setIsDragging(false);
    setDragOffset(0);
  }

  return (
    <main className="relative flex min-h-dvh flex-col overflow-hidden bg-canton-cream-grid">
      <AppHeaderBar dashboardHref="/family" />
      <div className="flex flex-1 flex-col items-center gap-8 px-10 pb-10 pt-12">
        <FamilySummaryCard
          parentEmail={parentEmail}
          pendingApprovalCount={pendingApprovalCount}
        />
        <PlayerCard
          playerId={playerId}
          playerName={playerName}
          jerseyNumber={jerseyNumber}
          pendingApprovalCount={pendingApprovalCount}
        />
      </div>

      <div className="absolute inset-0 bg-canton-ink/40" aria-hidden />

      <div
        role="dialog"
        aria-label="Child device setup"
        className="absolute inset-x-0 bottom-0 rounded-t-3xl bg-canton-cream-grid px-6 pb-8 pt-2 shadow-[0_-4px_20px_rgba(0,0,0,0.12)]"
        style={{
          transform: `translateY(${dragOffset}px)`,
          transition: isDragging ? "none" : "transform 180ms ease",
        }}
      >
        <button
          type="button"
          aria-label="Dismiss child device setup"
          onClick={dismissSheet}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerEnd}
          onPointerCancel={handlePointerEnd}
          className="mx-auto mb-2 flex h-8 w-24 touch-none items-center justify-center rounded-full"
        >
          <span className="h-1.5 w-16 rounded-full bg-canton-cream-line" />
        </button>
        {pairingLink ? (
          <PairingQrCodeCard
            playerName={playerName}
            inviteLink={pairingLink}
            onClose={dismissSheet}
          />
        ) : (
          <ChildDeviceSetupCard
            playerName={playerName}
            error={error}
            isGenerating={status === "generating"}
            onGenerate={generateLink}
          />
        )}
      </div>
    </main>
  );
}
