# Data Retention and Deletion Practices

Draft date: July 27, 2026

Attorney review required before launch. The FTC COPPA guidance says covered operators should retain children's personal information only as long as reasonably necessary for the purpose collected and securely delete it when no longer needed.

## Principles

* Collect the minimum data needed to run the challenge.
* Avoid child email, phone, address, photos, videos, audio, chat, and precise location for MVP.
* Keep parent/admin contact information only as long as needed for operations, support, and records.
* Keep child/player information only as long as needed for participation, approved results, support, and required records.
* Honor verified parent deletion and consent revocation requests.
* Prefer anonymized aggregate stats when individual identity is no longer needed.

## Working Retention Schedule

| Data category | Examples | Purpose | Draft retention | Deletion trigger |
|---|---|---|---|---|
| Parent/admin profiles | Email, display name, role | Sign-in, admin/parent access | While account is active plus `[RETENTION PERIOD]` | Account closure, verified deletion request, or admin removal |
| Parent invites | Parent email/name, player first name/last initial, grade, division, token hash, status | Invite and consent workflow | Expire unused invites after `[INVITE EXPIRY]`; keep sent/accepted invite records for `[RETENTION PERIOD]` | Expiry, cancellation, or deletion request |
| Player profiles | First name, last initial, grade, division, parent link | Challenge participation | Active challenge plus `[RETENTION PERIOD]` | Parent deletion request or league removal |
| Child device tokens | Token hash, player link, parent link, last used, revoked/expiry | Child-safe paired access | Until revoked, expired, or player deleted | Parent reconnect/revoke, expiry, deletion request |
| Shot submissions | Date, baskets, bonuses, pending/approved status, approval audit | Challenge scoring and parent approval | Challenge period plus `[RETENTION PERIOD]` | Parent deletion request, challenge archive policy |
| Player stats | Approved totals, leaderboard aggregate | Fast dashboard and leaderboard reads | Challenge period plus `[RETENTION PERIOD]` | Recalculation, anonymization, deletion request |
| Email events | Invite/sign-in/approval email event records | Support and operational audit | `[RETENTION PERIOD]` | Routine cleanup after retention period |
| Admin audit events | Invite creation, status changes, approval support actions | Accountability and support | `[RETENTION PERIOD]` | Routine cleanup after retention period |
| Security logs | Auth/session/security events | Security monitoring | `[RETENTION PERIOD]` | Routine log rotation |
| Privacy request records | Requester, player, request type, completion date | Prove request handling | `[RETENTION PERIOD]` | End of legal/operational need |

## Suggested MVP Defaults for Review

These are not final. Use them as a starting point for Jess/operator/counsel:

* Unaccepted invite expiration: 14 days.
* Expired/cancelled invite cleanup: 90 days after expiry/cancellation.
* Active challenge shot logs: retain through challenge plus 90 days.
* Approved aggregate leaderboard records: retain through season unless parent deletion requires anonymization.
* Child device tokens: revoke on parent request, reconnect, player deletion, or end of season.
* Email events/security logs: 90 days unless needed for an active support or security issue.
* Privacy request records: 2 years or counsel-approved period.

## Deletion Procedure

1. Verify requester authority.
2. Identify linked parent profile and player profile.
3. Revoke child device tokens.
4. Remove pending submissions.
5. Delete or anonymize approved submissions.
6. Recalculate or remove leaderboard/player stats.
7. Update invite/player status to inactive or deleted if hard deletion is not appropriate.
8. Record completion in a minimal privacy request log.
9. Confirm completion to the parent.

## Review Status

Status: Draft for operator and attorney review.

