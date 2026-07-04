import { AppHeaderBar } from "@/components/app/AppHeaderBar";
import { FamilySummaryCard } from "@/components/features/family/FamilySummaryCard";
import { PlayerProfilePreviewCard } from "@/components/features/family/PlayerProfilePreviewCard";
import { hashInviteToken } from "@/lib/invite-token";
import { createSupabaseAdminClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

type InviteAcceptPageProps = {
  searchParams: Promise<{
    token?: string;
  }>;
};

type ParentInvite = {
  parent_email: string;
  player_first_name: string;
  player_last_initial: string;
  grade: number;
  division: string;
  status: string;
  expires_at: string;
};

function formatDivision(division: string) {
  return division
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function getJerseyNumber(invite: ParentInvite) {
  const numericLastInitial = Number.parseInt(invite.player_last_initial, 10);

  if (Number.isInteger(numericLastInitial) && numericLastInitial > 0) {
    return numericLastInitial;
  }

  return invite.grade;
}

async function getInvite(token?: string) {
  if (!token) {
    return null;
  }

  const supabase = createSupabaseAdminClient();

  if (!supabase) {
    return null;
  }

  const { data, error } = await supabase
    .from("parent_invites")
    .select(
      "parent_email,player_first_name,player_last_initial,grade,division,status,expires_at",
    )
    .eq("token_hash", hashInviteToken(token))
    .single();

  if (error || !data) {
    return null;
  }

  return data as ParentInvite;
}

function InviteUnavailable() {
  return (
    <main className="flex min-h-dvh flex-col bg-canton-cream-grid">
      <AppHeaderBar />
      <div className="flex flex-1 flex-col justify-center px-8 pb-10 pt-12">
        <div className="rounded-2xl border-2 border-canton-ink bg-white px-5 py-6 text-center">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-canton-green">
            Invite
          </p>
          <h1 className="mt-2 text-3xl font-black uppercase leading-tight text-canton-ink">
            Link Not Ready
          </h1>
          <p className="mt-3 text-sm font-semibold leading-6 text-canton-muted">
            This invite link is missing, expired, or no longer active.
          </p>
        </div>
      </div>
    </main>
  );
}

export default async function InviteAcceptPage({
  searchParams,
}: InviteAcceptPageProps) {
  const { token } = await searchParams;
  const invite = await getInvite(token);

  if (
    !invite ||
    invite.status === "cancelled" ||
    new Date(invite.expires_at) < new Date()
  ) {
    return <InviteUnavailable />;
  }

  return (
    <main className="flex min-h-dvh flex-col bg-canton-cream-grid">
      <AppHeaderBar />
      <div className="flex flex-1 flex-col items-center gap-16 px-10 pb-10 pt-12">
        <FamilySummaryCard parentEmail={invite.parent_email} />
        <PlayerProfilePreviewCard
          playerName={`${invite.player_first_name} ${invite.player_last_initial}.`}
          jerseyNumber={getJerseyNumber(invite)}
          leagueLabel={formatDivision(invite.division)}
          onAcceptHref="/family"
        />
      </div>
    </main>
  );
}
