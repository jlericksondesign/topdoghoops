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
* Issue: The magic link CTA shows a success-style `Check Your Email` state, but no fresh parent sign-in email arrives. Reproduced on July 27, 2026 with an account that had previously authenticated on July 9; the old link is expired as expected, but a new link was not received.
* Expected: Tapping the magic link button should actually request/send a new parent sign-in link, then show a clear confirmation or next step. The UI should not claim an email was sent if the backend request fails or is not wired.
* Notes: Fixed locally on July 27, 2026 by wiring `components/features/auth/MagicLinkRequestForm.tsx` to `POST /parent/link-request/request`, adding signed parent login links at `/parent/verify`, and sending parent sign-in email through Resend. Parent-facing copy is intentionally neutral: `If this parent email is approved, you'll receive a magic link...`; lookup/send failures are logged server-side instead of shown in the UI.
* Priority: High
* Screenshot: Manual QA notes from July 5 and July 27, 2026
* Status: Resolved - parent sign-in magic link verified live on July 27, 2026

### 2. Homepage buttons should be Parent Sign In and Player Sign In

* Screen: `/`
* Device: Browser / live or local QA
* Issue: The buttons on `topdoghoops.com` do not clearly match the updated parent and child sign-in entry points.
* Expected: Use two simple homepage CTAs: `Parent Sign In` and `Player Sign In`.
* Priority: High
* Screenshot: Manual QA note from July 5, 2026
* Status: Fixed locally - needs deploy

### 3. Player Sign In should help players trigger parent setup

* Screen: `/player/sign-in`
* Device: Browser / live or local QA
* Issue: The old `Kid Sign In` destination had buttons that did not create a useful player setup path.
* Expected: Rename the destination to `Player Sign In` and let users enter a parent email. If the parent email is approved/accepted in the database, the parent should receive the magic link so they can set up the player device.
* Priority: High
* Screenshot: Manual QA note from July 27, 2026
* Status: Fixed locally - needs deploy and live verification

### 4. Accept invite page shows link not created state without guidance

* Screen: `/invite/accept`
* Device: Browser / live or local QA
* Issue: The accept invite link flow shows a `link not created` state, which does not explain what the parent is supposed to do next.
* Expected: Confirm whether this state is still relevant after parent/player sign-in updates. If still reachable, the page should either complete invite acceptance or show clear recovery guidance, such as requesting a new invite or contacting the league/admin.
* Priority: High
* Screenshot: Manual QA note from July 5, 2026
* Status: Needs product review - may be superseded

### 5. Homepage headline spacing and font size need mobile fit pass

* Screen: `/`
* Device: Mobile / 360px minimum supported width
* Issue: The homepage has too much margin above the headline, and the headline sizing can cause `Top Dog` to break across lines on the smallest supported width.
* Expected: Reduce the top margin above the headline and resize the headline so `Top Dog` stays on one line at 360px width.
* Priority: Medium
* Screenshot: Manual QA note from July 5, 2026
* Status: Resolved - working as expected in QA

### 6. Add hamburger navigation for key surfaces

* Screen: Global app shell
* Device: Mobile / browser
* Issue: Key demo surfaces are hard to reach without direct URLs or deep links.
* Expected: Add a hamburger nav with role-aware top-level links. Parent links: `Dashboard`, `Shot Approvals`, `Leaderboard`, `Contact`. Player links: `Dashboard`, `Shot Log`, `Leaderboard`.
* Priority: Medium
* Screenshot: Manual QA note from July 5, 2026
* Status: Resolved - hamburger navigation exists

### 7. Admin invite status should progress from draft to sent to accepted

* Screen: `/admin`, invite management flow
* Device: Browser / live or local QA
* Issue: Manual email invites need a visible lifecycle so admins know whether an invite is drafted, sent, or accepted.
* Expected: After an admin sends a manual email invite, update the invite status from `draft` to `sent`; when the parent accepts, update the status to `accepted`.
* Notes: Status progression is working as expected in QA. Add a CTA that lets the admin edit the invite form/details before sending the invite email.
* Priority: High
* Screenshot: Manual QA note from July 5, 2026
* Status: Partially resolved - edit-before-send CTA still needed

### 8. Add single invite should open a modal form

* Screen: `/admin`, invite management flow
* Device: Browser / live or local QA
* Issue: `Add single invite` should behave like an action rather than exposing a form inline by default.
* Expected: Make `Add single invite` a button that opens the invite form in a modal.
* Priority: Medium
* Screenshot: Manual QA note from July 5, 2026
* Status: Resolved - existing implementation uses a modal

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
* Expected: Rules access and first-visit disclosure modals exist. Update the actual rules content before launch. Users must explicitly tap `Agree` before proceeding.
* Priority: High
* Screenshot: Manual QA note from July 5, 2026
* Status: Partially resolved - content update needed

### 11. Add CF McCarthy sponsor branding

* Screen: Global app shell / homepage / relevant sponsor placement
* Device: Mobile / browser
* Issue: Friend requested adding CF McCarthy branding, either as the CF McCarthy logo or a `Sponsored by CF McCarthy` placement.
* Expected: Decide the sponsor placement and add tasteful CF McCarthy branding without competing with the Top Dog Hoops identity.
* Priority: Medium
* Screenshot: Friend raw note from July 9, 2026
* Status: Open

### 12. Add break-a-sweat bonus button

* Screen: `/player-entry`
* Device: Mobile / browser
* Issue: Friend requested a bonus button for `breaking a sweat`.
* Expected: Add or evaluate a `Break a Sweat` bonus action in the shot log flow, including how it affects scoring, parent approval, and the final submitted shot log.
* Priority: Medium
* Screenshot: Friend raw note from July 9, 2026
* Status: Open

### 13. Create Privacy Policy and Terms of Use drafts

* Screen: Public legal pages / global footer or navigation
* Device: Browser / mobile
* Issue: The app does not yet have clear Privacy Policy or Terms of Use language for families, admins, and league stakeholders to review.
* Expected: Draft plain-language Privacy Policy and Terms of Use documents that describe the app, operator/contact placeholder, data collected, child/player data handling, parent/admin responsibilities, acceptable use, and review-needed legal disclaimers.
* Draft files: `docs/privacy/privacy-policy-draft.md`, `docs/privacy/terms-of-use-draft.md`
* App destinations: `/privacy`, `/terms`, `/rules`, and `/contact` are linked in a small global footer below the main content on every page.
* Priority: High
* Screenshot: Privacy review feedback from July 27, 2026
* Status: App destinations added - needs operator and attorney review

### 14. Define parental consent and deletion request process

* Screen: Parent invite/accept flow, privacy/contact surface, admin support workflow
* Device: Browser / mobile
* Issue: If COPPA applies, the app needs a clear process for parental consent and parent deletion requests.
* Expected: Document the parent consent flow, where consent language appears, how parents can request deletion of child/player data, who receives those requests, and how the app/admin process should confirm completion.
* Draft files: `docs/privacy/coppa-parent-consent-flow.md`
* Priority: High
* Screenshot: Privacy review feedback from July 27, 2026
* Status: Drafted - needs operator and attorney review

### 15. Document admin access controls and MFA expectations

* Screen: Admin access / `/admin` / deployment operations
* Device: Browser / admin workflow
* Issue: Admin access controls, including MFA expectations, are not yet documented for launch readiness.
* Expected: Create an admin access control summary covering who can be an admin, least-privilege expectations, MFA requirement, invite/access review cadence, and what operational accounts need protection.
* Draft files: `docs/privacy/admin-access-controls.md`
* Priority: High
* Screenshot: Privacy review feedback from July 27, 2026
* Status: Drafted - needs operator review

### 16. Document data retention and deletion practices

* Screen: Privacy docs / admin operations / data model
* Device: Browser / admin workflow
* Issue: The app does not yet document how long parent, player, invite, device token, shot log, and leaderboard data are retained or deleted.
* Expected: Create a data retention and deletion policy that lists each major data category, retention period or decision placeholder, deletion trigger, and who is responsible for carrying out deletion.
* Draft files: `docs/privacy/data-retention-deletion.md`
* Priority: High
* Screenshot: Privacy review feedback from July 27, 2026
* Status: Drafted - needs operator and attorney review

### 17. Create ongoing maintenance and incident response plan

* Screen: Operations documentation
* Device: Admin/maintainer workflow
* Issue: The project needs a documented plan for maintenance, security updates, monitoring, and incident response.
* Expected: Draft an incident response and maintenance plan covering owner/contact placeholders, severity levels, breach/privacy incident steps, parent/admin notification workflow, backup/recovery checks, dependency updates, and periodic policy review.
* Draft files: `docs/privacy/incident-response-plan.md`
* Priority: High
* Screenshot: Privacy review feedback from July 27, 2026
* Status: Drafted - needs operator review

### 18. Player shot submission controls collide with mobile browser chrome

* Screen: Shot logging flow / player shot counter submission
* Device: iPhone in Messages browser
* Issue: The friend checkbox and `Submit` button sit too close to the bottom of the viewport and overlap visually with the browser bottom bar area. The `Back` link and URL pill compete for the same space, making the submit area feel cramped and partially obscured.
* Expected: Add mobile safe-area spacing and keep the shot submission controls fully visible above the browser chrome. The primary `Submit` action should have clear breathing room and should not feel attached to the bottom browser UI.
* Priority: High
* Screenshot: `IMG_8779.jpg`, July 27, 2026
* Status: Fixed locally - needs deploy and iPhone in-app browser verification

### 19. Legal footer links overlap player dashboard content on short mobile screens

* Screen: `/player`
* Device: iPhone in Messages browser
* Issue: The small legal footer links appear in the middle of the player dashboard content, overlapping the `LET'S GO, LOGAN E!` headline in one state and competing with the bottom of the player dashboard in another.
* Expected: Footer links should stay below the main screen content without covering headings, cards, or CTAs. On short mobile viewports, the layout should either scroll naturally or reserve enough space so the footer never overlays player content.
* Priority: High
* Screenshot: `IMG_8780.PNG`, `IMG_8781.PNG`, July 27, 2026
* Status: Likely resolved - needs final live sweep

### 20. Header needs iOS in-app browser safe-area pass

* Screen: Global app shell / `/player`
* Device: iPhone in Messages browser
* Issue: The iOS status/navigation area overlaps the Top Dog Hoops header. In the screenshot, the Messages back label and status icons sit on top of the logo/wordmark and hamburger button.
* Expected: Add safe-area-aware top spacing so the app header is fully below iOS in-app browser chrome while keeping the header compact on normal mobile browsers.
* Priority: High
* Screenshot: `IMG_8781.PNG`, July 27, 2026
* Status: Likely resolved - needs final live sweep

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

* Change: Replaced the system font stack (`Impact`/`Arial Black`) and hard-to-read score digits with self-hosted font families: `Inter` (body/UI text), `Barlow` Black (wordmark + all page headings), and `Roboto Mono` (scoreboard/leaderboard digits only).
* Files/components touched:
  * `app/fonts.ts` (new) — `next/font/local` declarations for `inter`, `robotoMono`, `barlow`
  * `app/layout.tsx` — applies the three font variables to `<html>`
  * `tailwind.config.ts` — `font-sans` (Inter), `font-pixel`, `font-heading` (Barlow) utilities
  * `app/globals.css` — `.canton-wordmark`, `.canton-wordmark-sm` now use Barlow; `.canton-score-font` now uses Roboto Mono
  * `font-heading` added to the 8 headline elements: `app/leaderboards/page.tsx`, `app/player/page.tsx`, `app/parent-approval/page.tsx`, `app/player-entry/page.tsx`, `components/features/auth/MagicLinkRequestForm.tsx`, `components/features/pairing/ChildDeviceSetupCard.tsx`, `components/features/pairing/PairingQrCodeCard.tsx`, `components/features/family/FamilySummaryCard.tsx`
  * Font files sourced from `public/fonts/{Inter,Barlow,Roboto_Mono}/` (user-provided)
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
