# Front-End Design Handoff Plan

This project should treat front-end design as user-provided direction. Do not invent full page designs during implementation unless Jessica explicitly asks for a design exploration.

The goal is to preserve high UI quality by letting page-specific designs drive the build, while keeping engineering decisions organized, reusable, and compatible with the MVP spec.

---

## Canonical Inputs

Use these files as the project source of truth:

* `/docs/product-spec.md` for MVP behavior and scope
* `/docs/brand.md` for brand, tone, interaction feel, and reward energy
* `/docs/implementation-plan.md` for build sequencing and technical planning
* This file for front-end design handoff workflow

Ignore duplicate or older planning copies unless Jessica explicitly points to them.

---

## Front-End Build Rule

Before implementing or substantially redesigning any page, the builder should have page-specific design direction from Jessica.

Acceptable design inputs:

* Screenshot
* Figma frame
* Canva mockup
* Wireframe
* Annotated sketch
* Written page brief with layout, hierarchy, colors, and component expectations
* Reference examples plus clear notes about what to borrow and what to avoid

If no design input exists for a page, the builder may only create:

* Functional scaffolding
* Data wiring
* Accessibility structure
* Plain placeholder states
* Components marked as temporary

---

## Design Handoff Checklist

For each page or major component, collect:

1. Page name and route
2. Primary user goal
3. Mobile layout design
4. Desktop or tablet expectations, if any
5. Required components and states
6. Primary CTA and secondary actions
7. Empty state
8. Loading state
9. Error state
10. Success or celebration state
11. Animation notes
12. Copy/text direction
13. Assets, logos, icons, or mascot art
14. Any interaction details that should not be improvised

---

## Page Design Queue

Recommended order for Jessica-provided front-end designs:

1. Admin family invite screen
2. Parent invitation acceptance
3. Parent family/player confirmation
4. Child device pairing
5. Home dashboard
6. Player daily shot entry
7. Submission celebration and reward reveal
8. One-card parent approval
9. Parent edit then approve
10. Leaderboards
11. Badges
12. Player profile/progress
13. Sponsors
14. Admin dashboard
15. Admin suspicious activity review

---

## Builder Responsibilities

When implementing from a supplied design:

* Match the provided page hierarchy before improving details.
* Preserve the brand direction: modern mobile app with arcade-inspired accents.
* Keep interactions large, fast, and child-friendly.
* Use reusable components when the same visual pattern appears across pages.
* Keep temporary mock data clearly labeled until backend wiring begins.
* Do not connect Supabase unless the task explicitly says to connect data.
* Follow `/docs/auth-invite-approval-plan.md` for invitation, child pairing, and parent approval flows.
* Verify the result in a mobile viewport.
* Flag design gaps instead of filling major missing decisions silently.

---

## Quality Bar

Front-end implementation should feel:

* Mobile-first
* Motivating
* Athletic
* Rewarding
* Fast
* Clear enough for children and parents
* More like submitting a high score than filling out a form

Avoid:

* Generic SaaS dashboards
* Dense forms
* Corporate UI tone
* Spreadsheet-like layouts
* Full pixel-art treatment
* Unapproved page redesigns

---

## Handoff Prompt Template

Use this when starting a page build:

```md
Build the [page/component name] using the attached design.

Route:

Primary user:

Primary goal:

Required states:

Use mocked data only / Connect to Supabase:

Interaction notes:

Assets:

Do not change:
```

---

## Current Status

The project currently contains an early mocked vertical slice for `/player-entry`. Treat it as a prototype only. It can be replaced or refactored once Jessica provides the final page-specific design.
