# Demo QA Notes

Use this file to capture review notes from the live Top Dog Hoops demo.

Demo URL:

* https://www.topdoghoops.com/

How to use:

* Add each issue as a numbered item under `Open`.
* Keep notes visual and specific.
* Move fixed items to `Resolved`.
* Attach screenshots by filename or paste the screenshot into the chat when asking Codex to fix it.

---

## Open

### 1. Magic link button does not work

* Screen: `/parent/link-request`
* Device: Browser / live or local QA
* Issue: The magic link CTA does not appear to complete the expected sign-in link flow.
* Expected: Tapping the magic link button should send or simulate sending the parent sign-in link, then show a clear confirmation or next step.
* Priority: High
* Screenshot: Manual QA note from July 5, 2026
* Status: Open

### 2. Homepage buttons should be Parent Sign In and Kid Sign In

* Screen: `/`
* Device: Browser / live or local QA
* Issue: The buttons on `topdoghoops.com` do not clearly match the updated parent and child sign-in entry points.
* Expected: Use two simple homepage CTAs: `Parent Sign In` and `Kid Sign In`.
* Priority: High
* Screenshot: Manual QA note from July 5, 2026
* Status: Open

### 3. Accept invite page shows link not created state without guidance

* Screen: `/invite/accept`
* Device: Browser / live or local QA
* Issue: The accept invite link flow shows a `link not created` state, which does not explain what the parent is supposed to do next.
* Expected: The accept invite page should either complete the invite acceptance path or show clear recovery guidance, such as requesting a new invite or contacting the league/admin.
* Priority: High
* Screenshot: Manual QA note from July 5, 2026
* Status: Open

### 4. Define what happens when a child visits topdoghoops.com

* Screen: `/`
* Device: Browser / live or local QA
* Issue: The current homepage flow does not define the child experience if a child directly visits `topdoghoops.com` instead of using a paired-device link.
* Expected: `Kid Sign In` should provide the child-safe path from the public homepage, such as prompting for a pairing code, explaining that a parent must set up the device, or routing paired devices to the player dashboard.
* Priority: High
* Screenshot: Manual QA note from July 5, 2026
* Status: Open

### 5. Homepage headline spacing and font size need mobile fit pass

* Screen: `/`
* Device: Mobile / 360px minimum supported width
* Issue: The homepage has too much margin above the headline, and the headline sizing can cause `Top Dog` to break across lines on the smallest supported width.
* Expected: Reduce the top margin above the headline and resize the headline so `Top Dog` stays on one line at 360px width.
* Priority: Medium
* Screenshot: Manual QA note from July 5, 2026
* Status: Open

### 6. Add hamburger navigation for key surfaces

* Screen: Global app shell
* Device: Mobile / browser
* Issue: Key demo surfaces are hard to reach without direct URLs or deep links.
* Expected: Add a hamburger nav with role-aware top-level links. Parent links: `Dashboard`, `Shot Approvals`, `Leaderboard`, `Contact`. Player links: `Dashboard`, `Shot Log`, `Leaderboard`.
* Priority: Medium
* Screenshot: Manual QA note from July 5, 2026
* Status: Open

### 7. Admin invite status should progress from draft to sent to accepted

* Screen: `/admin`, invite management flow
* Device: Browser / live or local QA
* Issue: Manual email invites need a visible lifecycle so admins know whether an invite is drafted, sent, or accepted.
* Expected: After an admin sends a manual email invite, update the invite status from `draft` to `sent`; when the parent accepts, update the status to `accepted`.
* Priority: High
* Screenshot: Manual QA note from July 5, 2026
* Status: Open

### 8. Add single invite should open a modal form

* Screen: `/admin`, invite management flow
* Device: Browser / live or local QA
* Issue: `Add single invite` should behave like an action rather than exposing a form inline by default.
* Expected: Make `Add single invite` a button that opens the invite form in a modal.
* Priority: Medium
* Screenshot: Manual QA note from July 5, 2026
* Status: Open

### 9. Remove gender field

* Screen: Admin/player/invite profile forms
* Device: Browser / live or local QA
* Issue: The flow should not collect or display gender.
* Expected: Remove gender from relevant forms, mock data, display surfaces, and any required validation.
* Priority: Medium
* Screenshot: Manual QA note from July 5, 2026
* Status: Open

### 10. Add rules access and first-visit disclosure modals

* Screen: `/player-entry`, `/parent-approval`, global navigation
* Device: Mobile / browser
* Issue: Rules are not easy to find, and users are not shown a first-visit disclosure before using the shot log or shot approval log.
* Expected: Add an easy-to-find rules surface and show a modal disclosure on first visit to the shot log and shot approval log. Users must explicitly tap `Agree` before proceeding.
* Priority: High
* Screenshot: Manual QA note from July 5, 2026
* Status: Open

---

## Resolved

### 1. Child device setup sheet handle should dismiss sheet

* Screen: `/family/marcus-johnson/device-setup`
* Device: Mobile
* Issue: The handle looked draggable but did not dismiss the sheet.
* Expected: Tapping or dragging down on the handle should close the sheet and return to the family dashboard.
* Priority: High
* Screenshot: User-provided screenshot from July 3, 2026
* Status: Resolved

### 2. Parent dashboard shows zero approvals while approval queue has pending items

* Screen: `/family`
* Device: iPhone / live browser
* Issue: The family dashboard CTA read `APPROVE SHOT LOG (0)`, but `/parent-approval` showed two pending shot logs.
* Expected: The dashboard count should match the pending queue.
* Priority: High
* Screenshot: Live QA pass on https://www.topdoghoops.com/, July 3, 2026
* Status: Resolved

### 3. Leaderboard link is visually disconnected on the family dashboard

* Screen: `/family`
* Device: iPhone / live browser
* Issue: `GO TO LEADER BOARD` sat near the bottom of the viewport with a large empty gap.
* Expected: The leaderboard link should sit closer to the primary dashboard card/actions.
* Priority: Medium
* Screenshot: Live QA pass on https://www.topdoghoops.com/, July 3, 2026
* Status: Resolved

### 4. Friend name field appears before the friend checkbox is selected

* Screen: `/player-entry`
* Device: iPhone / live browser
* Issue: The friend name input was visible while the friend checkbox was unchecked.
* Expected: Hide or disable the friend name field until the checkbox is selected.
* Priority: Medium
* Screenshot: Live QA pass on https://www.topdoghoops.com/, July 3, 2026
* Status: Resolved

### 5. Leaderboard wording is inconsistent across screens

* Screen: `/family`, `/player`, `/leaderboards`
* Device: iPhone / live browser
* Issue: Leaderboard labels varied between `GO TO LEADER BOARD`, `LEADERBOARD`, and `HIGH SCORE`.
* Expected: Use one label consistently for the leaderboard destination.
* Priority: Low
* Screenshot: Live QA pass on https://www.topdoghoops.com/, July 3, 2026
* Status: Resolved

### 6. Approval detail URL format differs between review link and queue links

* Screen: `/parent-approval`, `/parent-approval/submission-1`
* Device: iPhone / live browser
* Issue: The review/demo link and live queue used different approval detail URL formats.
* Expected: Use one canonical approval detail URL format in the live queue and demo review links.
* Priority: Low
* Screenshot: Live QA pass on https://www.topdoghoops.com/, July 3, 2026
* Status: Resolved

### 7. Child device setup link screen should use close instead of back

* Screen: `/family/marcus-johnson/device-setup`
* Device: iPhone / live browser
* Issue: The generated link state used `← BACK`.
* Expected: The generated link state should show a close button/action.
* Priority: Medium
* Screenshot: User-provided screenshot `codex-clipboard-19da580a-10d9-4841-b727-855fc6eb589c.png`, July 3, 2026
* Status: Resolved

### 8. Player device CTA should switch to reconnect after setup

* Screen: `/family`
* Device: iPhone / live browser
* Issue: The dashboard still presented the action as `SET UP PLAYER DEVICE` after setup.
* Expected: After setup, change the CTA to `RECONNECT PLAYER DEVICE` and open the QR/link sheet.
* Priority: Medium
* Screenshot: Manual QA note from July 3, 2026
* Status: Resolved

### 9. Parent-side player module should say Your Player

* Screen: `/family`
* Device: iPhone / live browser
* Issue: The parent dashboard player module header said `PLAYER`.
* Expected: Change the parent-side module header to `YOUR PLAYER`.
* Priority: Low
* Screenshot: Manual QA note from July 3, 2026
* Status: Resolved

### 10. Player card should show league instead of Top Dog Hoops

* Screen: `/family`
* Device: iPhone / live browser
* Issue: The player card subtitle repeated `Top Dog Hoops`.
* Expected: Replace `Top Dog Hoops` on the player card with the league the player is in.
* Priority: Low
* Screenshot: Manual QA note from July 3, 2026
* Status: Resolved

### 11. Player dashboard should show submission history with edit and status

* Screen: `/player`
* Device: iPhone / live browser
* Issue: The player dashboard did not show the player's submitted shot logs.
* Expected: Add a submissions table with approval status and a small `Edit` CTA where editing is allowed.
* Priority: Medium
* Screenshot: Manual QA note from July 3, 2026
* Status: Resolved

### 12. Define behavior for multiple parents setting up the same child device

* Screen: `/family`, `/family/marcus-johnson/device-setup`
* Device: iPhone / live browser
* Issue: The demo flow did not make clear what happens if more than one parent tries to set up or reconnect the same child's device.
* Expected: Define and surface the intended behavior for duplicate setup attempts.
* Priority: High
* Screenshot: Manual QA note from July 3, 2026
* Status: Resolved

### 13. Pending approval tiles should explicitly say approval is needed

* Screen: `/parent-approval`
* Device: iPhone / live browser
* Issue: The black tiles did not clearly state that the shot logs need parent approval.
* Expected: Use the black tile treatment only for shot logs that need approval and include explicit approval-needed copy/status.
* Priority: Medium
* Screenshot: User-provided screenshot `codex-clipboard-6d4b8f64-73a7-4c03-95dc-145f49a77574.png`, July 3, 2026
* Status: Resolved

### 14. Move recently approved table to parent dashboard with full date details

* Screen: `/family`
* Device: iPhone / live browser
* Issue: The `RECENTLY APPROVED` table appeared on `/parent-approval`.
* Expected: Move the recently approved shot log table to the parent dashboard with player name, `MM DD` date, and timestamp.
* Priority: Medium
* Screenshot: User-provided screenshot `codex-clipboard-6d4b8f64-73a7-4c03-95dc-145f49a77574.png`, July 3, 2026
* Status: Resolved

---

## Change Log

Use this section for meaningful visual/UI changes that are not tied to a numbered QA issue above.

### 1. Switched wordmark, headings, and score displays to local Google Fonts

* Change: Replaced the system font stack (`Impact`/`Arial Black`) and generic monospace used for the wordmark, page headings, and arcade score digits with three self-hosted font families: `Inter` (body/UI text), `Barlow` Black (wordmark + all page headings), and `Pixelify Sans` (scoreboard/leaderboard digits only).
* Files/components touched:
  * `app/fonts.ts` (new) — `next/font/local` declarations for `inter`, `pixelifySans`, `barlow`
  * `app/layout.tsx` — applies the three font variables to `<html>`
  * `tailwind.config.ts` — `font-sans` (Inter), `font-pixel`, `font-heading` (Barlow) utilities
  * `app/globals.css` — `.canton-wordmark`, `.canton-wordmark-sm` now use Barlow; `.canton-score-font` now uses Pixelify Sans
  * `font-heading` added to the 8 headline elements: `app/leaderboards/page.tsx`, `app/player/page.tsx`, `app/parent-approval/page.tsx`, `app/player-entry/page.tsx`, `components/features/auth/MagicLinkRequestForm.tsx`, `components/features/pairing/ChildDeviceSetupCard.tsx`, `components/features/pairing/PairingQrCodeCard.tsx`, `components/features/family/FamilySummaryCard.tsx`
  * Font files sourced from `public/fonts/{Inter,Barlow,Pixelify_Sans}/` (user-provided)
* Why: User requested Google Fonts in place of the placeholder system stack. `next/font/google` was ruled out because it fetches font files at build time and Codex's build environment has no network access, which had already broken the build once before. Switched to `next/font/local` with self-hosted `.woff2`/`.ttf` files instead, per explicit instruction: never use `next/font/google`.
* Status: Done — not yet verified in a live build.

### 2. Enlarged mascot on the submission celebration reveal

* Change: The bulldog mascot shown after the basketball bounce animation (`Let's Go, Marcus!` reveal) is now 3x larger — `h-32 w-32` (128px) to `h-96 w-96` (384px).
* Files/components touched:
  * `components/features/rewards/MascotRevealBadge.tsx`
  * `app/player-entry/page.tsx` — enlarged the surrounding wrapper to match, so the mascot has room to render at full size without being clipped
* Why: User feedback that the mascot looked too small against the large empty grid area on the reveal screen.
* Status: Done — not yet verified in a live build.

### 3. Increased basketball bounce height in submission celebration

* Change: The bouncing basketball in the `/player-entry` submission celebration now travels ~240px per bounce (revised up from an initial 90px, originally 28px), with per-keyframe easing (ease-out rising, ease-in falling) and a slightly longer 0.7s cycle to read more like a real dribble under gravity instead of a small symmetric wobble. Uses the empty grid space already reserved above/below the ball slot.
* Files/components touched:
  * `app/globals.css` — `ball-bounce` keyframes and `.ball-bounce` animation
* Why: User feedback (with screenshot) that the first bounce-height increase still wasn't enough — wanted the ball to move across a much taller vertical space, like a real basketball being dribbled.
* Status: Done — not yet verified in a live build.

---

## Review Links

Use these paths during QA:

* `/`
* `/invite/accept`
* `/parent/link-request`
* `/family`
* `/family/marcus-johnson/device-setup`
* `/pair/test-token`
* `/player`
* `/player-entry`
* `/leaderboards`
* `/leaderboards?from=parent`
* `/parent-approval`
* `/parent-approval/submission-1`
