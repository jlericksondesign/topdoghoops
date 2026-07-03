import Link from "next/link";

export function MagicLinkRequestForm() {
  return (
    <div className="flex w-full flex-1 flex-col items-center gap-6">
      <div className="text-center">
        <h1 className="font-heading text-2xl font-black uppercase text-canton-ink">
          Confirm Your Email
        </h1>
        <p className="mt-2 text-sm text-canton-muted">
          We&apos;ll send a one-tap sign-in link
          <br />
          — no password needed.
        </p>
      </div>

      <input
        type="email"
        name="email"
        placeholder="email@email.com"
        className="w-full rounded-lg border-2 border-canton-ink bg-white px-4 py-3 text-sm text-canton-ink placeholder:text-canton-muted focus:outline-none"
      />

      <div className="flex-1" />

      <button
        type="button"
        className="w-full rounded-2xl border-2 border-white bg-canton-green py-4 text-center text-base font-bold uppercase tracking-wide text-white shadow-[0_4px_0_rgba(0,0,0,0.15)]"
      >
        Send Magic Link
      </button>
      <Link
        href="/"
        className="text-sm uppercase tracking-wide text-canton-muted"
      >
        &larr; Back
      </Link>
    </div>
  );
}
