"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

import { LocalQrCode } from "@/components/features/pairing/LocalQrCode";

type PairingQrCodeCardProps = {
  playerName: string;
  inviteLink: string;
  onClose: () => void;
};

export function PairingQrCodeCard({
  playerName,
  inviteLink,
  onClose,
}: PairingQrCodeCardProps) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard?.writeText(inviteLink).catch(() => undefined);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="flex w-full flex-col items-center gap-6 px-1 pb-2 pt-1">
      <div className="text-center">
        <h2 className="font-heading text-2xl font-black uppercase text-canton-ink">
          Child Device Setup
        </h2>
        <p className="mt-1 text-sm font-bold text-canton-muted">
          for {playerName}
        </p>
      </div>

      <p className="text-center text-sm leading-6 text-canton-ink">
        Scan this QR code from your child&apos;s device or send them the personal
        invitation link below. This link stays tied to {playerName}&apos;s
        player profile.
      </p>

      <LocalQrCode
        label={`QR code for ${playerName}'s player link`}
        value={inviteLink}
      />

      <div className="flex w-full items-center justify-between rounded-lg border-2 border-canton-ink bg-white px-4 py-3">
        <span className="truncate text-sm text-canton-ink">{inviteLink}</span>
        <button
          type="button"
          onClick={handleCopy}
          aria-label="Copy invitation link"
          className="shrink-0 pl-3 text-canton-ink"
        >
          {copied ? (
            <Check className="h-4 w-4 text-canton-green" aria-hidden />
          ) : (
            <Copy className="h-4 w-4" aria-hidden />
          )}
        </button>
      </div>

      <button
        type="button"
        onClick={onClose}
        className="text-sm uppercase tracking-wide text-canton-muted"
      >
        Close
      </button>
    </div>
  );
}
