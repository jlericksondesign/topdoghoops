import Link from "next/link";

import { AppHeaderBar } from "@/components/app/AppHeaderBar";

export default function TermsPage() {
  return (
    <main className="flex min-h-dvh flex-col bg-canton-cream-grid">
      <AppHeaderBar dashboardHref="/" />
      <div className="flex flex-1 flex-col gap-6 px-8 pb-10 pt-10">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-canton-green">
            Top Dog Hoops
          </p>
          <h1 className="mt-2 font-heading text-3xl font-black uppercase leading-tight text-canton-ink">
            Terms of Use
          </h1>
          <p className="mt-3 text-sm font-bold leading-6 text-canton-muted">
            Draft for family review. Final terms should be reviewed by the
            league/operator and attorney before launch.
          </p>
        </div>

        <section className="grid gap-5 text-sm font-semibold leading-6 text-canton-muted">
          <div>
            <h2 className="text-base font-black uppercase text-canton-ink">
              Purpose
            </h2>
            <p className="mt-2">
              Top Dog Hoops is a youth basketball shot challenge app for
              league administrators, parents, and players.
            </p>
          </div>

          <div>
            <h2 className="text-base font-black uppercase text-canton-ink">
              Parent Responsibilities
            </h2>
            <p className="mt-2">
              Parents are responsible for reviewing invitations, confirming
              player information, supervising paired-device use, and approving
              or correcting child-submitted shot logs.
            </p>
          </div>

          <div>
            <h2 className="text-base font-black uppercase text-canton-ink">
              Player Use
            </h2>
            <p className="mt-2">
              Players may use child-safe paired device access to submit shot
              totals. Players should not share pairing links, impersonate
              another player, or try to access parent/admin screens.
            </p>
          </div>

          <div>
            <h2 className="text-base font-black uppercase text-canton-ink">
              Challenge Results
            </h2>
            <p className="mt-2">
              Leaderboards and totals are based on approved shot submissions.
              The league/operator may correct errors or remove improper
              submissions to keep the challenge fair.
            </p>
          </div>

          <div>
            <h2 className="text-base font-black uppercase text-canton-ink">
              Safety
            </h2>
            <p className="mt-2">
              Top Dog Hoops is not a medical, coaching, emergency, or safety
              service. Parents and guardians decide whether basketball activity
              is appropriate for their child.
            </p>
          </div>
        </section>

        <Link
          href="/privacy"
          className="rounded-2xl bg-canton-green px-4 py-3 text-center text-sm font-black uppercase tracking-wide text-white"
        >
          Read Privacy Policy
        </Link>
      </div>
    </main>
  );
}
