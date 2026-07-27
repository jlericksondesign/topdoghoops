"use client";

import { type FormEvent, useState } from "react";

import { Button } from "@/components/ui/button";

export function PlayerSignInRequestForm() {
  const [email, setEmail] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSending(true);

    try {
      await fetch("/parent/link-request/request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
    } catch {
      // Keep this neutral for privacy; the server logs delivery/config errors.
    } finally {
      setIsSent(true);
      setIsSending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-5 grid gap-3 text-left">
      <label className="grid gap-2">
        <span className="text-xs font-black uppercase tracking-widest text-canton-muted">
          Parent Email
        </span>
        <input
          required
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="parent@email.com"
          className="h-12 rounded-xl border-2 border-canton-cream-line bg-canton-cream px-3 text-sm font-bold text-canton-ink outline-none focus:border-canton-green"
        />
      </label>

      {isSent ? (
        <p className="rounded-xl bg-canton-pill px-4 py-3 text-center text-xs font-black uppercase leading-5 text-canton-ink">
          If this email is linked to a player, your parent will receive a sign-in
          link.
        </p>
      ) : null}

      <Button
        type="submit"
        disabled={isSending}
        variant="cantonGreen"
        size="cantonCta"
      >
        {isSending ? "Sending" : "Send Parent Sign-In Link"}
      </Button>
    </form>
  );
}
