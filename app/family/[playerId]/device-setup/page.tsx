"use client";

import { use, useRef, useState, type PointerEvent } from "react";
import { useRouter } from "next/navigation";
import { AppHeaderBar } from "@/components/app/AppHeaderBar";
import { FamilySummaryCard } from "@/components/features/family/FamilySummaryCard";
import { PlayerCard } from "@/components/features/family/PlayerCard";
import { ChildDeviceSetupCard } from "@/components/features/pairing/ChildDeviceSetupCard";
import { PairingQrCodeCard } from "@/components/features/pairing/PairingQrCodeCard";

const MOCK_PLAYER_NAME = "Marcus Johnson";
const MOCK_JERSEY_NUMBER = 23;
const MOCK_INVITE_LINK = "topdoghoops.com/pair/mj23-1234";
const DISMISS_DRAG_DISTANCE = 80;

export default function DeviceSetupPage({
  params,
}: {
  params: Promise<{ playerId: string }>;
}) {
  const { playerId } = use(params);
  const router = useRouter();
  const [linkGenerated, setLinkGenerated] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartY = useRef<number | null>(null);

  function dismissSheet() {
    router.push("/family");
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
        <FamilySummaryCard parentEmail="parent@example.com" pendingApprovalCount={0} />
        <PlayerCard
          playerId={playerId}
          playerName={MOCK_PLAYER_NAME}
          jerseyNumber={MOCK_JERSEY_NUMBER}
          pendingApprovalCount={0}
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
        {linkGenerated ? (
          <PairingQrCodeCard
            playerName={MOCK_PLAYER_NAME}
            inviteLink={MOCK_INVITE_LINK}
            onBack={() => setLinkGenerated(false)}
          />
        ) : (
          <ChildDeviceSetupCard
            playerName={MOCK_PLAYER_NAME}
            onGenerate={() => setLinkGenerated(true)}
          />
        )}
      </div>
    </main>
  );
}
