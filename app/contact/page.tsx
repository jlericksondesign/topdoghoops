import Link from "next/link";

import { AppHeaderBar } from "@/components/app/AppHeaderBar";

const contactEmail = "hello@topdoghoops.com";

export default function ContactPage() {
  return (
    <main className="flex min-h-dvh flex-col bg-canton-cream-grid">
      <AppHeaderBar dashboardHref="/" />
      <div className="flex flex-1 flex-col gap-6 px-8 pb-10 pt-10">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-canton-green">
            Top Dog Hoops
          </p>
          <h1 className="mt-2 font-heading text-3xl font-black uppercase leading-tight text-canton-ink">
            Contact
          </h1>
          <p className="mt-3 text-sm font-bold leading-6 text-canton-muted">
            Questions, invite help, privacy requests, and deletion requests can
            start here.
          </p>
        </div>

        <section className="grid gap-4 rounded-2xl border-2 border-canton-ink bg-white px-5 py-5 text-sm font-semibold leading-6 text-canton-muted">
          <div>
            <h2 className="text-base font-black uppercase text-canton-ink">
              Email
            </h2>
            <a
              href={`mailto:${contactEmail}`}
              className="mt-2 block font-black text-canton-green underline underline-offset-4"
            >
              {contactEmail}
            </a>
          </div>
          <p>
            Include your name, parent email, player first name and last initial,
            and what you need help with. Do not send sensitive documents unless
            the league/operator asks for them.
          </p>
        </section>

        <div className="grid gap-3">
          <Link
            href="/privacy"
            className="rounded-2xl bg-canton-green px-4 py-3 text-center text-sm font-black uppercase tracking-wide text-white"
          >
            Privacy Policy
          </Link>
          <Link
            href="/"
            className="rounded-2xl bg-canton-pill px-4 py-3 text-center text-sm font-black uppercase tracking-wide text-canton-ink"
          >
            Back Home
          </Link>
        </div>
      </div>
    </main>
  );
}
