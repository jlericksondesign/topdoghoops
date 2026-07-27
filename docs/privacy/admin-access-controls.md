# Admin Access Controls and MFA Expectations

Draft date: July 27, 2026

## Goal

Protect parent/player data by limiting admin access to approved people, requiring strong account protection, and keeping operational access auditable.

## Admin Access Policy Draft

Admin access should be limited to people who need it to run the Top Dog Hoops challenge.

Approved admins:

* `[ADMIN NAME / EMAIL]`
* `[ADMIN NAME / EMAIL]`

Admin responsibilities:

* Use admin access only for challenge operations.
* Do not share sign-in links or sessions.
* Do not export data unless needed.
* Store exported files securely and delete them when no longer needed.
* Report suspected access problems immediately.

## MFA Requirement

Admins should use MFA on every operational account that can affect production data or deployment:

* Email account used for admin sign-in links.
* Supabase account.
* Vercel account.
* GitHub account.
* Domain/DNS registrar account.
* Resend/email provider account.
* Any shared password manager or workspace account.

MFA method:

* Prefer authenticator app or hardware security key.
* Avoid SMS where a stronger option is available.

## Application Access Controls

Current/planned controls:

* Admin routes require admin session.
* Admin role should be represented in `profiles.role = 'admin'`.
* Database Row Level Security should restrict parent, child-device, admin, and public leaderboard access.
* Child device tokens are scoped to one player and should be revocable.
* Invite and child access tokens should be stored as hashes.
* Service role keys must only be used server-side.

## Access Review Checklist

Run before launch and monthly during the challenge:

* Confirm approved admin list.
* Remove admins who no longer need access.
* Confirm MFA is enabled on all operational accounts.
* Confirm no service keys are exposed in client code.
* Confirm environment variables are limited to Vercel/Supabase as needed.
* Review recent invite/export/support activity.
* Rotate compromised or accidentally shared links/secrets.

## Export Controls

Admin exports should:

* Include only fields needed for the stated purpose.
* Avoid child contact information because the MVP should not collect it.
* Use first name and last initial where possible.
* Be stored only in approved locations.
* Be deleted after the retention period.

## Open Decisions

* Final admin list.
* Whether app-level admin login needs a second factor beyond protected admin email accounts.
* Who performs monthly access review.
* Where export files may be stored.

## Review Status

Status: Draft for operator review.

