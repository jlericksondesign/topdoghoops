# Auth, Family Invite, and Parent Approval Plan

This document updates the MVP direction for family onboarding, child access, and parent approval. The guiding principle is to keep parent and child access as simple as possible with no passwords, no forgot-password flow, and as few screens as possible.

---

## Recommended MVP Approach

Use parent-first passwordless access with admin-sent email invitations and child device pairing.

Core assumptions:

* Admins invite families by parent email.
* Parents authenticate with passwordless email.
* Parents stay logged in on their device through Supabase sessions.
* Children do not create full accounts for MVP.
* Children use paired child-device links or QR codes tied to their player profile.
* Child submissions are pending until parent approval.
* Parent approval should be one card and one primary action.
* Badges, streaks, and stars are placeholder-only for launch.
* Leaderboards are simple approved basket totals for launch.
* Invited players become active after the parent accepts the invite.
* Parent invite emails should come from `Top Dog Hoops <hello@topdoghoops.com>`.

### MVP Divisions

Use these four divisions for launch:

* Boys Elementary
* Boys Middle School
* Girls Elementary
* Girls Middle School

---

## Admin Family Invite Flow

### Goal

Let a league admin bring families into the app without managing passwords, manually creating parent accounts, or walking families through account setup.

### MVP Admin Actions

Admin can:

* Add one family manually
* Upload a CSV of families
* Preview imported rows
* Send invite emails
* Resend invite emails
* Copy an invite link
* Cancel an invite
* See invite status

### CSV Columns

Recommended MVP CSV format:

```csv
parent_email,parent_name,player_first_name,player_last_initial,grade,gender,division
```

### Invite Statuses

Use:

* `draft`
* `sent`
* `accepted`
* `expired`
* `cancelled`

### Parent Invite Email

Email purpose:

Get the parent into the app with one click.

Email CTA:

`Join Top Dog Hoops`

Email draft:

`Your child has been invited to join Top Dog Hoops. Tap below to confirm your player profile and get started.`

Link shape:

`/invite/accept?token=...`

Expected behavior:

* If the parent has no account, start passwordless email verification and create/link the parent profile.
* If the parent already exists, attach the invite to the existing parent.
* Parent confirms the player profile.
* Player becomes active.
* Parent lands on the family dashboard.

---

## Parent Access Model

### Authentication

Use passwordless email for parents.

The parent should not create or manage a password. There should be no forgot-password flow.

Parent setup flow:

1. Parent receives invitation email.
2. Parent clicks invite link.
3. Parent confirms email with passwordless auth if needed.
4. Parent reviews/accepts linked player profile.
5. Parent lands in the app and stays logged in.

Direct app access flow:

1. Parent opens the app directly.
2. Parent taps `Sign In As Parent`.
3. Parent enters their email on `/parent/link-request`.
4. App sends a fresh one-tap magic link if the email belongs to an invited or existing parent.
5. Parent clicks the email link and returns through `/auth/confirm`.
6. Parent lands in the family area or the pending approval they were trying to access.

### Parent-Owned Player Profiles

Parent owns one or more player profiles.

Parent can:

* Confirm invited player profiles
* Add another child if enabled
* Generate a child device access link or QR code
* Approve pending submissions
* Edit then approve pending submissions

---

## Child Device Pairing

### Goal

Let a child use the app from their own device without email, password, or account management.

### Pairing Flow

1. Parent opens a player profile.
2. Parent taps `Set up child device`.
3. App creates a secure child access token for that player.
4. Parent sends the link or shows a QR code.
5. Child opens the link on their own device.
6. App stores a long-lived child-device session.
7. Child lands directly in their player experience on future visits.

Child setup links expire after 7 days if unused. Once opened, the child stays logged in on that device until the parent resets or revokes access.

### Child Device Permissions

Child paired device can:

* View that player's home/progress
* Submit today's shots
* View the simple leaderboard

Child paired device cannot:

* Approve submissions
* Edit approved history
* Manage parent account
* Manage player profile
* View private parent/admin screens

### Recovery

If a child loses access, clears browser data, or gets a new device:

* Parent generates a new child access link or QR code.
* Old child tokens can be revoked from the parent account.

### Optional Later Addition

Add a 4-digit player PIN only if families need extra protection for shared devices or siblings.

Do not add PINs for MVP unless the design specifically calls for it.

---

## Parent Approval Flow

### Goal

Make approval feel fast, positive, and low-friction.

### Submission Rules

* Child-device submissions are `pending`.
* Parent-entered submissions can be auto-approved.
* Only approved submissions count toward totals, the simple leaderboard, and community progress.

### Approval Notification

Parent receives an email notification when approval is needed.

Email example:

`Mason submitted 47 shots today.`

CTA:

`Approve Shots`

Link opens directly to the approval card if the parent has an active session.

If the parent is not recognized:

* Use passwordless email verification.
* Return the parent directly to the pending approval after verification.

### Approval Screen

One card, one decision.

Show:

* Player name
* Date
* Submitted shots
* Friend bonus, if selected
* Submission time

Primary CTA:

`APPROVE +47 SHOTS`

Secondary action:

`Edit before approving`

### Edit Then Approve

Keep editing inline and minimal:

1. Parent taps `Edit before approving`.
2. Number stepper or simple numeric input appears.
3. Parent adjusts total.
4. CTA updates to `APPROVE 42 SHOTS`.
5. App saves an audit note with the original and edited totals.

MVP should avoid a rejection flow unless the league explicitly asks for it. Editing to the correct number is friendlier and creates less support friction.

---

## Recommended Services

Use:

* Supabase Auth for parent passwordless email sessions
* Supabase Postgres for parent invites, player profiles, child device tokens, and submissions
* Resend for invitation and approval emails
* Vercel route handlers or server actions for invite sending and approval links

Defer:

* SMS
* Push notifications
* Player passwords
* Parent password accounts
* Full account management screens

---

## Security Notes

Store invite and child access tokens as hashes in the database.

Recommended token rules:

* Parent invite tokens expire.
* Child device tokens can be long-lived but revocable.
* Approval links should require parent identity, either via active session or passwordless email verification.
* Child device tokens should be scoped to one player and limited permissions.
* Admin invite actions should be admin-only.

---

## MVP Decision Summary

Chosen direction:

* Admin sends parent invitations by email.
* Parent uses passwordless email.
* Parent owns player profiles.
* Child uses paired device access.
* Parent approval is one-tap with optional edit.
* No passwords.
* No forgot-password flow.
* No child account management.
