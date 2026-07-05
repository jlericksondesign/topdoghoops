import Link from "next/link";

import { AppHeaderBar } from "@/components/app/AppHeaderBar";

export default function KidSignInPage() {
  return (
    <main className="flex min-h-dvh flex-col bg-canton-cream-grid">
      <AppHeaderBar />
      <div className="flex flex-1 flex-col justify-center px-8 pb-10 pt-12">
        <div className="rounded-2xl border-2 border-canton-ink bg-white px-5 py-6 text-center">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-canton-green">
            Player Access
          </p>
          <h1 className="mt-2 text-3xl font-black uppercase leading-tight text-canton-ink">
            Kid Sign In
          </h1>
          <p className="mt-3 text-sm font-semibold leading-6 text-canton-muted">
            Ask your parent to open the family dashboard and tap Set Up Player
            Device. That creates your private player link for this device.
          </p>
          <div className="mt-5 grid gap-3">
            <Link
              href="/family"
              className="rounded-2xl bg-canton-green px-4 py-3 text-sm font-black uppercase tracking-wide text-white"
            >
              Parent Set Up Device
            </Link>
            <Link
              href="/"
              className="rounded-2xl bg-canton-pill px-4 py-3 text-sm font-black uppercase tracking-wide text-canton-ink"
            >
              Back Home
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
