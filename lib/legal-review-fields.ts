export const legalReviewFieldLabels = {
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

export type LegalReviewFieldName = keyof typeof legalReviewFieldLabels;

export const legalReviewFieldNames = Object.keys(
  legalReviewFieldLabels,
) as LegalReviewFieldName[];
