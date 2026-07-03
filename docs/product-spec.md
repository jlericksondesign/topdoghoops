## **MVP Product Specification**

## **Product Vision**

Create a mobile-first experience that motivates Canton youth basketball players to practice shooting throughout the summer through simple shot logging, parent-approved totals, lightweight competition, and community progress.

Launch simplification:

* Badges and streaks should stay as placeholder UI only for the initial release.
* Leaderboards should be intentionally simple for launch.
* The MVP should prioritize invite onboarding, child device pairing, daily shot submission, parent approval, and one clear leaderboard.

---

# **Users**

## **Player**

Can:

* Log daily baskets
* View simple leaderboard position
* View personal progress
* View community progress

MVP access model:

* Players do not create full accounts.
* Players use parent-created player profiles.
* Players may use a paired child-device link or QR code to access their own player experience.
* Child-device access can submit shots but cannot approve submissions or manage account settings.

---

## **Parent**

Can:

* Accept admin email invitation
* Sign in with passwordless email
* Confirm player profiles
* Manage multiple children
* Generate child device access links or QR codes
* Approve submissions
* Edit submissions before approval
* Receive reminders

---

## **League Admin**

Can:

MVP:

* Invite families by parent email
* Upload family invite CSVs
* Export data

Post-launch:

* Manage users
* Manage challenges
* Manage sponsors
* Send announcements
* Review suspicious activity

---

# **Program Rules**

## **Challenge Duration**

Initial challenge:

July

Future challenges:

August and beyond

---

## **Basket Tracking**

Any made basket counts.

No daily maximum.

Players may only submit for today's date.

No backdated entries allowed.

---

## **Shot With A Friend**

Optional checkbox.

Awards:

\+10 bonus baskets.

No friend identification required.

No verification required.

Purpose:

Encourage players to practice together.

---

# **Divisions**

Primary:

* Boys Elementary
* Boys Middle School
* Girls Elementary
* Girls Middle School

Secondary:

* Overall

Primary division leaderboards should receive visual priority.

---

# **Prizes**

Top 5 players in each primary division receive sponsor-funded rewards.

Examples:

* Free meals
* Gift cards
* Sponsor prizes

---

# **Community Goal**

Display prominently throughout the app.

Example:

250,000 Summer Shots

Current Progress:

187,423 / 250,000

Progress Bar

Purpose:

Create cooperation alongside competition.

---

# **Home Screen**

Displays:

* Today's status
* Current approved shot total
* Placeholder streak/reward area if included in the design
* Community goal
* Leaderboard rank

Primary CTA:

SUBMIT TODAY'S SHOTS

---

# **Daily Shot Entry Screen**

Automatically opens to today's date.

No date picker.

Large arcade-style score display.

Default:

000

Buttons:

\+1

\+5

\+10

Optional:

☑ Shot With A Friend (+10)

Primary CTA:

SUBMIT SCORE

---

# **Submission Celebration Experience**

Purpose:

Make score submission feel like submitting a video game high score.

---

## **Step 1**

Player submits score.

---

## **Step 2**

Basketball launches from bottom of screen.

---

## **Step 3**

Basketball travels toward hoop.

---

## **Step 4**

SWISH animation.

Optional:

* vibration
* sound effect

---

## **Step 5**

Scoreboard tally animation.

Example:

000

005

012

017

---

## **Step 6**

Display score confirmation.

Example:

\+17 SHOTS RECORDED

---

## **Step 7**

Display rewards.

MVP launch:

* Show placeholder reward messaging only.
* Do not calculate production badges, stars, or streaks yet.

Future examples:

🔥 3 DAY STREAK

⭐ \+15 STARS

🐾 BADGE PROGRESS

---

## **Step 8**

Display leaderboard movement.

MVP launch:

* Show a simple placeholder movement message after submission.
* Real movement can be added after approved leaderboard data is connected.

Future examples:

YOU MOVED UP 3 SPOTS

\#12 → \#9

YOU PASSED JACKSON

8 SHOTS TO CATCH MIA

---

## **Random Encouragement Messages**

Randomly rotate:

* NOTHING BUT NET
* HEATING UP
* BULLDOG BUCKET
* KEEP SHOOTING
* PRACTICE PAYS OFF
* GYM RAT ENERGY
* BUILDING YOUR GAME

---

# **Parent Approval Flow**

Parent receives notification when a child-device submission is pending.

Parent can:

* Approve
* Edit then approve

Only approved submissions count.

Leaderboards update after approval.

MVP approval should be one card and one primary action:

APPROVE +47 SHOTS

Secondary action:

Edit before approving

No rejection flow is required for MVP unless explicitly requested later.

Parent-entered submissions may be auto-approved.

---

# **Family Invitation Flow**

Admins invite parents by email.

Admin can:

* Add one family manually
* Upload a CSV
* Preview rows
* Send invites
* Resend invites
* Copy invite link
* Cancel invite

Recommended CSV columns:

parent_email,parent_name,player_first_name,player_last_initial,grade,gender,division

Parent invite link:

/invite/accept?token=...

Parent accepts invite, verifies email with passwordless auth if needed, confirms player profile, and enters the app.

---

# **Child Device Pairing**

Parents can set up a child's own device without creating a child login.

Flow:

1. Parent opens player profile.
2. Parent selects Set Up Child Device.
3. App creates a secure player-scoped access link or QR code.
4. Child opens link on their own device.
5. App stores a long-lived child-device session.
6. Child lands in the player experience on future visits.

Child paired device can:

* Submit today's shots
* View player progress
* View simple leaderboard

Child paired device cannot:

* Approve submissions
* Edit approved history
* Manage account settings
* Access parent or admin screens

---

# **Leaderboards**

MVP launch view:

* One simple challenge leaderboard ranked by approved baskets.

Divisions:

* Boys Elementary
* Boys Middle School
* Girls Elementary
* Girls Middle School
* Overall

Leaderboard cards should resemble retro arcade scoreboards.

Defer until after launch:

* Daily, weekly, and monthly leaderboard filters
* Leaderboard movement calculations
* Complex ranking formulas

---

# **Notifications**

Players:

* Daily reminder if no submission

Parents:

* Reminder when approval pending
* Invitation email
* Approval request email

Admins:

* Announcement messages

MVP delivery:

* Email
* SMS later when available

---

# **Sponsors**

Dedicated sponsor section.

Display:

* Logo
* Name
* Optional website link

No additional sponsor placements required.

---

# **Admin Dashboard**

Metrics:

* Total participants
* Active participants
* Total baskets
* Division participation
* Age
* Grade
* Gender
* Community progress
* Friend bonus usage

Exports:

* CSV
* Google Sheets compatible

---

# **Suspicious Activity Detection**

Flag:

* Extremely high daily totals
* Unusual spikes
* Excessive friend bonuses
* Large parent edits

Flags do not block participation.

Admins review manually.

---

# **Technical Architecture**

Platform:

Progressive Web App (PWA)

Frontend:

* Next.js
* Tailwind
* shadcn/ui

Backend:

* Supabase Auth
* Supabase Postgres

Email:

* Resend for invitations and approval notifications

Hosting:

* Vercel

Goals:

* Launch in weeks
* Low cost
* Mobile-first
* No App Store dependency
* Easy onboarding via shared link
* No password or forgot-password flow for MVP
