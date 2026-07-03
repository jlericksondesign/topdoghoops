export type MockSubmission = {
  submissionId: string;
  playerName: string;
  jerseyNumber: number;
  date: string;
  submittedAt: string;
  shotTotal: number;
  friendBonus: boolean;
};

export const MOCK_PENDING_SUBMISSIONS: MockSubmission[] = [
  {
    submissionId: "sub-1",
    playerName: "Marcus Johnson",
    jerseyNumber: 23,
    date: "Today",
    submittedAt: "4:12 PM",
    shotTotal: 47,
    friendBonus: true,
  },
  {
    submissionId: "sub-2",
    playerName: "Marcus Johnson",
    jerseyNumber: 23,
    date: "Yesterday",
    submittedAt: "5:03 PM",
    shotTotal: 22,
    friendBonus: false,
  },
];

export function getMockSubmission(submissionId: string): MockSubmission {
  return (
    MOCK_PENDING_SUBMISSIONS.find((s) => s.submissionId === submissionId) ??
    MOCK_PENDING_SUBMISSIONS[0]
  );
}
