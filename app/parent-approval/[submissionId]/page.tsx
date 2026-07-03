"use client";

import { use, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { AppHeaderBar } from "@/components/app/AppHeaderBar";
import { ApprovalCard } from "@/components/features/approvals/ApprovalCard";
import { ApprovalEditSheet } from "@/components/features/approvals/ApprovalEditSheet";
import { ApprovalSuccessCard } from "@/components/features/approvals/ApprovalSuccessCard";
import { getMockSubmission } from "@/lib/mock/approvals";

type ViewState = "review" | "editing" | "approved";

export default function ApprovalDetailPage({
  params,
}: {
  params: Promise<{ submissionId: string }>;
}) {
  const { submissionId } = use(params);
  const submission = getMockSubmission(submissionId);

  const [view, setView] = useState<ViewState>("review");
  const [editedTotal, setEditedTotal] = useState(submission.shotTotal);
  const [approvedTotal, setApprovedTotal] = useState(submission.shotTotal);

  return (
    <main className="flex min-h-dvh flex-col bg-canton-cream-grid">
      <AppHeaderBar dashboardHref="/family" />
      <div className="flex flex-1 flex-col items-center gap-6 px-10 pb-10 pt-8">
        {view !== "approved" ? (
          <Link
            href="/parent-approval"
            className="flex w-full items-center gap-2 text-sm font-bold uppercase tracking-wide text-canton-ink"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Approvals
          </Link>
        ) : null}

        {view === "review" ? (
          <ApprovalCard
            playerName={submission.playerName}
            jerseyNumber={submission.jerseyNumber}
            date={submission.date}
            submittedAt={submission.submittedAt}
            shotTotal={submission.shotTotal}
            friendBonus={submission.friendBonus}
            onApprove={() => {
              setApprovedTotal(submission.shotTotal);
              setView("approved");
            }}
            onEdit={() => {
              setEditedTotal(submission.shotTotal);
              setView("editing");
            }}
          />
        ) : null}

        {view === "editing" ? (
          <ApprovalEditSheet
            playerName={submission.playerName}
            originalTotal={submission.shotTotal}
            editedTotal={editedTotal}
            onChange={setEditedTotal}
            onApprove={() => {
              setApprovedTotal(editedTotal);
              setView("approved");
            }}
            onCancel={() => setView("review")}
          />
        ) : null}

        {view === "approved" ? (
          <ApprovalSuccessCard
            playerName={submission.playerName}
            approvedTotal={approvedTotal}
          />
        ) : null}
      </div>
    </main>
  );
}
