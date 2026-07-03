# Screen User Stories for Design

This is the lightweight design companion to `/docs/screen-inventory.md`. Each story says who arrives, what they should see, and what the UI needs to help them do.

Launch note: for the first release, badges, streaks, stars, and leaderboard movement are placeholder-only. The required launch experience is invite onboarding, child device pairing, daily shot submission, parent approval, simple approved-baskets leaderboard, community progress, and minimal admin invite/export tools.

---

## Core Onboarding and Access

### App Landing / Role Redirect

A visitor opens the app and sees the Top Dog Hoops identity while the app figures out whether they are an admin, parent, or paired child device. If recognized, they are sent into the right experience; if not, they can either accept an invitation or sign in as a parent by requesting a fresh email link.

UI needs:

* Brand/app identity
* Brief loading/redirect state
* `Accept Invite` CTA
* `Sign In As Parent` CTA
* Error state for invalid or expired access

---

### Parent Link Request

A parent opens the app directly instead of using their email link and chooses Sign In As Parent. They see a simple email screen that sends them a fresh one-tap magic link with no password needed.

UI needs:

* App header/brand bar
* `Confirm Your Email` title
* Short passwordless explanation
* Email input
* `Send Magic Link` CTA
* Back action
* Magic link sent, invalid email, no invite/account found, and error states

---

### Parent Invite Acceptance

A parent clicks the invitation email and lands on a welcome screen showing the child they were invited to manage. They confirm this is their family and continue with passwordless email if needed.

UI needs:

* Welcome message
* Parent email
* Child/player preview
* One primary CTA to accept/continue
* Expired, cancelled, or already accepted invite state

---

### Parent Passwordless Email Check

A parent returns from a passwordless email link and sees a quiet confirmation screen while the app verifies them. Once verified, they are taken back to the invite, family setup, or approval they came from.

UI needs:

* Verifying state
* Success state
* Expired/invalid link recovery
* Resend email option

---

### Parent Family Confirmation

A parent enters their family area and sees their invited child profile(s). They confirm each player, see any pending approvals, and can set up a child device.

UI needs:

* Parent summary
* Player cards
* Confirm profile CTA
* Pending approvals shortcut
* Set up child device CTA
* Empty/no players state

---

### Child Device Setup

A parent chooses a player and sees a simple setup screen explaining that the child can submit shots from their own device but cannot approve or manage anything. The parent can generate a QR code/link, copy or share it, and revoke it later.

UI needs:

* Player name
* Safety explanation
* Generate link button
* QR code/link display
* Copy/share actions
* Revoke/regenerate actions
* Link copied and error states

---

### Child Pairing Acceptance

A child opens the pairing link on their own device and sees a friendly confirmation that this device is now connected to their player profile. They tap one button to start using the app.

UI needs:

* Player name confirmation
* App/team identity
* Start CTA
* Invalid/revoked/expired link state

---

## Player Experience

### Player Home Dashboard

A player opens the app and immediately sees whether they have submitted shots today, how their streak/stars/badges are progressing, where they stand, and one big CTA to submit today's shots.

UI needs:

* Player name
* Today's submission status
* Streak
* Stars
* Next badge progress
* Community goal progress
* Leaderboard rank
* Primary `SUBMIT TODAY'S SHOTS` CTA
* Pending parent approval notice

---

### Daily Shot Entry

A player taps submit shots and lands on a fast, fun score-entry screen for today's date only. They add made baskets with big buttons, optionally mark Shot With A Friend, and submit the score.

UI needs:

* Today's date
* Arcade score display starting at `000`
* `+1`, `+5`, `+10` buttons
* Shot With A Friend toggle/checkbox
* Running total
* Parent approval note
* `SUBMIT SCORE` CTA
* Disabled zero-shot state

---

### Submission Celebration

After submitting, the player sees a short basketball-to-hoop swish moment, then a reward reveal showing shots recorded, stars, streak, badge progress, and leaderboard movement.

UI needs:

* Swish animation
* Score tally
* Confirmation message
* Stars earned
* Streak result
* Badge progress
* Leaderboard movement
* Pending parent approval message
* Reduced-motion fallback

---

### Badges

A player visits badges and sees which Bulldog Badges they have earned, which are locked, and what they are working toward next.

UI needs:

* Earned badge cards
* Locked badge cards
* Next badge progress
* Badge detail view
* Empty/new player state

---

### Player Progress

A player or parent opens progress and sees the player's total approved baskets, streaks, stars, badges, and recent submissions without feeling like they are looking at a spreadsheet.

UI needs:

* Total approved baskets
* Current and longest streak
* Stars total
* Badge progress
* Recent submissions
* Approval status labels
* New player state

---

### Leaderboards

A player or parent opens leaderboards and sees ranking by division and time period. The current player is easy to find, and the top prize zone feels exciting.

UI needs:

* Time period tabs
* Division tabs
* Leaderboard rows
* Current player highlight
* Top 5 prize zone treatment
* Empty/loading states

---

## Parent Experience

### Parent Home / Approval Queue

A parent opens the app and sees whether any child submissions need approval. If nothing is pending, they see a calm all-clear state and quick access to family/player setup.

UI needs:

* Pending approval list
* Player cards
* Recent approvals
* Child device setup shortcut
* Empty all-clear state

---

### One-Card Parent Approval

A parent clicks an approval email or opens a pending item and sees one clear card asking them to approve a child's submitted shots. The main action is obvious and fast.

UI needs:

* Player name
* Date
* Submitted shot total
* Friend bonus marker
* Submission time
* `APPROVE +47 SHOTS` CTA
* `Edit before approving` secondary action
* Already approved/unavailable states

---

### Parent Edit Then Approve

A parent notices the submitted total is wrong and opens a small edit view. They adjust the number and approve the corrected total in one flow.

UI needs:

* Original submitted total
* Editable total
* Stepper or numeric input
* Friend bonus visibility
* Updated approve CTA
* Cancel/back action
* Invalid/saving/error states

---

## Admin Experience

### Admin Dashboard

An admin opens the admin area and sees the overall health of the challenge: participation, total approved baskets, community progress, invites, approvals, and anything requiring attention.

UI needs:

* Metric cards
* Community goal summary
* Invite status summary
* Pending approvals count
* Suspicious activity count
* Quick links to admin tools

---

### Admin Family Invites

An admin manages family invitations from one screen. They can see invite status, add a family, upload a CSV, resend invitations, copy links, or cancel invites.

UI needs:

* Invite list/table
* Status badges
* Search/filter controls
* Manual add CTA
* CSV upload CTA
* Row actions: send, resend, copy link, cancel
* Empty and send-failed states

---

### Admin Manual Invite Form

An admin adds one family manually by entering parent and player details, then either saves a draft or sends the invite.

UI needs:

* Parent email
* Parent name
* Player first name
* Player last initial
* Grade
* Gender
* Division
* Save draft CTA
* Send invite CTA
* Validation states

---

### Admin CSV Invite Import

An admin uploads a family CSV, previews the rows, sees any validation problems, and imports/sends valid invites.

UI needs:

* CSV upload/drop zone
* Required column instructions
* Preview table
* Row-level validation
* Error summary
* Import/send CTA

---

### Admin Families

An admin reviews all parent/player relationships and can quickly see which families are active, pending invite acceptance, or missing child device setup.

UI needs:

* Family/player list
* Parent email/name
* Player name
* Division and grade
* Invite status
* Active status
* Child device paired indicator
* Manage/resend action

---

### Admin Challenge Settings

An admin edits the current challenge basics: name, dates, community goal, and active status.

UI needs:

* Challenge name
* Start/end dates
* Community goal baskets
* Active status
* Save CTA

---

### Admin Sponsors

An admin manages sponsor content that appears in the app.

UI needs:

* Sponsor list
* Logo
* Name
* Optional website link
* Active/inactive state
* Add/edit sponsor form

---

### Admin Announcements

An admin writes and sends a league announcement, currently email-only for MVP.

UI needs:

* Title field
* Body field
* Audience selector
* Send email option
* Draft/send CTA
* Sent history

---

### Admin Suspicious Activity

An admin reviews non-blocking activity flags such as unusually high totals or large parent edits. The UI helps review without making the player feel accused.

UI needs:

* Flag list
* Player name
* Flag type
* Submission total
* Severity
* Details
* Mark reviewed/dismiss actions

---

### Admin Exports

An admin exports challenge data for reporting or sponsor/prize tracking.

UI needs:

* Export participants
* Export submissions
* Export leaderboard results
* Export badge counts
* CSV/Google Sheets-compatible labels
* Generating/download states

---

## Shared / Secondary

### Sponsors

A player or parent sees a simple sponsor section with logos, names, and optional links.

UI needs:

* Sponsor logo
* Sponsor name
* Optional website link
* Empty state if no sponsors

---

## Email Designs

### Parent Invitation Email

A parent receives an email inviting them to join the challenge for their child.

UI needs:

* Team/app identity
* Parent greeting
* Player name
* `Join Top Dog Hoops` CTA
* Expiration note if applicable

---

### Parent Approval Request Email

A parent receives an email saying their child submitted shots and needs approval.

UI needs:

* Player name
* Submitted total
* Friend bonus if selected
* `Approve Shots` CTA

---

### Approval Reminder Email

A parent receives a reminder that a submission is still pending.

UI needs:

* Player name
* Pending total
* `Review Submission` CTA

---

### Announcement Email

A parent receives a league announcement from the admin.

UI needs:

* Team/app identity
* Announcement title
* Announcement body
