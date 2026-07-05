import Link from "next/link";
import { cookies } from "next/headers";

import { AppHeaderBar } from "@/components/app/AppHeaderBar";
import { DeviceSetupSheetClient } from "@/components/features/pairing/DeviceSetupSheetClient";
import { PARENT_INVITE_SESSION_COOKIE } from "@/lib/parent-session";
import { createSupabaseAdminClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

type DeviceSetupPageProps = {
  params: Promise<{
    playerId: string;
  }>;
};

type Player = {
  id: string;
  first_name: string;
  grade: number;
  last_initial: string;
};

function getJerseyNumber(player: Player) {
  const numericLastInitial = Number.parseInt(player.last_initial, 10);

  if (Number.isInteger(numericLastInitial) && numericLastInitial > 0) {
    return numericLastInitial;
  }

  return player.grade;
}

async function getDeviceSetupData(playerId: string) {
  const cookieStore = await cookies();
  const inviteId = cookieStore.get(PARENT_INVITE_SESSION_COOKIE)?.value;
  const supabase = createSupabaseAdminClient();

  if (!inviteId || !supabase) {
    return null;
  }

  const [{ data: invite }, { data: player }, { count }] = await Promise.all([
    supabase
      .from("parent_invites")
      .select("parent_email")
      .eq("id", inviteId)
      .eq("status", "accepted")
      .single(),
    supabase
      .from("players")
      .select("id,first_name,last_initial,grade")
      .eq("id", playerId)
      .eq("invite_id", inviteId)
      .eq("is_active", true)
      .single(),
    supabase
      .from("shot_submissions")
      .select("id", { count: "exact", head: true })
      .eq("player_id", playerId)
      .eq("status", "pending"),
  ]);

  if (!invite || !player) {
    return null;
  }

  return {
    parentEmail: invite.parent_email,
    pendingApprovalCount: count ?? 0,
    player: player as Player,
  };
}

export default async function DeviceSetupPage({
  params,
}: DeviceSetupPageProps) {
  const { playerId } = await params;
  const data = await getDeviceSetupData(playerId);

  if (!data) {
    return (
      <main className="flex min-h-dvh flex-col bg-canton-cream-grid">
        <AppHeaderBar dashboardHref="/family" />
        <div className="flex flex-1 flex-col justify-center px-8 pb-10 pt-12">
          <div className="rounded-2xl border-2 border-canton-ink bg-white px-5 py-6 text-center">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-canton-green">
              Device Setup
            </p>
            <h1 className="mt-2 text-3xl font-black uppercase leading-tight text-canton-ink">
              Player Not Found
            </h1>
            <p className="mt-3 text-sm font-semibold leading-6 text-canton-muted">
              Return to your family dashboard and choose a player.
            </p>
            <Link
              href="/family"
              className="mt-5 inline-flex h-12 items-center justify-center rounded-xl bg-canton-green px-5 text-sm font-black uppercase tracking-wide text-white"
            >
              Family Dashboard
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <DeviceSetupSheetClient
      generatePath={`/family/${playerId}/device-setup/generate`}
      parentEmail={data.parentEmail}
      pendingApprovalCount={data.pendingApprovalCount}
      playerId={playerId}
      playerName={`${data.player.first_name} ${data.player.last_initial}.`}
      jerseyNumber={getJerseyNumber(data.player)}
    />
  );
}
