"use client";

import { useState } from "react";

type InviteMagicLinkButtonProps = {
  inviteId: string;
};

export function InviteMagicLinkButton({ inviteId }: InviteMagicLinkButtonProps) {
  const [inviteLink, setInviteLink] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "ready" | "error">(
    "idle",
  );
  const [message, setMessage] = useState<string | null>(null);

  async function handleSendInvite() {
    setStatus("loading");
    setMessage(null);

    try {
      const response = await fetch(`/admin/api/invites/${inviteId}/magic-link`, {
        method: "POST",
      });
      const result = (await response.json()) as {
        inviteLink?: string;
        error?: string;
      };

      if (!response.ok || !result.inviteLink) {
        throw new Error(result.error ?? "Could not create link.");
      }

      setInviteLink(result.inviteLink);
      setStatus("ready");

      if (navigator.clipboard) {
        try {
          await navigator.clipboard.writeText(result.inviteLink);
          setMessage("Email sent. Link copied.");
        } catch {
          setMessage("Email sent. Link ready.");
        }
      } else {
        setMessage("Email sent. Link ready.");
      }
    } catch (caughtError) {
      setStatus("error");
      setMessage(
        caughtError instanceof Error
          ? caughtError.message
          : "Could not send invite.",
      );
    }
  }

  return (
    <div className="mt-4 flex flex-col gap-2">
      <button
        type="button"
        onClick={handleSendInvite}
        disabled={status === "loading"}
        className="h-11 rounded-xl bg-canton-green px-4 text-sm font-black uppercase tracking-wide text-white disabled:bg-canton-pill disabled:text-canton-muted"
      >
        {status === "loading" ? "Sending Invite" : "Send Invite Email"}
      </button>

      {message ? (
        <p
          className={`text-xs font-black uppercase ${
            status === "error" ? "text-canton-orange" : "text-canton-green"
          }`}
        >
          {message}
        </p>
      ) : null}

      {inviteLink ? (
        <input
          readOnly
          value={inviteLink}
          onFocus={(event) => event.currentTarget.select()}
          className="h-10 rounded-xl border border-canton-cream-line bg-canton-cream px-3 text-xs font-bold text-canton-muted"
        />
      ) : null}
    </div>
  );
}
