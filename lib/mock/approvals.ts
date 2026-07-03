export type MockSubmission = {
  submissionId: string;
  playerName: string;
  jerseyNumber: number;
  date: string;
  dateShort: string;
  submittedAt: string;
  shotTotal: number;
  friendBonus: boolean;
};

export const MOCK_PENDING_SUBMISSIONS: MockSubmission[] = [
  {
    submissionId: "submission-1",
    playerName: "Marcus Johnson",
    jerseyNumber: 23,
    date: "Today",
    dateShort: "07 03",
    submittedAt: "4:12 PM",
    shotTotal: 47,
    friendBonus: true,
  },
  {
    submissionId: "submission-2",
    playerName: "Marcus Johnson",
    jerseyNumber: 23,
    date: "Yesterday",
    dateShort: "07 02",
    submittedAt: "5:03 PM",
    shotTotal: 22,
    friendBonus: false,
  },
];

export const MOCK_RECENTLY_APPROVED_SUBMISSIONS: MockSubmission[] = [
  {
    submissionId: "approved-1",
    playerName: "Marcus Johnson",
    jerseyNumber: 23,
    date: "Mon",
    dateShort: "06 29",
    submittedAt: "6:18 PM",
    shotTotal: 31,
    friendBonus: false,
  },
  {
    submissionId: "approved-2",
    playerName: "Marcus Johnson",
    jerseyNumber: 23,
    date: "Sun",
    dateShort: "06 28",
    submittedAt: "3:42 PM",
    shotTotal: 18,
    friendBonus: false,
  },
];

export function getMockSubmission(submissionId: string): MockSubmission {
  const canonicalId =
    submissionId === "sub-1"
      ? "submission-1"
      : submissionId === "sub-2"
        ? "submission-2"
        : submissionId;

  return (
    MOCK_PENDING_SUBMISSIONS.find((s) => s.submissionId === canonicalId) ??
    MOCK_PENDING_SUBMISSIONS[0]
  );
}
