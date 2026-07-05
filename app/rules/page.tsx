import Link from "next/link";

import { AppHeaderBar } from "@/components/app/AppHeaderBar";

export default function RulesPage() {
  return (
    <main className="flex min-h-dvh flex-col bg-canton-cream-grid">
      <AppHeaderBar />
      <div className="flex flex-1 flex-col gap-6 px-8 pb-10 pt-10">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-canton-green">
            Top Dog Hoops
          </p>
          <h1 className="mt-2 text-3xl font-black uppercase leading-tight text-canton-ink">
            Challenge Rules
          </h1>
        </div>

        <section className="rounded-2xl border-2 border-canton-ink bg-white px-5 py-5">
          <ul className="grid gap-4 text-sm font-semibold leading-6 text-canton-muted">
            <li>Log honest made shots only.</li>
            <li>Use the friend bonus only when you practiced with someone.</li>
            <li>Parent approval is required before shots count publicly.</li>
            <li>Practice safely with a clear space and age-appropriate hoop.</li>
          </ul>
        </section>

        <Link
          href="/"
          className="text-center text-sm font-bold uppercase tracking-wide text-canton-ink underline underline-offset-4"
        >
          Back Home
        </Link>
      </div>
    </main>
  );
}
