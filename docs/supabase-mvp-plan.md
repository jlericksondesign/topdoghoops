# Supabase MVP Plan

This document defines the simplest launch-ready backend path for Top Dog Hoops. It is intentionally smaller than the full product vision.

Frontend implementation should continue to use mocked data until a task explicitly says to connect Supabase.

---

## MVP Scope

Build only the backend needed for:

* Admin-created family invitations
* Parent passwordless email access
* Parent family/player confirmation
* Child device pairing
* Daily shot submission
* Parent approval or edit-then-approve
* Simple leaderboard by approved basket totals
* Community goal progress
* Basic exports

Defer until after initial release:

* Production badge logic
* Streak calculations
* Star economy
* Daily, weekly, and monthly leaderboard filters
* Rank movement calculations
* Sponsor management
* Announcements
* Suspicious activity queue
* SMS and push notifications

---

## Recommended Services

Use:

* Supabase Auth for parent/admin passwordless email sessions
* Supabase Postgres for application data
* Supabase Row Level Security for access control
* Resend for family invite and approval-request emails
* Vercel route handlers or server actions for server-only flows

Do not add:

* Password login
* Forgot-password flow
* Child accounts
* Account management screens
* SMS provider

---

## Environment Variables

Required for local and Vercel:

```txt
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
RESEND_API_KEY=
RESEND_FROM_EMAIL=
APP_BASE_URL=
```

Notes:

* `SUPABASE_SERVICE_ROLE_KEY` must only be used server-side.
* `APP_BASE_URL` should be the deployed Vercel URL in production.
* `RESEND_FROM_EMAIL` should use the league-approved sender domain.

---

## Tables

### `profiles`

One row per authenticated parent or admin.

Fields:

* `id` uuid primary key, references `auth.users.id`
* `email` text not null unique
* `display_name` text nullable
* `role` text not null, one of `parent`, `admin`
* `created_at` timestamptz not null
* `updated_at` timestamptz not null

### `parent_invites`

Admin-created invitations before parent acceptance.

Fields:

* `id` uuid primary key
* `parent_email` text not null
* `parent_name` text nullable
* `player_first_name` text not null
* `player_last_initial` text not null
* `grade` integer not null
* `gender` text not null, one of `boy`, `girl`
* `division` text not null
* `token_hash` text not null
* `status` text not null, one of `draft`, `sent`, `accepted`, `expired`, `cancelled`
* `accepted_by_profile_id` uuid nullable references `profiles.id`
* `accepted_at` timestamptz nullable
* `expires_at` timestamptz not null
* `created_by_admin_id` uuid not null references `profiles.id`
* `last_sent_at` timestamptz nullable
* `created_at` timestamptz not null
* `updated_at` timestamptz not null

### `players`

Parent-managed child/player profiles.

Fields:

* `id` uuid primary key
* `parent_profile_id` uuid nullable references `profiles.id`
* `invite_id` uuid nullable references `parent_invites.id`
* `first_name` text not null
* `last_initial` text not null
* `grade` integer not null
* `gender` text not null, one of `boy`, `girl`
* `division` text not null
* `is_active` boolean not null default false
* `created_at` timestamptz not null
* `updated_at` timestamptz not null

### `child_device_tokens`

Revocable player-scoped child access tokens.

Fields:

* `id` uuid primary key
* `player_id` uuid not null references `players.id`
* `parent_profile_id` uuid not null references `profiles.id`
* `token_hash` text not null
* `label` text nullable
* `last_used_at` timestamptz nullable
* `revoked_at` timestamptz nullable
* `expires_at` timestamptz nullable
* `created_at` timestamptz not null

### `challenges`

Challenge windows.

Fields:

* `id` uuid primary key
* `name` text not null
* `starts_on` date not null
* `ends_on` date not null
* `community_goal_baskets` integer not null
* `is_active` boolean not null default false
* `created_at` timestamptz not null
* `updated_at` timestamptz not null

### `shot_submissions`

Daily submissions and approval state.

Fields:

* `id` uuid primary key
* `challenge_id` uuid not null references `challenges.id`
* `player_id` uuid not null references `players.id`
* `submitted_by_profile_id` uuid nullable references `profiles.id`
* `submitted_by_child_device_token_id` uuid nullable references `child_device_tokens.id`
* `submission_date` date not null
* `base_baskets` integer not null
* `shot_with_friend` boolean not null default false
* `friend_bonus_baskets` integer not null default 0
* `total_baskets` integer not null
* `status` text not null, one of `pending`, `approved`
* `approved_by_profile_id` uuid nullable references `profiles.id`
* `approved_at` timestamptz nullable
* `parent_edited` boolean not null default false
* `original_total_baskets` integer nullable
* `created_at` timestamptz not null
* `updated_at` timestamptz not null

Rules:

* New submissions must use today's date.
* Friend bonus is always 10 when selected.
* Child-device submissions start as `pending`.
* Parent-entered submissions may start as `approved`.
* Only approved submissions count toward totals, leaderboards, and community progress.
* No rejection flow is required for MVP.

### `player_stats`

Cached approved totals for fast screen reads.

Fields:

* `player_id` uuid not null references `players.id`
* `challenge_id` uuid not null references `challenges.id`
* `approved_baskets_total` integer not null default 0
* `friend_bonus_count` integer not null default 0
* `last_approved_submission_date` date nullable
* `updated_at` timestamptz not null

Primary key:

* `player_id`, `challenge_id`

### `email_events`

Audit trail for outbound emails.

Fields:

* `id` uuid primary key
* `email_type` text not null, one of `parent_invite`, `approval_request`, `approval_reminder`
* `recipient_email` text not null
* `related_invite_id` uuid nullable references `parent_invites.id`
* `related_submission_id` uuid nullable references `shot_submissions.id`
* `provider` text not null default `resend`
* `provider_message_id` text nullable
* `status` text not null, one of `queued`, `sent`, `failed`
* `error_message` text nullable
* `created_at` timestamptz not null
* `sent_at` timestamptz nullable

---

## Views

### `leaderboard_challenge_totals`

Purpose:

Return a simple ranking for the active challenge.

Data:

* player id
* player display name
* division
* approved basket total
* rank within division
* overall rank

### `community_goal_progress`

Purpose:

Return total approved baskets against the active challenge goal.

Data:

* challenge id
* approved basket total
* community goal baskets
* percent complete

---

## Server Actions or Route Handlers

Start with these only:

* `sendParentInvite`
* `acceptParentInvite`
* `requestParentMagicLink`
* `createChildDeviceLink`
* `acceptChildDeviceToken`
* `submitDailyShots`
* `approveSubmission`
* `exportChallengeCsv`

Keep these server-only:

* Raw invite token generation
* Token hashing
* Resend email calls
* Admin invite creation
* Approval writes

---

## RLS Policy Plan

Admins:

* Can read and manage all MVP tables.
* Admin status comes from `profiles.role = 'admin'`.
* Initial admin users can be manually assigned in Supabase.

Parents:

* Can read their own `profiles` row.
* Can read and manage players where `players.parent_profile_id = auth.uid()`.
* Can read child device tokens for their own players.
* Can create and revoke child device tokens for their own players.
* Can read pending and approved submissions for their own players.
* Can approve or edit-then-approve submissions for their own players.

Child paired devices:

* Should not use a full Supabase Auth user.
* Server handlers validate the child device token and perform scoped reads/writes.
* Can read only the linked player experience data.
* Can create pending submissions only for the linked player.

Public/app reads:

* Can read approved leaderboard aggregate data only.
* Can read community goal progress only.
* Should not expose parent emails or private invite records.

---

## Admin MVP Workflow

Keep the first admin build simple:

1. Admin signs in by passwordless email.
2. Admin opens `/admin`.
3. Admin adds one family or uploads CSV rows.
4. Admin previews rows.
5. Admin sends parent invite emails.
6. Admin sees invite status.
7. Admin can resend, copy link, or cancel.
8. Admin can export challenge data.

Avoid for first release:

* Multi-admin invitation flows
* Sponsor editing
* Announcement composer
* Fraud review workflow
* Detailed account management

---

## Recommended Build Order

1. Create Supabase project.
2. Add environment variables locally and in Vercel.
3. Add Supabase client/server helpers.
4. Add initial database migration for the MVP tables.
5. Add RLS policies.
6. Seed one admin profile and one active challenge.
7. Wire parent magic link sign-in.
8. Wire admin manual invite creation.
9. Wire invite email sending.
10. Wire invite acceptance and player activation.
11. Wire child device pairing.
12. Wire daily shot submission.
13. Wire parent approval.
14. Wire simple leaderboard and community goal reads.
15. Wire CSV export.

---

## Post-Launch Candidates

After launch, revisit:

* Badge definitions and earned badge tables
* Streak calculation rules
* Star economy
* Weekly/monthly leaderboard filters
* Rank movement messages
* Sponsor placements
* Admin announcements
* Suspicious activity flags
* SMS reminders
