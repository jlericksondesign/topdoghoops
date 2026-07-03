# Top Dog Hoops

Mobile-first PWA scaffold for a youth basketball shooting challenge app.

## Stack

- Next.js
- TypeScript
- Tailwind CSS
- shadcn/ui
- Supabase
- Vercel-ready structure

## Planning Docs

- `docs/product-spec.md`: MVP source of truth
- `docs/brand.md`: brand and interaction direction
- `docs/implementation-plan.md`: phased build plan
- `docs/frontend-design-handoff.md`: workflow for user-provided front-end designs
- `docs/auth-invite-approval-plan.md`: parent invitation, child pairing, and approval model
- `docs/screen-inventory.md`: complete screen and feature checklist for design files
- `docs/screen-user-stories.md`: concise screen-by-screen design stories
- `docs/component-library-inventory.md`: code-named component checklist for the design system

Front-end page design should come from Jessica before polished UI implementation. Existing mocked UI should be treated as prototype-only unless a design is explicitly approved.

MVP access model: admins invite parents by email, parents use passwordless email, children use paired device access, and child submissions require simple parent approval.

## Getting Started

Install dependencies and run the local app:

```bash
pnpm install
pnpm dev
```
