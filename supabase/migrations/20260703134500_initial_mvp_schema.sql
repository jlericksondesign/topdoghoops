-- Top Dog Hoops MVP schema
-- Frontend remains mocked until app wiring tasks explicitly connect these tables.

create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null unique,
  display_name text,
  role text not null default 'parent' check (role in ('parent', 'admin')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.parent_invites (
  id uuid primary key default gen_random_uuid(),
  parent_email text not null,
  parent_name text,
  player_first_name text not null,
  player_last_initial text not null,
  grade integer not null,
  gender text not null check (gender in ('boy', 'girl')),
  division text not null check (
    division in (
      'boys_elementary',
      'boys_middle_school',
      'girls_elementary',
      'girls_middle_school'
    )
  ),
  token_hash text not null,
  status text not null default 'draft' check (
    status in ('draft', 'sent', 'accepted', 'expired', 'cancelled')
  ),
  accepted_by_profile_id uuid references public.profiles(id),
  accepted_at timestamptz,
  expires_at timestamptz not null,
  created_by_admin_id uuid references public.profiles(id),
  last_sent_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.players (
  id uuid primary key default gen_random_uuid(),
  parent_profile_id uuid references public.profiles(id),
  invite_id uuid references public.parent_invites(id),
  first_name text not null,
  last_initial text not null,
  grade integer not null,
  gender text not null check (gender in ('boy', 'girl')),
  division text not null check (
    division in (
      'boys_elementary',
      'boys_middle_school',
      'girls_elementary',
      'girls_middle_school'
    )
  ),
  is_active boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.child_device_tokens (
  id uuid primary key default gen_random_uuid(),
  player_id uuid not null references public.players(id) on delete cascade,
  parent_profile_id uuid not null references public.profiles(id) on delete cascade,
  token_hash text not null,
  label text,
  last_used_at timestamptz,
  revoked_at timestamptz,
  expires_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.challenges (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  starts_on date not null,
  ends_on date not null,
  community_goal_baskets integer not null default 0,
  is_active boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.shot_submissions (
  id uuid primary key default gen_random_uuid(),
  challenge_id uuid not null references public.challenges(id),
  player_id uuid not null references public.players(id) on delete cascade,
  submitted_by_profile_id uuid references public.profiles(id),
  submitted_by_child_device_token_id uuid references public.child_device_tokens(id),
  submission_date date not null,
  base_baskets integer not null check (base_baskets >= 0),
  shot_with_friend boolean not null default false,
  friend_bonus_baskets integer not null default 0 check (friend_bonus_baskets in (0, 10)),
  total_baskets integer not null check (total_baskets >= 0),
  status text not null default 'pending' check (status in ('pending', 'approved')),
  approved_by_profile_id uuid references public.profiles(id),
  approved_at timestamptz,
  parent_edited boolean not null default false,
  original_total_baskets integer,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint shot_submissions_total_matches_parts check (
    total_baskets = base_baskets + friend_bonus_baskets
  )
);

create table if not exists public.player_stats (
  player_id uuid not null references public.players(id) on delete cascade,
  challenge_id uuid not null references public.challenges(id) on delete cascade,
  approved_baskets_total integer not null default 0,
  friend_bonus_count integer not null default 0,
  last_approved_submission_date date,
  updated_at timestamptz not null default now(),
  primary key (player_id, challenge_id)
);

create table if not exists public.email_events (
  id uuid primary key default gen_random_uuid(),
  email_type text not null check (
    email_type in ('parent_invite', 'approval_request', 'approval_reminder')
  ),
  recipient_email text not null,
  related_invite_id uuid references public.parent_invites(id),
  related_submission_id uuid references public.shot_submissions(id),
  provider text not null default 'resend',
  provider_message_id text,
  status text not null default 'queued' check (status in ('queued', 'sent', 'failed')),
  error_message text,
  created_at timestamptz not null default now(),
  sent_at timestamptz
);

create index if not exists parent_invites_parent_email_idx
  on public.parent_invites (parent_email);

create index if not exists parent_invites_status_idx
  on public.parent_invites (status);

create index if not exists players_parent_profile_id_idx
  on public.players (parent_profile_id);

create index if not exists players_division_idx
  on public.players (division);

create index if not exists child_device_tokens_player_id_idx
  on public.child_device_tokens (player_id);

create index if not exists shot_submissions_player_date_idx
  on public.shot_submissions (player_id, submission_date);

create index if not exists shot_submissions_status_idx
  on public.shot_submissions (status);

create or replace view public.leaderboard_challenge_totals as
select
  ps.challenge_id,
  p.id as player_id,
  concat(p.first_name, ' ', p.last_initial, '.') as player_display_name,
  p.division,
  ps.approved_baskets_total,
  rank() over (
    partition by ps.challenge_id, p.division
    order by ps.approved_baskets_total desc, p.first_name asc
  ) as division_rank,
  rank() over (
    partition by ps.challenge_id
    order by ps.approved_baskets_total desc, p.first_name asc
  ) as overall_rank
from public.player_stats ps
join public.players p on p.id = ps.player_id
where p.is_active = true;

create or replace view public.community_goal_progress as
select
  c.id as challenge_id,
  c.name,
  c.community_goal_baskets,
  coalesce(sum(ps.approved_baskets_total), 0)::integer as approved_baskets_total,
  case
    when c.community_goal_baskets > 0 then
      round((coalesce(sum(ps.approved_baskets_total), 0)::numeric / c.community_goal_baskets) * 100, 1)
    else 0
  end as percent_complete
from public.challenges c
left join public.player_stats ps on ps.challenge_id = c.id
where c.is_active = true
group by c.id, c.name, c.community_goal_baskets;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

drop trigger if exists parent_invites_set_updated_at on public.parent_invites;
create trigger parent_invites_set_updated_at
before update on public.parent_invites
for each row execute function public.set_updated_at();

drop trigger if exists players_set_updated_at on public.players;
create trigger players_set_updated_at
before update on public.players
for each row execute function public.set_updated_at();

drop trigger if exists challenges_set_updated_at on public.challenges;
create trigger challenges_set_updated_at
before update on public.challenges
for each row execute function public.set_updated_at();

drop trigger if exists shot_submissions_set_updated_at on public.shot_submissions;
create trigger shot_submissions_set_updated_at
before update on public.shot_submissions
for each row execute function public.set_updated_at();

alter table public.profiles enable row level security;
alter table public.parent_invites enable row level security;
alter table public.players enable row level security;
alter table public.child_device_tokens enable row level security;
alter table public.challenges enable row level security;
alter table public.shot_submissions enable row level security;
alter table public.player_stats enable row level security;
alter table public.email_events enable row level security;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles
    where id = auth.uid()
      and role = 'admin'
  );
$$;

create policy "profiles can read own profile"
on public.profiles for select
using (id = auth.uid() or public.is_admin());

create policy "profiles can update own profile"
on public.profiles for update
using (id = auth.uid() or public.is_admin())
with check (id = auth.uid() or public.is_admin());

create policy "admins manage parent invites"
on public.parent_invites for all
using (public.is_admin())
with check (public.is_admin());

create policy "parents read own players"
on public.players for select
using (parent_profile_id = auth.uid() or public.is_admin());

create policy "parents update own players"
on public.players for update
using (parent_profile_id = auth.uid() or public.is_admin())
with check (parent_profile_id = auth.uid() or public.is_admin());

create policy "admins insert players"
on public.players for insert
with check (public.is_admin());

create policy "parents read own child device tokens"
on public.child_device_tokens for select
using (parent_profile_id = auth.uid() or public.is_admin());

create policy "parents manage own child device tokens"
on public.child_device_tokens for all
using (parent_profile_id = auth.uid() or public.is_admin())
with check (parent_profile_id = auth.uid() or public.is_admin());

create policy "authenticated users read active challenges"
on public.challenges for select
using (is_active = true or public.is_admin());

create policy "admins manage challenges"
on public.challenges for all
using (public.is_admin())
with check (public.is_admin());

create policy "parents read submissions for own players"
on public.shot_submissions for select
using (
  public.is_admin()
  or exists (
    select 1
    from public.players
    where players.id = shot_submissions.player_id
      and players.parent_profile_id = auth.uid()
  )
);

create policy "parents update submissions for own players"
on public.shot_submissions for update
using (
  public.is_admin()
  or exists (
    select 1
    from public.players
    where players.id = shot_submissions.player_id
      and players.parent_profile_id = auth.uid()
  )
)
with check (
  public.is_admin()
  or exists (
    select 1
    from public.players
    where players.id = shot_submissions.player_id
      and players.parent_profile_id = auth.uid()
  )
);

create policy "parents insert submissions for own players"
on public.shot_submissions for insert
with check (
  public.is_admin()
  or exists (
    select 1
    from public.players
    where players.id = shot_submissions.player_id
      and players.parent_profile_id = auth.uid()
  )
);

create policy "parents read stats for own players"
on public.player_stats for select
using (
  public.is_admin()
  or exists (
    select 1
    from public.players
    where players.id = player_stats.player_id
      and players.parent_profile_id = auth.uid()
  )
);

create policy "admins manage stats"
on public.player_stats for all
using (public.is_admin())
with check (public.is_admin());

create policy "admins manage email events"
on public.email_events for all
using (public.is_admin())
with check (public.is_admin());

insert into public.challenges (
  name,
  starts_on,
  ends_on,
  community_goal_baskets,
  is_active
)
values (
  'July Shot Challenge',
  '2026-07-01',
  '2026-07-31',
  250000,
  true
)
on conflict do nothing;
