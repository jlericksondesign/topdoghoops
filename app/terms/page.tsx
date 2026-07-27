import { AppHeaderBar } from "@/components/app/AppHeaderBar";
import { appContactEmail } from "@/lib/contact";

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
            Last updated July 27, 2026. By using Top Dog Hoops, you agree to
            these terms. If you are a parent or guardian, you agree on behalf of
            yourself and any child/player profile you manage.
          </p>
        </div>

        <section className="grid gap-5 rounded-2xl border-2 border-canton-ink bg-white px-5 py-5 text-sm font-semibold leading-6 text-canton-muted">
          <div>
            <h2 className="text-base font-black uppercase text-canton-ink">
              Acceptance
            </h2>
            <p className="mt-2">
              By using Top Dog Hoops, you agree to these Terms of Use. If you
              are a parent or guardian, you agree on behalf of yourself and any
              child/player profile you manage. If you do not agree, do not use
              the app.
            </p>
          </div>

          <div>
            <h2 className="text-base font-black uppercase text-canton-ink">
              Purpose
            </h2>
            <p className="mt-2">
              Top Dog Hoops is a youth basketball shot challenge app. It is
              intended to let administrators run a challenge, parents manage
              participation, and players submit shot totals through
              parent-approved flows.
            </p>
          </div>

          <div>
            <h2 className="text-base font-black uppercase text-canton-ink">
              Parent Responsibilities
            </h2>
            <ul className="mt-2 grid list-disc gap-1 pl-5">
              <li>Reviewing invitations before accepting.</li>
              <li>Confirming player information is accurate.</li>
              <li>Approving or correcting child-submitted shot logs.</li>
              <li>Supervising a child&apos;s use of any paired device.</li>
              <li>Requesting deletion or correction when needed.</li>
              <li>Making sure participation is appropriate for the child.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-base font-black uppercase text-canton-ink">
              Player Use
            </h2>
            <p className="mt-2">
              Players may use child-safe paired device access to submit shot
              totals. Players should not attempt to access parent or admin
              screens, submit false totals, impersonate another player, or
              share pairing links publicly.
            </p>
          </div>

          <div>
            <h2 className="text-base font-black uppercase text-canton-ink">
              Admin Responsibilities
            </h2>
            <ul className="mt-2 grid list-disc gap-1 pl-5">
              <li>Inviting only eligible families.</li>
              <li>Using admin access only for league operations.</li>
              <li>Protecting admin sign-in links and accounts.</li>
              <li>Keeping exported data secure.</li>
              <li>
                Following the data retention, deletion, privacy, and incident
                response practices approved for the app.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-base font-black uppercase text-canton-ink">
              Acceptable Use
            </h2>
            <ul className="mt-2 grid list-disc gap-1 pl-5">
              <li>Misuse sign-in links, invite links, or child pairing links.</li>
              <li>Attempt to access another family&apos;s data.</li>
              <li>Interfere with the app&apos;s security or operation.</li>
              <li>Submit offensive, harmful, or misleading content.</li>
              <li>
                Use the app for unauthorized commercial, advertising, or data
                collection purposes.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-base font-black uppercase text-canton-ink">
              Challenge Results
            </h2>
            <p className="mt-2">
              Leaderboards and totals are based on approved shot submissions.
              The league/operator may correct errors, remove improper
              submissions, or adjust challenge results when needed to keep the
              challenge fair.
            </p>
          </div>

          <div>
            <h2 className="text-base font-black uppercase text-canton-ink">
              Safety
            </h2>
            <p className="mt-2">
              Top Dog Hoops is not a safety, medical, coaching, or emergency
              service. Parents and guardians are responsible for deciding
              whether basketball activity is safe and appropriate for their
              child.
            </p>
          </div>

          <div>
            <h2 className="text-base font-black uppercase text-canton-ink">
              Privacy
            </h2>
            <p className="mt-2">
              Use of Top Dog Hoops is also governed by the Privacy Policy. The
              Privacy Policy describes data collection, parent rights,
              child/player information, and deletion requests.
            </p>
          </div>

          <div>
            <h2 className="text-base font-black uppercase text-canton-ink">
              Availability
            </h2>
            <p className="mt-2">
              The app may be unavailable or changed from time to time. CYBA may
              modify, pause, or end the challenge or app access.
            </p>
          </div>

          <div>
            <h2 className="text-base font-black uppercase text-canton-ink">
              Changes To These Terms
            </h2>
            <p className="mt-2">
              Top Dog Hoops may update these terms. Material changes should be
              communicated to parents and administrators as appropriate.
            </p>
          </div>

          <div>
            <h2 className="text-base font-black uppercase text-canton-ink">
              Contact
            </h2>
            <p className="mt-2">
              Questions about these terms can be sent to{" "}
              <a
                href={`mailto:${appContactEmail}`}
                className="font-black text-canton-green underline underline-offset-4"
              >
                {appContactEmail}
              </a>
              .
            </p>
          </div>
        </section>

      </div>
    </main>
  );
}
