import Link from "next/link";

import { AppHeaderBar } from "@/components/app/AppHeaderBar";

export default function PrivacyPage() {
  return (
    <main className="flex min-h-dvh flex-col bg-canton-cream-grid">
      <AppHeaderBar dashboardHref="/" />
      <div className="flex flex-1 flex-col gap-6 px-8 pb-10 pt-10">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-canton-green">
            Top Dog Hoops
          </p>
          <h1 className="mt-2 font-heading text-3xl font-black uppercase leading-tight text-canton-ink">
            Privacy Policy
          </h1>
          <p className="mt-3 text-sm font-bold leading-6 text-canton-muted">
            Draft for family review. Final policy should be reviewed by the
            league/operator and attorney before launch.
          </p>
        </div>

        <section className="grid gap-5 text-sm font-semibold leading-6 text-canton-muted">
          <div>
            <h2 className="text-base font-black uppercase text-canton-ink">
              What We Collect
            </h2>
            <p className="mt-2">
              Top Dog Hoops collects limited parent/admin contact information,
              invite status, player first name, last initial, grade, division,
              paired-device tokens, and shot log activity needed to run the
              basketball challenge.
            </p>
          </div>

          <div>
            <h2 className="text-base font-black uppercase text-canton-ink">
              What We Avoid
            </h2>
            <p className="mt-2">
              The MVP should not collect child email addresses, phone numbers,
              street addresses, precise location, photos, videos, audio, chat
              messages, or direct child accounts.
            </p>
          </div>

          <div>
            <h2 className="text-base font-black uppercase text-canton-ink">
              How It Is Used
            </h2>
            <p className="mt-2">
              Information is used to invite parents, manage player profiles,
              let children submit shot totals from paired devices, let parents
              approve shot logs, and calculate approved leaderboard totals.
            </p>
          </div>

          <div>
            <h2 className="text-base font-black uppercase text-canton-ink">
              Parent Rights
            </h2>
            <p className="mt-2">
              Parents may request review, correction, consent revocation, or
              deletion of their child&apos;s/player&apos;s information. Before making
              changes, Top Dog Hoops should verify that the requester is the
              linked parent or guardian.
            </p>
          </div>

          <div>
            <h2 className="text-base font-black uppercase text-canton-ink">
              Contact
            </h2>
            <p className="mt-2">
              Privacy requests should go to the league/operator privacy contact.
              Until that address is finalized, use the contact page as the
              placeholder destination.
            </p>
          </div>
        </section>

        <Link
          href="/contact"
          className="rounded-2xl bg-canton-green px-4 py-3 text-center text-sm font-black uppercase tracking-wide text-white"
        >
          Contact Top Dog Hoops
        </Link>
      </div>
    </main>
  );
}
