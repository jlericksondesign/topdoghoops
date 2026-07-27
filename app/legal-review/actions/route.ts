import { NextRequest, NextResponse } from "next/server";

import { sendLegalReviewSubmissionEmail } from "@/lib/email/resend";
import {
  isLegalReviewAccessValid,
  LEGAL_REVIEW_ACCESS_COOKIE,
} from "@/lib/legal-review-auth";
import { createSupabaseAdminClient } from "@/lib/supabase/server";

const fieldLabels = {
  reviewer_name: "Reviewer Name",
  reviewer_email: "Reviewer Email",
  reviewer_role: "Reviewer Role",
  approval_status: "Review Status",
  operator_legal_name: "Legal/Operator Name",
  public_program_name: "Public Program Name",
  league_name: "League/Organization Name",
  league_location: "League Location/State",
  contact_email: "General Contact Email",
  privacy_email: "Privacy Request Email",
  deletion_email: "Deletion Request Email",
  admin_owner: "Primary Admin Owner",
  backup_owner: "Backup Owner",
  retention_preference: "Data Retention Preference",
  incident_contact: "Incident Response Contact",
  rules_content: "Challenge Rules Content",
  sponsor_language: "Sponsor Language",
  legal_notes: "Additional Notes",
  reviewed_privacy: "Reviewed Privacy Policy",
  reviewed_terms: "Reviewed Terms Of Use",
  reviewed_consent: "Reviewed Consent/Deletion Process",
} as const;

type FieldName = keyof typeof fieldLabels;

function normalizeFormValue(formData: FormData, field: FieldName) {
  return String(formData.get(field) ?? "").trim();
}

function getNotifyEmail() {
  const explicitEmail = process.env.LEGAL_REVIEW_NOTIFY_EMAIL?.trim();

  if (explicitEmail) {
    return explicitEmail;
  }

  return (process.env.ADMIN_ALLOWED_EMAILS ?? "")
    .split(",")
    .map((email) => email.trim())
    .find(Boolean);
}

export async function POST(request: NextRequest) {
  const hasAccess = isLegalReviewAccessValid(
    request.cookies.get(LEGAL_REVIEW_ACCESS_COOKIE)?.value,
  );

  if (!hasAccess) {
    return NextResponse.redirect(
      new URL("/legal-review?error=1", request.url),
      303,
    );
  }

  const formData = await request.formData();
  const reviewerName = normalizeFormValue(formData, "reviewer_name");
  const reviewerEmail = normalizeFormValue(formData, "reviewer_email");
  const approvalStatus =
    normalizeFormValue(formData, "approval_status") || "needs_follow_up";

  if (!reviewerName || !reviewerEmail) {
    return NextResponse.json(
      { error: "Reviewer name and email are required." },
      { status: 400 },
    );
  }

  const answers = Object.fromEntries(
    (Object.keys(fieldLabels) as FieldName[]).map((field) => [
      fieldLabels[field],
      normalizeFormValue(formData, field),
    ]),
  );

  const supabase = createSupabaseAdminClient();

  if (!supabase) {
    return NextResponse.json(
      { error: "Supabase environment variables are not available yet." },
      { status: 500 },
    );
  }

  const { error } = await supabase.from("legal_review_submissions").insert({
    reviewer_name: reviewerName,
    reviewer_email: reviewerEmail,
    reviewer_role: normalizeFormValue(formData, "reviewer_role") || null,
    approval_status: approvalStatus,
    answers,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const notifyEmail = getNotifyEmail();

  if (notifyEmail) {
    const emailResult = await sendLegalReviewSubmissionEmail({
      to: notifyEmail,
      answers,
    });

    if (!emailResult.ok) {
      console.error("Legal review notification email failed", {
        error: emailResult.error,
      });
    }
  }

  return NextResponse.redirect(
    new URL("/legal-review?submitted=1", request.url),
    303,
  );
}
