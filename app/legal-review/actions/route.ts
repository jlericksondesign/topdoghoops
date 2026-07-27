import { NextRequest, NextResponse } from "next/server";

import { sendLegalReviewSubmissionEmail } from "@/lib/email/resend";
import {
  isLegalReviewAccessValid,
  LEGAL_REVIEW_ACCESS_COOKIE,
} from "@/lib/legal-review-auth";
import {
  legalReviewFieldLabels,
  legalReviewFieldNames,
  type LegalReviewFieldName,
} from "@/lib/legal-review-fields";
import { createSupabaseAdminClient } from "@/lib/supabase/server";

function normalizeFormValue(formData: FormData, field: LegalReviewFieldName) {
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
    legalReviewFieldNames.map((field) => [
      legalReviewFieldLabels[field],
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
