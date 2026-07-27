# Parent Consent and Deletion Request Flow

Draft date: July 27, 2026

Attorney review required before launch. This document assumes Top Dog Hoops will treat COPPA as potentially applicable until counsel confirms otherwise.

## Goals

* Keep the app parent-mediated.
* Avoid direct child accounts.
* Avoid collecting child contact information.
* Get parent consent before a player participates.
* Give parents a clear way to review, revoke consent, and request deletion.

## Recommended MVP Consent Flow

1. Admin creates a parent invite.
2. Invite is sent to the parent's email address.
3. Parent opens the invite link.
4. Invite acceptance screen shows:
   * player name and division;
   * what information the app collects;
   * what the app is used for;
   * links to Privacy Policy and Terms of Use;
   * a parent consent checkbox;
   * a clear `Accept and Continue` action.
5. Parent confirms they are the parent/guardian or authorized adult for the player.
6. Parent accepts.
7. Invite status changes to `accepted`.
8. Parent can set up or reconnect a child device.
9. Child device can submit shot logs only for that player.
10. Parent approves or edits submissions before they count.

## Consent Language Draft

Use plain language near the invite acceptance action:

> I confirm that I am the parent, guardian, or authorized adult for this player. I consent to Top Dog Hoops collecting and using this player's limited challenge information so they can participate in the basketball shot challenge. I understand I can request review, correction, consent revocation, or deletion by contacting `[PRIVACY CONTACT EMAIL]`.

Checkbox label:

> I agree to the Privacy Policy and Terms of Use and consent to this player's participation.

Button:

> Accept and Continue

## Direct Notice Content Checklist

The parent notice should include:

* Operator/contact information.
* The information collected about the player.
* How the information is used.
* Whether any information is publicly visible, such as limited leaderboard display.
* Service providers used to operate the app.
* Link to the Privacy Policy.
* How the parent gives consent.
* How the parent can revoke consent and request deletion.
* What happens if the parent does not consent.

## Parent Deletion Request Flow

1. Parent sends request to `[PRIVACY CONTACT EMAIL]`.
2. Admin/support verifies the requester is the linked parent/guardian.
3. Admin/support records request date, requester, player, and requested action.
4. Admin/support confirms scope:
   * review data;
   * correct data;
   * revoke consent;
   * delete player data.
5. Admin/support completes the approved action.
6. Admin/support confirms completion to parent.
7. Admin/support records completion date.

## Recommended Deletion Scope

When a verified parent requests deletion:

* Revoke child device tokens.
* Delete or anonymize player profile.
* Delete pending shot submissions.
* Delete or anonymize approved shot submissions and leaderboard data, unless counsel/league determines a limited aggregate record must be retained.
* Remove the player from active leaderboard display.
* Keep only minimal request/audit records needed to document completion.

## Open Decisions

* Privacy contact email.
* Legal/operator name.
* Whether email-plus-confirmation consent is sufficient for this MVP, or whether a stronger verifiable consent method is required.
* Parent request response SLA.
* Whether approved challenge totals are deleted or anonymized after a deletion request.
* Whether any paper/offline league consent form also covers app participation.

## Review Status

Status: Draft for operator and attorney review.

