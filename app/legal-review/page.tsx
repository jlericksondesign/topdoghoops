import type { Metadata } from "next";
import { cookies } from "next/headers";

import { AppHeaderBar } from "@/components/app/AppHeaderBar";
import {
  isLegalReviewAccessValid,
  LEGAL_REVIEW_ACCESS_COOKIE,
} from "@/lib/legal-review-auth";

export const metadata: Metadata = {
  title: "Legal Review Intake | Top Dog Hoops",
  robots: {
    index: false,
    follow: false,
  },
};

type LegalReviewPageProps = {
  searchParams: Promise<{
    error?: string;
    submitted?: string;
  }>;
};

function TextInput({
  label,
  name,
  required = false,
  type = "text",
}: {
  label: string;
  name: string;
  required?: boolean;
  type?: "email" | "text";
}) {
  return (
    <label className="grid gap-2">
      <span className="text-xs font-black uppercase tracking-widest text-canton-muted">
        {label}
      </span>
      <input
        required={required}
        type={type}
        name={name}
        className="h-12 rounded-xl border-2 border-canton-cream-line bg-canton-cream px-3 text-sm font-bold text-canton-ink outline-none focus:border-canton-green"
      />
    </label>
  );
}

function TextArea({
  label,
  name,
  rows = 4,
}: {
  label: string;
  name: string;
  rows?: number;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-xs font-black uppercase tracking-widest text-canton-muted">
        {label}
      </span>
      <textarea
        name={name}
        rows={rows}
        className="rounded-xl border-2 border-canton-cream-line bg-canton-cream px-3 py-3 text-sm font-bold text-canton-ink outline-none focus:border-canton-green"
      />
    </label>
  );
}

export default async function LegalReviewPage({
  searchParams,
}: LegalReviewPageProps) {
  const { error, submitted } = await searchParams;
  const cookieStore = await cookies();
  const hasAccess = isLegalReviewAccessValid(
    cookieStore.get(LEGAL_REVIEW_ACCESS_COOKIE)?.value,
  );

  return (
    <main className="flex min-h-dvh flex-col bg-canton-cream-grid">
      <AppHeaderBar dashboardHref="/" />
      <div className="flex flex-1 flex-col gap-6 px-6 pb-10 pt-8">
        <section>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-canton-green">
            Temporary Pre-Launch Review
          </p>
          <h1 className="mt-2 font-heading text-3xl font-black uppercase leading-tight text-canton-ink">
            Legal Review Intake
          </h1>
          <p className="mt-3 text-sm font-bold leading-6 text-canton-muted">
            Complete the missing launch details below. This private page is not
            linked from the app and should be removed after launch review is
            complete.
          </p>
        </section>

        {!hasAccess ? (
          <form
            action="/legal-review/access"
            method="post"
            className="grid gap-5 rounded-2xl border-2 border-canton-ink bg-white px-5 py-6"
          >
            <div>
              <h2 className="font-heading text-xl font-black uppercase text-canton-ink">
                Enter Review Code
              </h2>
              <p className="mt-2 text-sm font-semibold leading-6 text-canton-muted">
                This temporary page is for pre-launch reviewers only.
              </p>
            </div>

            {error ? (
              <p className="rounded-xl bg-canton-orange px-4 py-3 text-sm font-black uppercase leading-5 text-white">
                That code did not work. Please check it and try again.
              </p>
            ) : null}

            <label className="grid gap-2">
              <span className="text-xs font-black uppercase tracking-widest text-canton-muted">
                Review Code
              </span>
              <input
                required
                type="password"
                name="review_code"
                className="h-12 rounded-xl border-2 border-canton-cream-line bg-canton-cream px-3 text-sm font-bold text-canton-ink outline-none focus:border-canton-green"
              />
            </label>

            <button
              type="submit"
              className="rounded-2xl border-2 border-white bg-canton-green px-4 py-4 text-base font-bold uppercase tracking-wide text-white shadow-[0_4px_0_rgba(0,0,0,0.15)]"
            >
              Continue
            </button>
          </form>
        ) : null}

        {hasAccess && submitted ? (
          <div className="rounded-2xl border-2 border-canton-green bg-white px-5 py-4">
            <p className="text-sm font-black uppercase text-canton-green">
              Review submitted
            </p>
            <p className="mt-2 text-sm font-semibold leading-6 text-canton-muted">
              Thanks. The answers were saved for the launch team.
            </p>
          </div>
        ) : null}

        {hasAccess ? (
          <form
          action="/legal-review/actions"
          method="post"
          className="grid gap-5 rounded-2xl border-2 border-canton-ink bg-white px-5 py-6"
        >
          <div className="grid gap-3">
            <h2 className="font-heading text-xl font-black uppercase text-canton-ink">
              Reviewer
            </h2>
            <TextInput label="Your Name" name="reviewer_name" required />
            <TextInput
              label="Your Email"
              name="reviewer_email"
              required
              type="email"
            />
            <TextInput
              label="Your Role"
              name="reviewer_role"
            />
          </div>

          <div className="grid gap-3">
            <h2 className="font-heading text-xl font-black uppercase text-canton-ink">
              Organization
            </h2>
            <TextInput label="Legal/Operator Name" name="operator_legal_name" />
            <TextInput label="Public Program Name" name="public_program_name" />
            <TextInput label="League/Organization Name" name="league_name" />
            <TextInput label="League Location/State" name="league_location" />
          </div>

          <div className="grid gap-3">
            <h2 className="font-heading text-xl font-black uppercase text-canton-ink">
              Contacts
            </h2>
            <TextInput label="General Contact Email" name="contact_email" type="email" />
            <TextInput label="Privacy Request Email" name="privacy_email" type="email" />
            <TextInput label="Deletion Request Email" name="deletion_email" type="email" />
            <TextInput label="Primary Admin Owner" name="admin_owner" />
            <TextInput label="Backup Owner" name="backup_owner" />
            <TextInput label="Incident Response Contact" name="incident_contact" />
          </div>

          <div className="grid gap-3">
            <h2 className="font-heading text-xl font-black uppercase text-canton-ink">
              Policies
            </h2>
            <TextArea
              label="Data Retention Preference"
              name="retention_preference"
              rows={3}
            />
            <TextArea
              label="Final Challenge Rules"
              name="rules_content"
              rows={6}
            />
            <TextArea
              label="Sponsor Language"
              name="sponsor_language"
              rows={3}
            />
            <TextArea
              label="Additional Legal/Privacy Notes"
              name="legal_notes"
              rows={5}
            />
          </div>

          <div className="grid gap-3">
            <h2 className="font-heading text-xl font-black uppercase text-canton-ink">
              Review Status
            </h2>
            <label className="grid gap-2">
              <span className="text-xs font-black uppercase tracking-widest text-canton-muted">
                Overall Status
              </span>
              <select
                name="approval_status"
                className="h-12 rounded-xl border-2 border-canton-cream-line bg-canton-cream px-3 text-sm font-bold text-canton-ink outline-none focus:border-canton-green"
                defaultValue="needs_follow_up"
              >
                <option value="needs_follow_up">Needs follow-up</option>
                <option value="approved_with_edits">Approved with edits</option>
                <option value="approved">Approved</option>
              </select>
            </label>

            {[
              ["reviewed_privacy", "I reviewed the Privacy Policy draft."],
              ["reviewed_terms", "I reviewed the Terms of Use draft."],
              [
                "reviewed_consent",
                "I reviewed the parent consent and deletion request process.",
              ],
            ].map(([name, label]) => (
              <label
                key={name}
                className="flex items-start gap-3 text-sm font-bold leading-5 text-canton-ink"
              >
                <input
                  type="checkbox"
                  name={name}
                  value="Yes"
                  className="mt-0.5 h-5 w-5 shrink-0 accent-canton-green"
                />
                {label}
              </label>
            ))}
          </div>

          <button
            type="submit"
            className="rounded-2xl border-2 border-white bg-canton-green px-4 py-4 text-base font-bold uppercase tracking-wide text-white shadow-[0_4px_0_rgba(0,0,0,0.15)]"
          >
            Submit Review
          </button>
        </form>
        ) : null}
      </div>
    </main>
  );
}
