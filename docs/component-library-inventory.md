# Component Library Inventory

This document names the global component library for the Top Dog Hoops front end. Component names are written exactly as they should appear in code.

Launch note: component names for badges, streaks, stars, sponsor management, announcements, suspicious activity, and advanced leaderboard behavior may remain in this inventory for future planning, but they are not required production logic for the first release unless a specific implementation task pulls them forward.

Recommended file pattern:

* Shared UI primitives: `components/ui/<component-name>.tsx`
* App-specific shared components: `components/app/<ComponentName>.tsx`
* Feature components: `components/features/<feature>/<ComponentName>.tsx`

Use this as the naming contract between design files and implementation.

---

## 1. App Shell and Layout

### `AppShell`

Suggested file:

`components/app/AppShell.tsx`

Purpose:

Top-level responsive shell for authenticated app experiences.

Used by:

* Player home
* Parent home
* Admin dashboard

Design needs:

* Mobile-first max-width behavior
* Background treatment
* Safe-area padding
* Optional bottom navigation
* Optional admin/sidebar layout on wider screens

---

### `PageHeader`

Suggested file:

`components/app/PageHeader.tsx`

Purpose:

Reusable page title/header pattern.

Design needs:

* Title
* Optional subtitle
* Optional back button
* Optional primary action
* Optional status badge

---

### `SectionHeader`

Suggested file:

`components/app/SectionHeader.tsx`

Purpose:

Compact heading for sections inside screens.

Design needs:

* Label/title
* Optional action link/button
* Optional supporting text

---

### `PrimaryActionBar`

Suggested file:

`components/app/PrimaryActionBar.tsx`

Purpose:

Sticky or bottom-positioned primary CTA area.

Design needs:

* One primary action
* Optional secondary action
* Disabled/loading state
* Mobile safe-area support

---

### `PlayerBottomNav`

Suggested file:

`components/app/PlayerBottomNav.tsx`

Purpose:

Bottom navigation for child/player device experience.

Design needs:

* Home
* Shots
* Leaderboard
* Badges
* Active route state

---

### `ParentNav`

Suggested file:

`components/app/ParentNav.tsx`

Purpose:

Navigation for parent family and approval experience.

Design needs:

* Family
* Approvals
* Progress/leaderboards
* Active route state

---

### `AdminNav`

Suggested file:

`components/app/AdminNav.tsx`

Purpose:

Navigation for admin tools.

Design needs:

* Dashboard
* Invites
* Families
* Challenges
* Sponsors
* Announcements
* Exports
* Activity

---

## 2. Status, Feedback, and State Components

### `LoadingState`

Suggested file:

`components/app/LoadingState.tsx`

Purpose:

Consistent loading UI.

Design needs:

* Compact inline variant
* Full-page variant
* Message text

---

### `EmptyState`

Suggested file:

`components/app/EmptyState.tsx`

Purpose:

Friendly empty states across app sections.

Design needs:

* Icon/art slot
* Title
* Description
* Optional CTA

---

### `ErrorState`

Suggested file:

`components/app/ErrorState.tsx`

Purpose:

Recoverable error display.

Design needs:

* Title
* Message
* Retry CTA
* Safe, non-technical tone

---

### `SuccessState`

Suggested file:

`components/app/SuccessState.tsx`

Purpose:

Confirmation for completed actions.

Design needs:

* Title
* Message
* Optional next action
* Celebration but not overdone

---

### `StatusBadge`

Suggested file:

`components/app/StatusBadge.tsx`

Purpose:

Generic reusable status pill.

Design needs:

* Variants: `default`, `success`, `warning`, `danger`, `muted`, `gold`
* Label text
* Optional icon

---

### `PendingApprovalBadge`

Suggested file:

`components/features/approvals/PendingApprovalBadge.tsx`

Purpose:

Specific badge for shot submissions waiting on parent approval.

Design needs:

* Player-friendly variant
* Parent/admin variant

---

## 3. Brand and Progress Components

### `ScoreboardCard`

Suggested file:

`components/app/ScoreboardCard.tsx`

Purpose:

Arcade-inspired card for scores, ranks, and totals.

Design needs:

* Label
* Primary number/value
* Optional supporting metric
* Dark/arcade treatment

---

### `ProgressMeter`

Suggested file:

`components/app/ProgressMeter.tsx`

Purpose:

Reusable progress bar/meter.

Design needs:

* Current value
* Goal value
* Label
* Percentage
* Achievement/gold variant

---

### `CommunityGoalCard`

Suggested file:

`components/features/progress/CommunityGoalCard.tsx`

Purpose:

Shows shared community progress, such as 187,423 / 250,000 shots.

Design needs:

* Goal title
* Current total
* Target total
* Progress meter
* Cooperative/team tone

---

### `StarsCounter`

Suggested file:

`components/features/rewards/StarsCounter.tsx`

Purpose:

Displays star currency.

Design needs:

* Total stars
* Earned-this-session variant
* Icon treatment

---

### `StreakBadge`

Suggested file:

`components/features/rewards/StreakBadge.tsx`

Purpose:

Shows current streak.

Design needs:

* Day count
* Active/on-fire state
* At-risk state
* Empty/new state

---

### `RankSummaryCard`

Suggested file:

`components/features/leaderboards/RankSummaryCard.tsx`

Purpose:

Compact display of current player rank and catch-up message.

Design needs:

* Current rank
* Division
* Movement indicator
* Message like `8 SHOTS TO CATCH MIA`

---

## 4. Player Profile and Family Components

### `PlayerCard`

Suggested file:

`components/features/family/PlayerCard.tsx`

Purpose:

Reusable player summary card.

Design needs:

* Player name
* Division
* Grade
* Current status
* CTA slot
* Pending approval indicator

---

### `PlayerAvatar`

Suggested file:

`components/features/family/PlayerAvatar.tsx`

Purpose:

Reusable visual identity for a player.

Design needs:

* Initials fallback
* Optional avatar image
* Team/mascot-friendly style

---

### `FamilySummaryCard`

Suggested file:

`components/features/family/FamilySummaryCard.tsx`

Purpose:

Parent-facing family summary.

Design needs:

* Parent name/email
* Player count
* Pending approvals count
* Setup status

---

### `PlayerProfilePreviewCard`

Suggested file:

`components/features/family/PlayerProfilePreviewCard.tsx`

Purpose:

Shows invited player profile before parent confirms it.

Design needs:

* Player first name
* Last initial
* Grade
* Gender
* Division
* Confirm CTA

---

## 5. Invitation and Pairing Components

### `InviteStatusBadge`

Suggested file:

`components/features/invites/InviteStatusBadge.tsx`

Purpose:

Displays parent invite status.

Variants:

* `draft`
* `sent`
* `accepted`
* `expired`
* `cancelled`

---

### `InviteTable`

Suggested file:

`components/features/invites/InviteTable.tsx`

Purpose:

Admin list/table for family invitations.

Design needs:

* Parent email
* Player name
* Division
* Status
* Last sent
* Row actions
* Mobile card layout
* Desktop table layout

---

### `InviteRowActions`

Suggested file:

`components/features/invites/InviteRowActions.tsx`

Purpose:

Actions for a family invite.

Actions:

* Send
* Resend
* Copy link
* Cancel

---

### `InviteManualForm`

Suggested file:

`components/features/invites/InviteManualForm.tsx`

Purpose:

Admin form for adding one family invite.

Fields:

* Parent email
* Parent name
* Player first name
* Player last initial
* Grade
* Gender
* Division

---

### `CsvUploadDropzone`

Suggested file:

`components/features/invites/CsvUploadDropzone.tsx`

Purpose:

CSV upload entry for family invites.

Design needs:

* Drop zone
* Browse files CTA
* Required columns hint
* File selected state
* Error state

---

### `InviteImportPreviewTable`

Suggested file:

`components/features/invites/InviteImportPreviewTable.tsx`

Purpose:

Preview and validate rows from CSV invite import.

Design needs:

* Valid row state
* Row error state
* Error summary
* Import/send CTA

---

### `ChildDeviceSetupCard`

Suggested file:

`components/features/pairing/ChildDeviceSetupCard.tsx`

Purpose:

Parent-facing explanation and controls for child device pairing.

Design needs:

* Player name
* Safety explanation
* Generate link CTA
* Copy/share CTA
* Revoke/regenerate CTA

---

### `PairingQrCodeCard`

Suggested file:

`components/features/pairing/PairingQrCodeCard.tsx`

Purpose:

Displays QR code and access link for child device pairing.

Design needs:

* QR code
* Short instructions
* Copy link
* Link copied state

---

### `PairedDeviceList`

Suggested file:

`components/features/pairing/PairedDeviceList.tsx`

Purpose:

Shows active child device access grants.

Design needs:

* Device label
* Last used
* Revoke action
* Empty state

---

### `PairingSuccessCard`

Suggested file:

`components/features/pairing/PairingSuccessCard.tsx`

Purpose:

Child-facing success state after device pairing.

Design needs:

* Player name
* Start CTA
* Encouraging tone

---

## 6. Shot Entry Components

### `ArcadeScoreDisplay`

Suggested file:

`components/features/shots/ArcadeScoreDisplay.tsx`

Purpose:

Large arcade-style score display starting at `000`.

Design needs:

* Three-digit formatting
* Large numeric treatment
* Scoreboard/arcade styling

---

### `ScoreIncrementButton`

Suggested file:

`components/features/shots/ScoreIncrementButton.tsx`

Purpose:

Large touch target for `+1`, `+5`, and `+10`.

Design needs:

* Amount label
* Press feedback
* Disabled state

---

### `ScoreIncrementGrid`

Suggested file:

`components/features/shots/ScoreIncrementGrid.tsx`

Purpose:

Layout wrapper for score increment buttons.

Design needs:

* Three equal buttons
* Mobile-first spacing

---

### `FriendBonusToggle`

Suggested file:

`components/features/shots/FriendBonusToggle.tsx`

Purpose:

Checkbox/toggle for `Shot With A Friend (+10)`.

Design needs:

* Checked/unchecked state
* Clear `+10` reward callout
* Child-friendly label

---

### `ShotTotalSummary`

Suggested file:

`components/features/shots/ShotTotalSummary.tsx`

Purpose:

Shows base shots, friend bonus, and total.

Design needs:

* Base shots
* Friend bonus
* Total score
* Parent approval note

---

### `SubmitScoreButton`

Suggested file:

`components/features/shots/SubmitScoreButton.tsx`

Purpose:

Primary CTA for shot submission.

Design needs:

* Enabled state
* Disabled zero-shot state
* Loading/submitting state

---

## 7. Celebration and Rewards Components

### `SubmissionCelebration`

Suggested file:

`components/features/rewards/SubmissionCelebration.tsx`

Purpose:

Coordinates post-submit celebration flow.

Design needs:

* Animation step
* Rewards reveal step
* Reduced-motion mode

---

### `BasketballSwishAnimation`

Suggested file:

`components/features/rewards/BasketballSwishAnimation.tsx`

Purpose:

Basketball-to-hoop animation.

Design needs:

* Basketball launch
* Hoop/swish
* 2-3 second duration
* Reduced-motion fallback

---

### `ScoreTallyAnimation`

Suggested file:

`components/features/rewards/ScoreTallyAnimation.tsx`

Purpose:

Animated scoreboard count-up.

Design needs:

* Start value
* End value
* Arcade number treatment

---

### `RewardRevealCard`

Suggested file:

`components/features/rewards/RewardRevealCard.tsx`

Purpose:

Displays a single reward after submission.

Design needs:

* Icon
* Label
* Value
* Variant: stars, streak, badge, leaderboard

---

### `RewardRevealStack`

Suggested file:

`components/features/rewards/RewardRevealStack.tsx`

Purpose:

Group of rewards after submission.

Design needs:

* Stars earned
* Streak
* Badge progress
* Leaderboard movement

---

### `EncouragementMessage`

Suggested file:

`components/features/rewards/EncouragementMessage.tsx`

Purpose:

Displays rotating coach-style encouragement.

Examples:

* `NOTHING BUT NET`
* `BULLDOG BUCKET`
* `HEATING UP`
* `PRACTICE PAYS OFF`

---

### `BadgeCard`

Suggested file:

`components/features/rewards/BadgeCard.tsx`

Purpose:

Sports-card-inspired badge display.

Design needs:

* Earned state
* Locked state
* Progress state
* Badge artwork/icon
* Badge name

---

### `BadgeGrid`

Suggested file:

`components/features/rewards/BadgeGrid.tsx`

Purpose:

Grid/list of player badges.

Design needs:

* Earned group
* Locked group
* Empty state

---

### `BadgeDetailSheet`

Suggested file:

`components/features/rewards/BadgeDetailSheet.tsx`

Purpose:

Badge detail modal/sheet.

Design needs:

* Badge name
* Description
* Progress
* Earned date if earned

---

## 8. Approval Components

### `ApprovalCard`

Suggested file:

`components/features/approvals/ApprovalCard.tsx`

Purpose:

One-card parent approval decision.

Design needs:

* Player name
* Date
* Submitted shots
* Friend bonus
* Submission time
* Primary CTA
* Edit action

---

### `ApprovalQueueList`

Suggested file:

`components/features/approvals/ApprovalQueueList.tsx`

Purpose:

List of pending approvals for parent.

Design needs:

* Empty state
* One item
* Multiple items
* Player grouping if useful

---

### `ApprovalQueueItem`

Suggested file:

`components/features/approvals/ApprovalQueueItem.tsx`

Purpose:

Compact pending approval row/card.

Design needs:

* Player name
* Shot total
* Date/time
* Friend bonus marker
* Review CTA

---

### `ApprovalEditSheet`

Suggested file:

`components/features/approvals/ApprovalEditSheet.tsx`

Purpose:

Inline edit-before-approve experience.

Design needs:

* Original submitted total
* Editable total
* Stepper/numeric input
* Approve edited CTA
* Cancel/back action
* Error state

---

### `ApprovalSuccessCard`

Suggested file:

`components/features/approvals/ApprovalSuccessCard.tsx`

Purpose:

Confirmation after parent approves.

Design needs:

* Player name
* Approved total
* Leaderboard update note
* Next action

---

## 9. Leaderboard Components

### `LeaderboardTabs`

Suggested file:

`components/features/leaderboards/LeaderboardTabs.tsx`

Purpose:

Period selection for leaderboards.

Tabs:

* Daily
* Weekly
* Monthly
* All Time

---

### `DivisionTabs`

Suggested file:

`components/features/leaderboards/DivisionTabs.tsx`

Purpose:

Division selection.

Tabs:

* Boys Elementary
* Boys Middle School
* Girls Elementary
* Girls Middle School
* Overall

---

### `LeaderboardCard`

Suggested file:

`components/features/leaderboards/LeaderboardCard.tsx`

Purpose:

Scoreboard-inspired leaderboard container.

Design needs:

* Period label
* Division label
* Rows
* Empty/loading states

---

### `LeaderboardRow`

Suggested file:

`components/features/leaderboards/LeaderboardRow.tsx`

Purpose:

One leaderboard entry.

Design needs:

* Rank
* Player name
* Division/grade optional
* Approved baskets
* Current player highlight
* Top 5 prize zone variant

---

### `RankMovementCallout`

Suggested file:

`components/features/leaderboards/RankMovementCallout.tsx`

Purpose:

Shows movement after a submission.

Examples:

* `YOU MOVED UP 3 SPOTS`
* `#12 TO #9`
* `8 SHOTS TO CATCH MIA`

---

## 10. Admin Components

### `AdminMetricGrid`

Suggested file:

`components/features/admin/AdminMetricGrid.tsx`

Purpose:

Grid of admin overview metrics.

Design needs:

* Total participants
* Active participants
* Total approved baskets
* Pending approvals
* Invite status summary
* Suspicious activity count

---

### `AdminMetricCard`

Suggested file:

`components/features/admin/AdminMetricCard.tsx`

Purpose:

One admin dashboard metric.

Design needs:

* Label
* Value
* Optional trend/status
* Optional icon

---

### `AdminQuickLinkGrid`

Suggested file:

`components/features/admin/AdminQuickLinkGrid.tsx`

Purpose:

Quick navigation to admin tools.

Design needs:

* Invites
* Families
* Exports
* Sponsors
* Announcements
* Suspicious activity

---

### `FamilyTable`

Suggested file:

`components/features/admin/FamilyTable.tsx`

Purpose:

Admin view of parent/player relationships.

Design needs:

* Parent
* Player
* Division
* Invite status
* Active status
* Child device paired indicator
* Row action

---

### `ChallengeSettingsForm`

Suggested file:

`components/features/admin/ChallengeSettingsForm.tsx`

Purpose:

Admin form for challenge settings.

Fields:

* Challenge name
* Start date
* End date
* Community goal baskets
* Active status

---

### `SponsorCard`

Suggested file:

`components/features/sponsors/SponsorCard.tsx`

Purpose:

Display sponsor in public and admin contexts.

Design needs:

* Logo
* Name
* Optional website link
* Active/inactive admin state

---

### `SponsorForm`

Suggested file:

`components/features/sponsors/SponsorForm.tsx`

Purpose:

Admin add/edit sponsor form.

Fields:

* Sponsor name
* Logo upload/url
* Website URL
* Active status
* Sort order

---

### `AnnouncementForm`

Suggested file:

`components/features/admin/AnnouncementForm.tsx`

Purpose:

Admin announcement composer.

Fields:

* Title
* Body
* Audience
* Send email

---

### `SuspiciousActivityTable`

Suggested file:

`components/features/admin/SuspiciousActivityTable.tsx`

Purpose:

Admin review list for suspicious activity flags.

Design needs:

* Flag type
* Player
* Submission total
* Severity
* Details
* Review/dismiss actions

---

### `ExportControls`

Suggested file:

`components/features/admin/ExportControls.tsx`

Purpose:

Controls for admin CSV/Google Sheets-compatible exports.

Design needs:

* Export participants
* Export submissions
* Export leaderboard results
* Export badge counts
* Generating/download states

---

## 11. Form Components

These can wrap or compose shadcn/ui primitives.

### `FormField`

Suggested file:

`components/app/FormField.tsx`

Purpose:

Shared label, help text, error text wrapper.

---

### `EmailInput`

Suggested file:

`components/app/EmailInput.tsx`

Purpose:

Email input used for parent invites and passwordless email.

---

### `MagicLinkRequestForm`

Suggested file:

`components/features/auth/MagicLinkRequestForm.tsx`

Purpose:

Parent-facing form for requesting a one-tap passwordless email link.

Design needs:

* Email input
* Send magic link CTA
* Sending state
* Sent state
* Invalid email state
* No invite/account found state

---

### `NumberStepper`

Suggested file:

`components/app/NumberStepper.tsx`

Purpose:

Large touch-friendly numeric adjustment.

Used by:

* Approval edit
* Shot entry if needed

---

### `DivisionSelect`

Suggested file:

`components/features/family/DivisionSelect.tsx`

Purpose:

Select division.

Options:

* Boys Elementary
* Boys Middle School
* Girls Elementary
* Girls Middle School

---

### `GradeSelect`

Suggested file:

`components/features/family/GradeSelect.tsx`

Purpose:

Select player grade.

---

### `GenderSelect`

Suggested file:

`components/features/family/GenderSelect.tsx`

Purpose:

Select player gender for division assignment.

Options:

* Boy
* Girl

---

## 12. Email Components / Templates

These may live outside React app UI, but design names should match.

### `ParentInviteEmail`

Purpose:

Invitation email for parent.

Required CTA:

`Join Top Dog Hoops`

---

### `ApprovalRequestEmail`

Purpose:

Email asking parent to approve a child submission.

Required CTA:

`Approve Shots`

---

### `ApprovalReminderEmail`

Purpose:

Reminder email for pending approval.

Required CTA:

`Review Submission`

---

### `AnnouncementEmail`

Purpose:

League/admin announcement email.

---

## 13. Suggested Build Order for Component Library

1. `AppShell`
2. `PageHeader`
3. `PrimaryActionBar`
4. `StatusBadge`
5. `LoadingState`
6. `EmptyState`
7. `ErrorState`
8. `PlayerCard`
9. `InviteStatusBadge`
10. `InviteTable`
11. `InviteManualForm`
12. `CsvUploadDropzone`
13. `InviteImportPreviewTable`
14. `MagicLinkRequestForm`
15. `PlayerProfilePreviewCard`
16. `ChildDeviceSetupCard`
17. `PairingQrCodeCard`
18. `PairingSuccessCard`
19. `ScoreboardCard`
20. `ArcadeScoreDisplay`
21. `ScoreIncrementGrid`
22. `FriendBonusToggle`
23. `ShotTotalSummary`
24. `SubmissionCelebration`
25. `ApprovalCard`
26. `ApprovalEditSheet`
27. `CommunityGoalCard`
28. `StarsCounter`
29. `StreakBadge`
30. `LeaderboardCard`
31. `BadgeCard`
