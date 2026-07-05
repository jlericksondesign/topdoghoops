"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { ApprovalCard } from "@/components/features/approvals/ApprovalCard";
import { ApprovalEditSheet } from "@/components/features/approvals/ApprovalEditSheet";
import { ApprovalSuccessCard } from "@/components/features/approvals/ApprovalSuccessCard";

type ApprovalSubmission = {
  friendBonus: boolean;
  jerseyNumber: number;
  playerName: string;
  shotTotal: number;
  submittedAt: string;
  submissionDate: string;
  submissionId: string;
};

type ViewState = "review" | "editing" | "approved";
type ApprovalStatus = "idle" | "saving" | "error";

export function ApprovalDetailClient({
  submission,
}: {
  submission: ApprovalSubmission;
}) {
  const [view, setView] = useState<ViewState>("review");
  const [editedTotal, setEditedTotal] = useState(submission.shotTotal);
  const [approvedTotal, setApprovedTotal] = useState(submission.shotTotal);
  const [status, setStatus] = useState<ApprovalStatus>("idle");
  const [error, setError] = useState<string | null>(null);

  async function approveShotLog(total: number) {
    setStatus("saving");
    setError(null);

    try {
      const response = await fetch("/parent-approval/api/approve", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          approvedTotal: total,
          submissionId: submission.submissionId,
        }),
      });
      const result = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(result.error ?? "Shot log could not be approved.");
      }

      setApprovedTotal(total);
      setStatus("idle");
      setView("approved");
    } catch (caughtError) {
      setStatus("error");
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "Shot log could not be approved.",
      );
    }
  }

  return (
    <>
      {view !== "approved" ? (
        <Link
          href="/parent-approval"
          className="flex w-full items-center gap-2 text-sm font-bold uppercase tracking-wide text-canton-ink"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          Approvals
        </Link>
      ) : null}

      {error ? (
        <p className="w-full rounded-xl bg-canton-orange px-4 py-3 text-center text-xs font-black uppercase text-white">
          {error}
        </p>
      ) : null}

      {view === "review" ? (
        <ApprovalCard
          playerName={submission.playerName}
          jerseyNumber={submission.jerseyNumber}
          date={submission.submissionDate}
          submittedAt={submission.submittedAt}
          shotTotal={submission.shotTotal}
          friendBonus={submission.friendBonus}
          approveLabel={status === "saving" ? "Approving" : undefined}
          onApprove={() => approveShotLog(submission.shotTotal)}
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
          approveLabel={status === "saving" ? "Approving" : undefined}
          onChange={setEditedTotal}
          onApprove={() => approveShotLog(editedTotal)}
          onCancel={() => setView("review")}
        />
      ) : null}

      {view === "approved" ? (
        <ApprovalSuccessCard
          playerName={submission.playerName}
          approvedTotal={approvedTotal}
        />
      ) : null}
    </>
  );
}
