-- Temporary pre-launch legal/privacy intake.
-- Remove this table and the /legal-review surface after launch review is complete.

create table if not exists public.legal_review_submissions (
  id uuid primary key default gen_random_uuid(),
  reviewer_name text not null,
  reviewer_email text not null,
  reviewer_role text,
  approval_status text not null default 'needs_follow_up' check (
    approval_status in ('approved', 'approved_with_edits', 'needs_follow_up')
  ),
  answers jsonb not null,
  created_at timestamptz not null default now()
);

alter table public.legal_review_submissions enable row level security;
