# Maintenance and Incident Response Plan

Draft date: July 27, 2026

## Owners and Contacts

Primary owner: `[NAME / EMAIL / PHONE]`

Backup owner: `[NAME / EMAIL / PHONE]`

Privacy contact: `[PRIVACY CONTACT EMAIL]`

Technical support contact: `[TECH CONTACT EMAIL]`

Attorney/contact for privacy incidents: `[LEGAL CONTACT]`

## Maintenance Plan

Weekly during active challenge:

* Check the app loads on production.
* Check parent invite flow.
* Check player shot log submission.
* Check parent approval flow.
* Check leaderboard displays approved data only.
* Review admin invite/export activity.

Monthly or before each challenge:

* Review admin access list and MFA status.
* Review dependency/security update notices.
* Confirm backups or database recovery options.
* Review privacy/deletion request log.
* Review open QA and support issues.
* Confirm Privacy Policy, Terms, rules, and contact information are still accurate.

## Incident Categories

### Severity 1 - High

Examples:

* Parent/player data exposed to the wrong user.
* Admin account compromise.
* Service role key or production secret exposed.
* Unauthorized export or deletion.
* Security issue involving child/player data.

Response target: same day.

### Severity 2 - Medium

Examples:

* Broken invite or sign-in flow affecting many users.
* Incorrect leaderboard or approval data visible to authorized users.
* Failed deletion request workflow.
* Repeated email delivery failures.

Response target: 1-2 business days.

### Severity 3 - Low

Examples:

* Minor display issue.
* Non-sensitive typo.
* Small usability bug with workaround.

Response target: next planned maintenance window.

## Incident Response Steps

1. Identify and record the issue.
2. Assign severity.
3. Preserve relevant logs/screenshots.
4. Contain the issue:
   * disable affected route;
   * revoke token;
   * remove admin access;
   * rotate secret;
   * pause invite/send flow;
   * take other necessary containment action.
5. Assess what data or users were affected.
6. Notify owner, backup owner, and legal/privacy contact if child/player or parent data may be involved.
7. Fix or mitigate the issue.
8. Verify the fix.
9. Decide whether parent/admin notification is required.
10. Document timeline, impact, root cause, and prevention steps.
11. Add follow-up QA/security tasks.

## Parent/Admin Notification Draft Checklist

If notification is required, prepare:

* What happened.
* When it happened.
* What information may have been involved.
* What was done to contain it.
* What parents/admins should do.
* Who to contact with questions.

Do not send incident notices without operator/legal review unless urgent safety or legal requirements demand immediate action.

## Secret Rotation Checklist

If a secret or token may be exposed:

* Rotate Supabase service role key if affected.
* Rotate Resend API key if affected.
* Rotate Vercel environment variables if affected.
* Revoke child device token if affected.
* Revoke parent/admin session if affected.
* Reissue invite links if affected.

## Review Status

Status: Draft for operator review.

