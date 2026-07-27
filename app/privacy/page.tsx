import { AppHeaderBar } from "@/components/app/AppHeaderBar";
import { appContactEmail } from "@/lib/contact";

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
            Last updated July 27, 2026. Top Dog Hoops is operated by CYBA to run
            a youth basketball shot challenge for players, parents, and league
            administrators.
          </p>
        </div>

        <section className="grid gap-5 rounded-2xl border-2 border-canton-ink bg-white px-5 py-5 text-sm font-semibold leading-6 text-canton-muted">
          <div>
            <h2 className="text-base font-black uppercase text-canton-ink">
              Contact
            </h2>
            <p className="mt-2">
              Questions, privacy requests, correction requests, consent
              revocation, and deletion requests can be sent to{" "}
              <a
                href={`mailto:${appContactEmail}`}
                className="font-black text-canton-green underline underline-offset-4"
              >
                {appContactEmail}
              </a>
              .
            </p>
          </div>

          <div>
            <h2 className="text-base font-black uppercase text-canton-ink">
              What Top Dog Hoops Does
            </h2>
            <p className="mt-2">
              Top Dog Hoops lets league administrators invite parents, lets
              parents manage their player&apos;s participation, lets children
              submit daily shot totals from a paired device, and lets parents
              approve shot logs before they count toward leaderboards.
            </p>
          </div>

          <div>
            <h2 className="text-base font-black uppercase text-canton-ink">
              Information We Collect
            </h2>
            <ul className="mt-2 grid gap-2">
              <li>
                Parent and administrator information, including name, email
                address, sign-in status, invite status, and support actions.
              </li>
              <li>
                Player information, including first name, last initial, grade,
                division or league grouping, jersey number if displayed, and the
                linked parent/player profile.
              </li>
              <li>
                Paired-device information, including a revocable pairing token,
                the linked player profile, daily shot submissions, basket
                counts, selected bonuses, and basic technical data needed for
                security and app operation.
              </li>
              <li>
                Challenge information, including approved shot totals,
                participation totals, and leaderboard rank based on approved
                submissions.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-base font-black uppercase text-canton-ink">
              Information We Do Not Collect
            </h2>
            <p className="mt-2">
              Top Dog Hoops is designed to avoid collecting child email
              addresses, child phone numbers, street addresses, precise
              location, photos, videos, audio, chat messages, or direct child
              accounts.
            </p>
          </div>

          <div>
            <h2 className="text-base font-black uppercase text-canton-ink">
              How We Use Information
            </h2>
            <p className="mt-2">
              We use information to invite parents, manage player profiles, let
              children submit shot counts without creating child accounts, let
              parents review and approve shot logs, calculate approved challenge
              totals and leaderboards, send operational emails, help
              administrators run the challenge, and protect the app from
              unauthorized access or misuse.
            </p>
          </div>

          <div>
            <h2 className="text-base font-black uppercase text-canton-ink">
              How We Share Information
            </h2>
            <p className="mt-2">
              Top Dog Hoops does not sell player or parent information.
              Information may be shared with service providers needed to operate
              the app, such as hosting, database, authentication, and email
              delivery providers. Approved leaderboard totals may be visible to
              other app users in limited form, such as first name and last
              initial. Pending shot submissions are intended to be visible only
              to the linked parent or guardian and authorized administrators.
            </p>
          </div>

          <div>
            <h2 className="text-base font-black uppercase text-canton-ink">
              Parent Rights
            </h2>
            <p className="mt-2">
              Parents may request to review information associated with their
              child&apos;s/player&apos;s profile, correct inaccurate player
              information, revoke consent for continued participation, or delete
              their child&apos;s/player&apos;s personal information. Requests should be
              sent to{" "}
              <a
                href={`mailto:${appContactEmail}`}
                className="font-black text-canton-green underline underline-offset-4"
              >
                {appContactEmail}
              </a>
              . Before disclosing, changing, or deleting child/player
              information, Top Dog Hoops will take reasonable steps to verify
              that the requester is the linked parent or guardian.
            </p>
            <p className="mt-2">
              If a parent revokes consent or requests deletion, the child/player
              may no longer be able to participate if the deleted information is
              necessary to operate the challenge.
            </p>
          </div>

          <div>
            <h2 className="text-base font-black uppercase text-canton-ink">
              Children&apos;s Privacy
            </h2>
            <p className="mt-2">
              Top Dog Hoops is designed as a parent-mediated app for youth
              sports. Administrators invite parents, parents accept invitations
              and manage player profiles, children use paired-device access
              rather than child accounts, and child submissions stay limited to
              challenge activity that requires parent approval before appearing
              in public totals.
            </p>
          </div>

          <div>
            <h2 className="text-base font-black uppercase text-canton-ink">
              Security
            </h2>
            <p className="mt-2">
              Top Dog Hoops uses security measures such as passwordless parent
              access, admin-only access controls, revocable child device tokens,
              hashed invite and access tokens, database access controls, and
              limited access to production systems.
            </p>
          </div>

          <div>
            <h2 className="text-base font-black uppercase text-canton-ink">
              Data Retention
            </h2>
            <p className="mt-2">
              Top Dog Hoops keeps personal information only as long as needed
              for the challenge, parent support, legal or compliance
              obligations, and security.
            </p>
          </div>

          <div>
            <h2 className="text-base font-black uppercase text-canton-ink">
              Changes To This Policy
            </h2>
            <p className="mt-2">
              If privacy practices materially change, Top Dog Hoops will update
              this policy and notify parents when required.
            </p>
          </div>
        </section>

      </div>
    </main>
  );
}
