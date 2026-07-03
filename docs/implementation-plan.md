# Top Dog Hoops Implementation Plan

This plan translates `/docs/product-spec.md` and `/docs/brand.md` into an MVP build path. The product source of truth remains the MVP spec, and the visual/interaction source of truth remains the brand guide.

Front-end page design is user-provided. Before implementing or substantially redesigning any page, follow `/docs/frontend-design-handoff.md` and use Jessica's page-specific design direction as the visual source of truth.

Family onboarding, child access, and parent approval should follow `/docs/auth-invite-approval-plan.md`.

MVP simplification as of July 2026:

* Badges, streaks, and stars are launch placeholders only.
* Leaderboards are simple challenge totals ranked by approved baskets.
* Admin tools should be as small as possible: invite families, see basic participation, and export useful data.

---

## 1. Recommended Build Phases

### Phase 0: Design Handoff and UI Direction

Goal: Gather page-specific front-end designs before building polished UI.

Build:

* Confirm canonical product, brand, and implementation docs
* Collect page-specific designs from Jessica
* Identify reusable component patterns from those designs
* Create an implementation checklist per page
* Mark any existing mocked UI as prototype-only until final design is supplied

Definition of done:

* Each page has a supplied design or is explicitly approved for plain functional scaffolding
* Visual decisions are not being improvised by the builder
* Gaps and open questions are documented before implementation begins

---

### Phase 1: Product Foundation

Goal: Establish the app shell, brand system, routes, and Supabase project wiring without shipping complex workflows yet.

Build:

* Mobile-first app navigation and route structure based on supplied designs
* Brand tokens for Canton Bulldogs green, dark charcoal, white, basketball orange, achievement gold, and success green
* Shared layout primitives derived from supplied page designs
* Supabase client/server setup
* Environment variable documentation
* Initial database migrations

Definition of done:

* All MVP routes exist
* Design implementation matches the supplied front-end direction
* Supabase connection is ready
* Database schema can support the MVP workflows

---

### Phase 2: Auth, Roles, and Player Setup

Goal: Let admins invite families, let parents accept with passwordless email, and let children use paired player access without full accounts.

Build:

* Admin family invite creation
* Manual family invite form
* CSV family invite upload and preview
* Invite email sending
* Parent passwordless email acceptance
* Parent profile creation/linking
* Parent-managed player profiles
* Child device pairing links or QR codes
* Player division assignment
* Admin-only access rules

Definition of done:

* Admins can send and resend parent invitations
* Parents can accept invitations without creating a password
* Parents can create and manage multiple players
* Players are attached to a parent/guardian
* Children can access their player experience from paired devices without a full login
* Admins can access admin routes
* Role-based access is enforced in Supabase policies and app routing

---

### Phase 3: Daily Shot Entry and Parent Approval

Goal: Build the core loop: submit today's shots, parent approves, approved totals count.

Build:

* Daily shot entry screen
* Today's date only, no date picker
* Large arcade-style score display
* +1, +5, +10 controls
* Shot With A Friend checkbox
* Pending submission state
* One-card parent approval flow
* Parent edit then approve flow with audit trail
* Approved-only leaderboard aggregation

Definition of done:

* Players can submit only for today
* Friend bonus adds 10 baskets
* Child-device submissions require parent approval
* Parent-entered submissions may be auto-approved
* Parent can approve or edit and approve from a minimal approval card
* Unapproved submissions do not count toward leaderboard totals

---

### Phase 4: Celebration and Lightweight Progress

Goal: Make the core loop feel like submitting a video game high score.

Build:

* Submission celebration sequence
* Basketball launch and swish animation
* Scoreboard tally animation
* Encouragement message rotation
* Placeholder stars/streak/badge messaging if represented in the supplied designs
* Celebration feedback under 1-3 seconds

Definition of done:

* Submission feedback is fast, fun, and rewarding
* Player sees shots recorded and a simple pending/confirmation state
* Any stars, streaks, badges, or leaderboard movement are clearly placeholder UI until post-launch logic is added
* Animations support the brand without becoming a fully pixel-art interface

---

### Phase 5: Simple Progress, Leaderboard, and Community Goal

Goal: Make progress visible everywhere.

Build:

* Home screen progress summary
* Community goal progress card
* One simple challenge leaderboard based on approved basket totals
* Division filter or tabs if supplied in the design
* Overall view as secondary if supplied in the design
* Retro arcade scoreboard leaderboard cards

Definition of done:

* Players can quickly see today's status, approved total, community progress, and rank
* Primary division leaderboards receive visual priority
* Community progress creates cooperation alongside competition
* Daily/weekly/monthly filters, real rank movement, badges, and streak calculations are deferred

---

### Phase 6: Minimal Admin, Notifications, and Exports

Goal: Give league admins the operational tools needed to run the challenge.

Build:

* Admin dashboard metrics
* Family invite management
* Basic family/player management
* CSV export
* Google Sheets-compatible export
* Email notifications
* Resend-backed family invitation emails
* Resend-backed parent approval request emails

Definition of done:

* Admins can manage the MVP without direct database access
* Admins can invite families and support parent onboarding
* Exports are usable for league reporting

---

## 2. Database Schema Plan

Use Supabase Auth for account identity and Supabase Postgres for application data. Prefer explicit role fields and Row Level Security policies over app-only permission checks.

MVP auth posture:

* Parents use passwordless email.
* Admins use authenticated admin profiles.
* Children do not have full accounts.
* Children use player-scoped paired device sessions.
* No password or forgot-password flow is planned for MVP.

### Core Tables

#### `profiles`

Stores one row per authenticated user.

Fields:

* `id` uuid primary key, references `auth.users.id`
* `email` text
* `display_name` text
* `role` enum: `parent`, `admin`
* `phone` text nullable
* `created_at` timestamp
* `updated_at` timestamp

Notes:

* A parent can manage multiple players.
* For MVP, players should not require direct login.
* Parent profiles are created or linked from accepted admin invitations.

---

#### `players`

Stores player profiles participating in challenges.

Fields:

* `id` uuid primary key
* `parent_profile_id` uuid references `profiles.id`
* `first_name` text
* `last_initial` text
* `grade` integer
* `age` integer nullable
* `gender` enum: `boy`, `girl`
* `division` enum: `boys_elementary`, `boys_middle_school`, `girls_elementary`, `girls_middle_school`
* `avatar_url` text nullable
* `is_active` boolean
* `invite_id` uuid nullable references `parent_invites.id`
* `created_at` timestamp
* `updated_at` timestamp

Notes:

* Division can be derived from grade and gender, but storing it keeps leaderboard queries simple.
* Use first name and last initial publicly unless a future privacy decision says otherwise.

---

#### `parent_invites`

Stores admin-created family invitations before parent acceptance.

Fields:

* `id` uuid primary key
* `parent_email` text
* `parent_name` text nullable
* `player_first_name` text
* `player_last_initial` text
* `grade` integer
* `gender` enum: `boy`, `girl`
* `division` enum: `boys_elementary`, `boys_middle_school`, `girls_elementary`, `girls_middle_school`
* `token_hash` text
* `status` enum: `draft`, `sent`, `accepted`, `expired`, `cancelled`
* `accepted_by_profile_id` uuid nullable references `profiles.id`
* `accepted_at` timestamp nullable
* `expires_at` timestamp
* `created_by_admin_id` uuid references `profiles.id`
* `last_sent_at` timestamp nullable
* `created_at` timestamp
* `updated_at` timestamp

Notes:

* Store hashes, not raw invite tokens.
* Parent invite emails should be sent through Resend.
* Accepted invites create or link parent profiles and activate player profiles.

---

#### `child_device_tokens`

Stores revocable child device access grants for a single player profile.

Fields:

* `id` uuid primary key
* `player_id` uuid references `players.id`
* `parent_profile_id` uuid references `profiles.id`
* `token_hash` text
* `label` text nullable
* `last_used_at` timestamp nullable
* `revoked_at` timestamp nullable
* `expires_at` timestamp nullable
* `created_at` timestamp

Notes:

* Store hashes, not raw child access tokens.
* Token grants should be scoped to one player.
* Child device access can create pending submissions only.
* Parent can revoke and regenerate access.

---

#### `challenges`

Stores challenge windows such as July, August, and future seasons.

Fields:

* `id` uuid primary key
* `name` text
* `starts_on` date
* `ends_on` date
* `community_goal_baskets` integer
* `is_active` boolean
* `created_at` timestamp
* `updated_at` timestamp

Notes:

* Initial challenge is July.
* Future challenges can reuse the same structure.

---

#### `shot_submissions`

Stores daily shot submissions before and after parent approval.

Fields:

* `id` uuid primary key
* `challenge_id` uuid references `challenges.id`
* `player_id` uuid references `players.id`
* `submitted_by_profile_id` uuid nullable references `profiles.id`
* `submitted_by_child_device_token_id` uuid nullable references `child_device_tokens.id`
* `submission_date` date
* `base_baskets` integer
* `shot_with_friend` boolean
* `friend_bonus_baskets` integer default `0`
* `total_baskets` integer
* `status` enum: `pending`, `approved`, `rejected`
* `approved_by_profile_id` uuid nullable references `profiles.id`
* `approved_at` timestamp nullable
* `parent_edited` boolean
* `original_total_baskets` integer nullable
* `created_at` timestamp
* `updated_at` timestamp

Rules:

* Only today's date is allowed for new submissions.
* No daily maximum.
* Friend bonus is always 10 when selected.
* Child-device submissions start as pending.
* Parent-entered submissions may start as approved.
* Only approved submissions count in totals, leaderboards, and community progress.

---

#### `player_stats`

Stores cached MVP player progress for fast home screen and leaderboard reads.

Fields:

* `player_id` uuid primary key references `players.id`
* `challenge_id` uuid references `challenges.id`
* `approved_baskets_total` integer
* `friend_bonus_count` integer
* `last_approved_submission_date` date nullable
* `updated_at` timestamp

Notes:

* This can be maintained by database functions or server actions after approvals.
* Keep raw submissions as the source of truth.
* Stars, streaks, and badge counts are intentionally deferred until after the first release.

---

#### `email_events`

Stores outbound email attempts for invites, approvals, and approval reminders.

Fields:

* `id` uuid primary key
* `email_type` enum: `parent_invite`, `approval_request`, `approval_reminder`
* `recipient_email` text
* `related_invite_id` uuid nullable references `parent_invites.id`
* `related_submission_id` uuid nullable references `shot_submissions.id`
* `provider` text default `resend`
* `provider_message_id` text nullable
* `status` enum: `queued`, `sent`, `failed`
* `error_message` text nullable
* `created_at` timestamp
* `sent_at` timestamp nullable

Notes:

* This provides a basic audit trail for admin invite support and approval reminders.

---

### Views and Functions

Recommended views:

* `approved_submission_totals`
* `leaderboard_challenge_totals`
* `community_goal_progress`

Recommended functions:

* `accept_parent_invite(token)`
* `create_child_device_token(player_id)`
* `revoke_child_device_token(token_id)`
* `approve_submission(submission_id, edited_total)`

---

## 3. Screen and Component Breakdown

### App-Level Structure

Routes:

* `/` home dashboard
* `/player-entry` daily shot entry
* `/parent-approval` parent approval queue
* `/leaderboards` leaderboard views
* `/admin` admin dashboard
* `/invite/accept`
* `/auth/confirm`
* `/family`
* `/family/[playerId]/device-setup`
* `/pair/[token]`

Shared components:

* `MobileShell`
* `BottomNav`
* `PageHeader`
* `PrimaryActionBar`
* `ScoreboardCard`
* `ProgressMeter`
* `CommunityGoalCard`
* `DivisionTabs`
* `LeaderboardCard`
* `EmptyState`
* `LoadingState`
* `InviteStatusBadge`
* `ApprovalCard`
* `ChildDeviceSetupCard`

---

### Home Screen

Purpose:

Give players an immediate sense of status and one clear action.

Components:

* `TodayStatusCard`
* `ApprovedShotsSummaryCard`
* `RewardPlaceholderCard`
* `CommunityGoalCard`
* `RankSummaryCard`
* `SubmitShotsButton`

Interaction notes:

* One primary CTA: `SUBMIT TODAY'S SHOTS`
* Avoid dashboard density
* Use progress and encouragement as the first impression

---

### Player Entry Screen

Purpose:

Let players submit today's shot total quickly with minimal typing.

Components:

* `ArcadeScoreDisplay`
* `ScoreIncrementButton`
* `FriendBonusToggle`
* `SubmitScoreButton`
* `SubmissionCelebration`

Interaction notes:

* No date picker
* Large touch targets
* +1, +5, +10 controls
* Score starts at `000`
* Friend bonus clearly explains `+10`

---

### Submission Celebration

Purpose:

Make submission feel like a high-score moment.

Components:

* `BasketballLaunchAnimation`
* `HoopSwishAnimation`
* `ScoreTallyAnimation`
* `RewardReveal`
* `LeaderboardMovementPlaceholder`
* `EncouragementMessage`

Interaction notes:

* Keep total animation sequence fast
* Prefer 1-3 seconds
* Include reduced-motion fallback
* Vibration and sound should be optional

---

### Parent Approval Screen

Purpose:

Let parents approve submissions with trust and speed.

Components:

* `PendingSubmissionList`
* `SubmissionReviewCard`
* `EditSubmissionSheet`
* `ApproveButton`
* `ApprovedConfirmation`

Interaction notes:

* Parent can approve or edit then approve
* Make edited totals visibly distinct
* Avoid making approval feel punitive

---

### Leaderboards Screen

Purpose:

Show simple competition by division for the current challenge.

Components:

* `DivisionTabs`
* `LeaderboardCard`
* `PlayerRankRow`

Interaction notes:

* Primary divisions get visual priority
* Overall is secondary
* Cards should feel like retro arcade scoreboards
* Defer daily, weekly, and monthly tabs until after launch

---

### Admin Screen

Purpose:

Give league admins enough control to operate the MVP.

Components:

* `AdminMetricGrid`
* `InviteTable`
* `InviteManualForm`
* `InviteImportPreviewTable`
* `FamilyTable`
* `ExportControls`

Interaction notes:

* Admin can be denser than player screens, but still mobile-friendly
* Make review queues clear
* Keep exports obvious

---

## 4. Auth and User Role Plan

### Roles

Player:

* Can view own home, progress, and simple leaderboard
* Can create today's shot submission
* Cannot approve submissions
* Cannot edit approved history
* Does not have a full account in the MVP
* Accesses the app through a parent-generated paired device link or QR code

Parent:

* Accepts admin email invitation
* Uses passwordless email authentication
* Can confirm and manage child/player profiles
* Can generate or revoke child device access
* Can view pending submissions for their children
* Can approve or edit then approve
* Can receive reminders

League Admin:

* Can invite families by parent email
* Can upload family invite CSVs
* Can resend or cancel invitations
* Can manage family invites, basic family/player records, and exports
* Can view aggregate metrics
* Should not need direct database access

---

### Recommended MVP Auth Model

Use parent-first passwordless auth with admin-sent invitations and child device pairing.

Reasoning:

* Youth app context benefits from parent-managed accounts.
* Parents already need approval permissions.
* It reduces complexity around child email/phone requirements.
* Passwordless email avoids password reset and forgot-password flows.
* Child device pairing lets players use their own devices without child account management.

MVP flow:

1. Admin creates or uploads family invites.
2. Admin sends invitation emails to parents.
3. Parent accepts invite with passwordless email authentication.
4. Parent confirms one or more player profiles.
5. Parent generates a child access link or QR code for each child device as needed.
6. Child opens the paired device link and submits shots under their player profile.
7. Parent approves or edits then approves pending child-device submissions.

Admin flow:

1. Admin accounts are manually assigned in Supabase.
2. Admin role unlocks `/admin`.
3. Admins invite families by manual entry or CSV upload.
4. Admins can later invite other admins if needed.

Future option:

* Add optional 4-digit player PINs after the MVP core loop is validated.
* Add SMS invite or approval notifications after email is working.

---

### Access Control

Use Supabase Row Level Security:

* Parents can read and manage their own profile.
* Parents can read and manage players where `players.parent_profile_id = auth.uid()`.
* Child paired devices can read only the linked player profile and create pending submissions for that player.
* Parents can approve submissions for their own players.
* Parents can revoke child device tokens for their own players.
* Only admins can manage invites, basic family/player records, and exports.
* Public leaderboard reads should expose approved aggregate data only.

---

## 5. Open Questions

1. What grades define elementary versus middle school for Canton Youth Basketball?
2. Should player names appear publicly as first name plus last initial, nickname, or full name?
3. What is the official Canton Bulldogs green hex value?
4. Are official logos or mascot assets available for use in the app icon, badges, and headers?
5. What exact July start and end dates should the first challenge use?
6. What should the parent invitation email copy say?
7. Who should the invite email come from, and what sending domain should Resend use?
8. How long should parent invite links remain valid?
9. Should child device access links expire, or stay valid until revoked by a parent?
10. Should leaderboard ranking be approved baskets only for launch? Recommendation: yes.
11. Does the league need COPPA/privacy copy before launch?
12. Should sound effects be included by default, muted by default, or deferred?
13. After launch, what badge/streak/star rules should be added?

---

## 6. First 10 Implementation Tasks

1. Collect Jessica's page-specific design direction for the next page to build.
2. Document any design gaps, missing states, or asset needs before implementation.
3. Convert approved design decisions into shared theme tokens and reusable component requirements.
4. Create shared mobile app shell components only after the relevant designs confirm navigation, page header, and CTA patterns.
5. Create Supabase and Resend environment setup docs and client/server helpers.
6. Add initial Supabase schema migration for profiles, parent invites, players, child device tokens, challenges, shot submissions, player stats, and email events.
7. Add Row Level Security policies for parent, child-device, admin, and public approved leaderboard reads.
8. Build admin family invite flow with manual entry, CSV preview, send invite, resend invite, copy link, and cancel invite.
9. Build parent invite acceptance with passwordless email and player profile confirmation.
10. Build child device pairing, one-card parent approval, and the simple approved-baskets leaderboard before any rewards logic.
