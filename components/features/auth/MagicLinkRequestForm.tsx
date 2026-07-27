"use client";

import Link from "next/link";
import { type FormEvent, useState } from "react";

export function MagicLinkRequestForm() {
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
      // Keep the parent-facing flow neutral; operational errors are logged server-side.
    } finally {
      setIsSent(true);
      setIsSending(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full flex-1 flex-col items-center gap-6"
    >
      <div className="text-center">
        <h1 className="font-heading text-2xl font-black uppercase text-canton-ink">
          {isSent ? "Check Your Email" : "Confirm Your Email"}
        </h1>
        <p className="mt-2 text-sm text-canton-muted">
          {isSent ? (
            <>
              If this parent email is approved,
              <br />
              you&apos;ll receive the right sign-in or invite link at
              <br />
              {email || "your email"}.
            </>
          ) : (
            <>
              We&apos;ll send a one-tap sign-in link
              <br />
              or invite link — no password needed.
            </>
          )}
        </p>
      </div>

      {isSent ? (
        <div className="w-full rounded-2xl border-2 border-canton-ink bg-white px-4 py-5 text-center">
          <p className="text-sm font-bold leading-6 text-canton-ink">
            Open the newest link on this device to return to your family
            dashboard or confirm your player. Older links may be expired.
          </p>
        </div>
      ) : (
        <div className="w-full">
          <input
            required
            type="email"
            name="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="email@email.com"
            className="w-full rounded-lg border-2 border-canton-ink bg-white px-4 py-3 text-sm text-canton-ink placeholder:text-canton-muted focus:outline-none"
          />
        </div>
      )}

      <div className="flex-1" />

      <button
        type={isSent ? "button" : "submit"}
        disabled={isSending}
        onClick={
          isSent
            ? () => {
                setIsSent(false);
              }
            : undefined
        }
        className="w-full rounded-2xl border-2 border-white bg-canton-green py-4 text-center text-base font-bold uppercase tracking-wide text-white shadow-[0_4px_0_rgba(0,0,0,0.15)] disabled:opacity-60"
      >
        {isSending
          ? "Sending..."
          : isSent
            ? "Send Another Link"
            : "Send Magic Link"}
      </button>
      <Link
        href="/family"
        className="text-sm uppercase tracking-wide text-canton-muted"
      >
        &larr; Parent Dashboard
      </Link>
    </form>
  );
}
