alter table public.parent_invites
  drop constraint if exists parent_invites_division_check;

alter table public.parent_invites
  add constraint parent_invites_division_check
  check (
    division in (
      'elementary',
      'middle_school',
      'boys_elementary',
      'boys_middle_school',
      'girls_elementary',
      'girls_middle_school'
    )
  );

alter table public.players
  drop constraint if exists players_division_check;

alter table public.players
  add constraint players_division_check
  check (
    division in (
      'elementary',
      'middle_school',
      'boys_elementary',
      'boys_middle_school',
      'girls_elementary',
      'girls_middle_school'
    )
  );
