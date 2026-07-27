# Top Dog Hoops Privacy Policy Draft

Draft date: July 27, 2026

Attorney review required before launch. This draft is written to be plain-English and to match the current MVP plan. Replace bracketed placeholders before publishing.

## Operator and Contact

Top Dog Hoops is operated by `[LEGAL/ORGANIZATION NAME]` for the purpose of running a youth basketball shot challenge.

Privacy contact:

* Email: `[PRIVACY CONTACT EMAIL]`
* Mailing address: `[OPTIONAL MAILING ADDRESS]`

## What Top Dog Hoops Does

Top Dog Hoops lets league administrators invite parents, lets parents manage their player's participation, lets children submit daily shot totals from a paired device, and lets parents approve shot logs before they count toward leaderboards.

## Information We Collect

### From parents and administrators

* Name.
* Email address.
* Sign-in and invitation status.
* Admin invite and support actions.

### About players

* First name.
* Last initial.
* Grade.
* Division or league grouping.
* Jersey number, if provided or displayed.
* Parent-linked player profile.

The MVP should not collect child email addresses, phone numbers, street addresses, precise location, photos, videos, audio, chat messages, or direct child accounts.

### From child paired devices

* A revocable device pairing token.
* The linked player profile needed for the child-safe experience.
* Daily shot submissions, including basket count and selected bonuses.
* Basic technical data needed for security, logs, and app operation.

### Challenge and leaderboard data

* Approved shot totals.
* Challenge participation totals.
* Leaderboard rank based on approved submissions.

Public leaderboard display should use limited player display information, such as first name and last initial, unless a parent and the league approve a different display format.

## How We Use Information

We use information to:

* Invite parents to participate.
* Let parents review and approve player shot logs.
* Let children submit shot counts without creating child accounts.
* Calculate approved challenge totals and leaderboards.
* Help administrators operate the challenge.
* Send invite, sign-in, and operational emails.
* Protect the app from unauthorized access or misuse.

## How We Share Information

Top Dog Hoops does not sell player or parent information.

Information may be shared with service providers needed to operate the app, such as hosting, database, authentication, and email delivery providers. Current planned services include Vercel, Supabase, and Resend. These providers should be configured to support the confidentiality and security of app data.

Approved leaderboard totals may be visible to other app users in limited form. Pending shot submissions should only be visible to the linked parent/guardian and authorized admins.

## Parent Rights

Parents may request to:

* Review information associated with their child/player profile.
* Correct inaccurate player information.
* Revoke consent for continued participation.
* Delete their child's/player's personal information.

Requests should be sent to `[PRIVACY CONTACT EMAIL]`. Before disclosing, changing, or deleting child/player information, Top Dog Hoops will take reasonable steps to verify that the requester is the linked parent or guardian.

If a parent revokes consent or requests deletion, the child/player may no longer be able to participate in the challenge if the deleted information is necessary to operate the service.

## Children's Privacy and COPPA

Top Dog Hoops is designed for youth sports and may involve children under 13. The FTC explains that COPPA can require child-directed online services that collect personal information from children under 13 to provide a clear privacy policy, notify parents, obtain verifiable parental consent when required, honor parent review/deletion rights, protect children's information, and follow retention/deletion practices.

Top Dog Hoops should be operated as a parent-mediated app:

* Admins invite parents, not children.
* Parents accept invitations and manage player profiles.
* Children use paired device access rather than child accounts.
* Child submissions remain limited to challenge activity and require parent approval before appearing in totals.

Attorney review is required to confirm whether COPPA applies and whether the selected consent method is sufficient.

## Security

Top Dog Hoops should use:

* Passwordless parent access.
* Admin-only access controls.
* MFA for administrators.
* Row Level Security for database access.
* Revocable child device tokens.
* Hashed invite and child access tokens.
* Least-privilege access to production systems.

## Data Retention

Top Dog Hoops should keep personal information only as long as needed for the challenge, parent support, legal/compliance obligations, and security. See `data-retention-deletion.md` for the working retention schedule.

## Changes to This Policy

If the privacy practices materially change, Top Dog Hoops should update this policy and notify parents when required.

## Review Status

Status: Draft for operator and attorney review.

