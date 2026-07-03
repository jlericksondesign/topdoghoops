# Screen Inventory for Design Files

This document itemizes the screens needed for the MVP so design files can represent the full front-end experience. It should be used alongside `/docs/product-spec.md`, `/docs/brand.md`, `/docs/auth-invite-approval-plan.md`, and `/docs/frontend-design-handoff.md`.

Design priority: mobile-first. Desktop/tablet can be responsive extensions unless a screen is admin-heavy.

Launch simplification:

* Required for initial release: onboarding, parent invite acceptance, child device pairing, player home, daily shot entry, parent approval, simple leaderboard, and minimal admin invites/exports.
* Placeholder-only for initial release: badges, streaks, stars, and leaderboard movement.
* Post-launch unless explicitly pulled forward: sponsor management, announcements, suspicious activity review, and advanced leaderboard filters.

---

## 1. Public and Entry Screens

### 1.1 App Landing / Role Redirect

Route:

* `/`

Primary users:

* Parent
* Player on paired device
* Admin

Purpose:

Route the user to the right experience based on session/access type.

Required features:

* App identity and brand signal
* Detect parent session, admin session, or child paired-device session
* Send player device to player home
* Send parent to family home or approval queue if pending items exist
* Send admin to admin dashboard
* `Accept Invite` CTA for parents opening from an invitation
* `Sign In As Parent` CTA for parents opening the app directly

Required states:

* Loading
* Recognized parent
* Recognized admin
* Recognized paired child device
* Unknown visitor
* Invalid or expired session

Design notes:

* Should feel like the app opening, not a marketing page.
* Keep choices minimal.

---

### 1.2 Parent Link Request

Route:

* `/parent/link-request`

Primary user:

* Parent

Purpose:

Let a parent who opens the app directly request a fresh one-tap magic link by email.

Required features:

* App header/brand bar
* Title: `Confirm Your Email`
* Short explanation that a one-tap sign-in link will be sent
* Email input
* Primary CTA: `Send Magic Link`
* Back action

Required states:

* Empty email
* Invalid email
* Sending
* Magic link sent
* No invite/account found for email
* Error

Design notes:

* This is not account creation.
* Keep language passwordless and invitation-first.

---

### 1.3 Parent Passwordless Email Check

Route:

* `/auth/confirm`

Primary user:

* Parent

Purpose:

Handle passwordless email confirmation and return the parent to the right next step.

Required features:

* Confirmation/loading state
* Success message
* Error recovery for expired/invalid link
* Return destination support, such as invite acceptance or approval card

Required states:

* Verifying
* Verified
* Expired link
* Invalid link
* Resend email needed

Design notes:

* This should be quiet and reassuring.
* Do not make it feel like account management.

---

## 2. Parent Invitation and Family Setup

### 2.1 Parent Invite Acceptance

Route:

* `/invite/accept?token=...`

Primary user:

* Parent

Purpose:

Let a parent accept an admin-sent family invitation.

Required features:

* Welcome message
* Parent email shown
* Player profile preview
* CTA to continue with passwordless email if needed
* CTA to accept if parent is already recognized
* Expired/cancelled invite handling

Required states:

* Valid invite, parent not verified
* Valid invite, parent already verified
* Invite accepted
* Expired invite
* Cancelled invite
* Invite already accepted

Design notes:

* One clear CTA.
* Copy should feel like joining the team, not creating an account.

---

### 2.2 Parent Family Confirmation

Route:

* `/family`

Primary user:

* Parent

Purpose:

Let parent confirm invited player profile(s) and see their family setup.

Required features:

* Parent name/email summary
* Player profile cards
* Confirm player profile CTA
* Add another child option, if enabled
* Pending approval shortcut
* Set up child device CTA per player

Required states:

* One player
* Multiple players
* Player pending confirmation
* Player active
* No players
* Pending approvals exist

Design notes:

* This is the parent's hub.
* Avoid a heavy settings/account-management feel.

---

### 2.3 Child Device Setup

Route:

* `/family/[playerId]/device-setup`

Primary user:

* Parent

Purpose:

Let parent pair a child's personal device without creating a child account.

Required features:

* Player name
* Explanation of child device access
* Generate access link
* QR code display
* Copy link
* Send/share link affordance
* Revoke/regenerate access
* List of active paired devices, if available

Required states:

* No active token
* Active token generated
* Link copied
* Token revoked
* Token regenerated
* Error generating token

Design notes:

* Parent should understand this is safe: child can submit shots, not approve or manage.
* Keep the QR/link presentation simple.

---

### 2.4 Child Pairing Acceptance

Route:

* `/pair/[token]`

Primary user:

* Player

Purpose:

Pair the child's device to a player profile and land them in the player experience.

Required features:

* Player name confirmation
* Team/app identity
* CTA to start
* Store paired-device session
* Error for invalid/revoked token

Required states:

* Valid pairing token
* Pairing complete
* Invalid token
* Revoked token
* Expired token, if expiration is enabled

Design notes:

* Very child-friendly.
* No email, password, or account language.

---

## 3. Player-Facing Screens

### 3.1 Player Home Dashboard

Route:

* `/player`
* Or `/` when opened from a paired child device

Primary user:

* Player

Purpose:

Show today's status and motivate the player to submit shots.

Required features:

* Player name
* Today's submission status
* Current streak
* Current stars
* Next badge progress
* Community goal progress
* Leaderboard rank
* Primary CTA: `SUBMIT TODAY'S SHOTS`
* Pending parent approval notice when applicable

Required states:

* No submission today
* Submission pending parent approval
* Submission approved today
* Streak active
* Streak at risk
* Loading
* Error

Design notes:

* Progress everywhere.
* One dominant action.
* This should feel encouraging, competitive, and quick.

---

### 3.2 Daily Shot Entry

Route:

* `/player-entry`

Primary user:

* Player

Purpose:

Let player submit today's made baskets.

Required features:

* Today's date shown automatically
* No date picker
* Arcade-style score display starting at `000`
* `+1`, `+5`, `+10` buttons
* Optional `Shot With A Friend (+10)` checkbox
* Running total with friend bonus
* Primary CTA: `SUBMIT SCORE`
* Parent approval expectation

Required states:

* Zero shots, submit disabled
* Score in progress
* Friend bonus selected
* Submitting
* Already submitted today
* Error

Design notes:

* Big touch targets.
* Minimal typing.
* The screen should feel like entering a high score.

---

### 3.3 Submission Celebration

Route:

* Can be part of `/player-entry` after submit

Primary user:

* Player

Purpose:

Make submission feel rewarding before the approval/pending state.

Required features:

* Basketball-to-hoop animation
* Swish moment
* Scoreboard tally animation
* Confirmation: `+17 SHOTS RECORDED`
* Stars earned placeholder/real value
* Streak placeholder/real value
* Badge progress placeholder/real value
* Leaderboard movement placeholder/real value
* Random encouragement message

Required states:

* Animation in progress
* Reduced-motion fallback
* Rewards reveal
* Pending parent approval message

Design notes:

* 2-3 seconds total.
* Fun, responsive, celebratory.
* Avoid long animations.

---

### 3.4 Badges

Route:

* `/badges`

Primary user:

* Player

Purpose:

Show earned and locked Bulldog Badges.

Required features:

* Earned badge cards
* Locked badge cards
* Progress toward next badge
* Badge detail modal/sheet
* Badge names like First Shot, Hot Streak, Iron Bulldog, 100 Club, Top Dog

Required states:

* No badges earned
* Some badges earned
* Badge just unlocked
* Loading
* Error

Design notes:

* Sports-card-inspired.
* Earned badges should feel prestigious.

---

### 3.5 Player Progress

Route:

* `/player/progress`

Primary user:

* Player
* Parent

Purpose:

Show personal progress over the challenge.

Required features:

* Total approved baskets
* Current streak
* Longest streak
* Stars total
* Badge progress
* Recent submissions
* Approval status per recent submission

Required states:

* New player/no approved shots
* Active player with history
* Pending submissions
* Loading
* Error

Design notes:

* Make improvement visible.
* Avoid spreadsheet-like history.

---

### 3.6 Leaderboards

Route:

* `/leaderboards`

Primary users:

* Player
* Parent

Purpose:

Show competition by time period and division.

Required features:

* Period tabs: Daily, Weekly, Monthly, All Time
* Division tabs: Boys Elementary, Boys Middle School, Girls Elementary, Girls Middle School, Overall
* Player rank rows
* Current player's rank highlight
* Top 5 prize zone treatment
* Approved submissions only

Required states:

* Empty leaderboard
* Loading
* Error
* Current player ranked
* Current player not ranked yet

Design notes:

* Retro arcade scoreboard feel.
* Primary divisions should receive visual priority.

---

## 4. Parent-Facing Screens

### 4.1 Parent Home / Approval Queue

Route:

* `/parent-approval`

Primary user:

* Parent

Purpose:

Show pending child submissions and family status.

Required features:

* Pending approval list
* Player cards for multiple children
* Shortcut to child device setup
* Recent approved submissions
* Empty state when no approvals are pending

Required states:

* No pending approvals
* One pending approval
* Multiple pending approvals
* Multiple children
* Loading
* Error

Design notes:

* Plain, trustworthy, and fast.
* Avoid making approval feel punitive.

---

### 4.2 One-Card Parent Approval

Route:

* `/parent-approval/[submissionId]`
* Or direct approval card from notification link

Primary user:

* Parent

Purpose:

Let parent approve a child submission with one primary action.

Required features:

* Player name
* Date
* Submitted shots
* Friend bonus indicator
* Submission time
* Primary CTA: `APPROVE +47 SHOTS`
* Secondary action: `Edit before approving`

Required states:

* Ready to approve
* Approved
* Already approved
* Submission no longer available
* Parent needs passwordless verification
* Loading
* Error

Design notes:

* One card, one decision.
* This is one of the most important simplicity screens.

---

### 4.3 Parent Edit Then Approve

Route:

* Can be a sheet/modal inside `/parent-approval/[submissionId]`

Primary user:

* Parent

Purpose:

Let parent adjust an inaccurate total before approving.

Required features:

* Original submitted total
* Editable total with stepper or numeric input
* Friend bonus visibility
* Updated CTA: `APPROVE 42 SHOTS`
* Audit note implied: edited from original to final
* Cancel/back to approval card

Required states:

* Editing
* Invalid value
* Saving
* Approved after edit
* Error

Design notes:

* Keep inline and minimal.
* No rejection flow for MVP unless explicitly added later.

---

## 5. Admin Screens

### 5.1 Admin Dashboard

Route:

* `/admin`

Primary user:

* League Admin

Purpose:

Give admins a clear operational overview.

Required features:

* Total participants
* Active participants
* Total approved baskets
* Community goal progress
* Pending approvals count
* Invite status summary
* Suspicious activity count
* Quick links to invites, exports, sponsors, announcements

Required states:

* Normal dashboard
* Empty/new challenge
* Loading
* Error

Design notes:

* Can be denser than player screens but should still be mobile-friendly.

---

### 5.2 Admin Family Invites

Route:

* `/admin/invites`

Primary user:

* League Admin

Purpose:

Create, send, track, resend, copy, and cancel parent invitations.

Required features:

* Invite table/list
* Status badges: Draft, Sent, Accepted, Expired, Cancelled
* Search/filter by parent email, player, status, division
* Manual add family CTA
* CSV upload CTA
* Send invites
* Resend invite
* Copy invite link
* Cancel invite

Required states:

* No invites
* Draft invites
* Sent invites
* Accepted invites
* Import errors
* Sending
* Send failed

Design notes:

* This is probably the most important admin MVP screen.
* Make status very scannable.

---

### 5.3 Admin Manual Invite Form

Route:

* `/admin/invites/new`
* Or modal/sheet from `/admin/invites`

Primary user:

* League Admin

Purpose:

Add one family invitation manually.

Required features:

* Parent email
* Parent name optional
* Player first name
* Player last initial
* Grade
* Gender
* Division
* Save draft
* Send invite

Required states:

* Empty form
* Validation errors
* Saving
* Saved draft
* Sent
* Send failed

Design notes:

* Keep this utilitarian and quick.

---

### 5.4 Admin CSV Invite Import

Route:

* `/admin/invites/import`

Primary user:

* League Admin

Purpose:

Upload and preview family invite CSVs.

Required features:

* CSV upload/drop zone
* Required column instructions
* Preview table
* Row validation
* Error summary
* Import valid rows
* Send invites after import

Required states:

* Awaiting upload
* File selected
* Preview valid
* Preview with row errors
* Importing
* Imported
* Import failed

Design notes:

* Make the expected CSV format obvious.

---

### 5.5 Admin Users / Families

Route:

* `/admin/families`

Primary user:

* League Admin

Purpose:

Review parent/player relationships and participation.

Required features:

* Parent list
* Player list
* Division and grade
* Invite/acceptance status
* Active/inactive status
* Child device paired indicator
* Link to resend invite or manage family

Required states:

* No families
* Active families
* Pending invited families
* Loading
* Error

Design notes:

* Operational, not celebratory.

---

### 5.6 Admin Challenge Settings

Route:

* `/admin/challenges`

Primary user:

* League Admin

Purpose:

Manage current and future challenge windows.

Required features:

* Challenge name
* Start date
* End date
* Community goal baskets
* Active/inactive status
* Future challenge setup

Required states:

* Current active challenge
* No active challenge
* Editing
* Saving
* Error

Design notes:

* This can be simple for MVP.

---

### 5.7 Admin Sponsors

Route:

* `/admin/sponsors`

Primary user:

* League Admin

Purpose:

Manage sponsor section content.

Required features:

* Sponsor list
* Logo
* Name
* Optional website link
* Active/inactive
* Sort order
* Add/edit sponsor

Required states:

* No sponsors
* Sponsor list
* Editing
* Saving
* Error

Design notes:

* Sponsor display itself can be modest in MVP.

---

### 5.8 Admin Announcements

Route:

* `/admin/announcements`

Primary user:

* League Admin

Purpose:

Send announcement messages.

Required features:

* Announcement title
* Announcement body
* Audience selection
* Email send option
* Draft/send state
* Sent history

Required states:

* Empty
* Drafting
* Sending
* Sent
* Send failed

Design notes:

* MVP can be email-only.

---

### 5.9 Admin Suspicious Activity

Route:

* `/admin/suspicious-activity`

Primary user:

* League Admin

Purpose:

Review non-blocking suspicious activity flags.

Required features:

* Flag list
* Flag type
* Player name
* Submission total
* Details
* Severity
* Mark reviewed
* Dismiss

Required states:

* No flags
* Open flags
* Reviewed flags
* Loading
* Error

Design notes:

* Flags do not block participation.
* Avoid making this feel accusatory.

---

### 5.10 Admin Exports

Route:

* `/admin/exports`

Primary user:

* League Admin

Purpose:

Export league and challenge data.

Required features:

* Export participants
* Export submissions
* Export leaderboard results
* Export badge counts
* CSV format
* Google Sheets-compatible format

Required states:

* Ready
* Generating
* Download ready
* Export failed

Design notes:

* Simple utility screen.

---

## 6. Sponsor and Shared Public Screens

### 6.1 Sponsors

Route:

* `/sponsors`
* Or section inside home/leaderboards

Primary users:

* Player
* Parent

Purpose:

Show sponsor support and optional links.

Required features:

* Sponsor logo
* Sponsor name
* Optional website link

Required states:

* Sponsor list
* No sponsors
* Loading

Design notes:

* No additional sponsor placements required for MVP.

---

## 7. Required Email Designs

These are not app screens, but they should be represented in design files or copy docs.

### 7.1 Parent Invitation Email

Purpose:

Invite parent to join the challenge.

Required content:

* App/team identity
* Parent greeting
* Player name
* CTA: `Join Top Dog Hoops`
* Expiration note if applicable

---

### 7.2 Parent Approval Request Email

Purpose:

Prompt parent to approve a child submission.

Required content:

* Player name
* Submitted shot total
* Friend bonus if selected
* CTA: `Approve Shots`

---

### 7.3 Approval Reminder Email

Purpose:

Remind parent about pending approval.

Required content:

* Player name
* Pending shot total
* CTA: `Review Submission`

---

### 7.4 Announcement Email

Purpose:

Send league/admin announcement.

Required content:

* Announcement title
* Announcement body
* Team/app identity

---

## 8. Global Components and States to Design

### Navigation

Needed patterns:

* Player bottom navigation
* Parent navigation
* Admin navigation
* Back button/header pattern
* Active route state

### Feedback

Needed patterns:

* Loading state
* Empty state
* Error state
* Success confirmation
* Toast/snackbar
* Disabled CTA
* Pending approval badge

### Data Display

Needed patterns:

* Scoreboard card
* Progress bar
* Stars counter
* Streak badge
* Badge card
* Leaderboard row
* Invite status badge
* Player card
* Approval card

### Forms

Needed patterns:

* Large numeric stepper
* Checkbox/toggle
* Email input
* CSV upload/drop zone
* Select/dropdown for division, grade, gender
* Validation message

### Motion

Needed patterns:

* Basketball-to-hoop swish
* Score tally
* Badge unlock
* Reward reveal
* Reduced-motion fallback

---

## 9. MVP Screen Priority

Design first:

1. Admin family invites
2. Parent invite acceptance
3. Parent family confirmation
4. Child device setup
5. Child pairing acceptance
6. Player home dashboard
7. Daily shot entry
8. Submission celebration
9. One-card parent approval
10. Parent edit then approve

Design second:

11. Leaderboards
12. Badges
13. Player progress
14. Admin dashboard
15. Admin families
16. Sponsors

Design later if time allows:

17. Admin challenge settings
18. Admin announcements
19. Admin suspicious activity
20. Admin exports
21. Email templates
