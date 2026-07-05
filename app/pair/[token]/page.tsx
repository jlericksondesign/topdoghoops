import Image from "next/image";
import { AppHeaderBar } from "@/components/app/AppHeaderBar";
import { PairingSuccessCard } from "@/components/features/pairing/PairingSuccessCard";
import { hashInviteToken } from "@/lib/invite-token";
import { createSupabaseAdminClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

type PairAcceptancePageProps = {
  params: Promise<{
    token: string;
  }>;
};

type Player = {
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

async function getPairingData(token: string) {
  const supabase = createSupabaseAdminClient();

  if (!supabase) {
    return null;
  }

  const { data: deviceToken } = await supabase
    .from("child_device_tokens")
    .select(
      "revoked_at,expires_at,players!inner(first_name,last_initial,grade)",
    )
    .eq("token_hash", hashInviteToken(token))
    .single();

  if (
    !deviceToken ||
    deviceToken.revoked_at ||
    (deviceToken.expires_at && new Date(deviceToken.expires_at) < new Date())
  ) {
    return null;
  }

  const player = Array.isArray(deviceToken.players)
    ? deviceToken.players[0]
    : deviceToken.players;

  if (!player) {
    return null;
  }

  return {
    playerName: `${player.first_name} ${player.last_initial}.`,
    jerseyNumber: getJerseyNumber(player),
  };
}

export default async function PairAcceptancePage({
  params,
}: PairAcceptancePageProps) {
  const { token } = await params;
  const pairingData = await getPairingData(token);

  return (
    <main className="flex min-h-dvh flex-col bg-canton-grid">
      <AppHeaderBar dashboardHref="/player" />
      <div className="flex flex-1 flex-col items-center px-10 pb-10 pt-8">
        <div className="flex flex-1 items-center justify-center">
          <Image
            src="/bulldog-mascot.png"
            alt="Top Dog Hoops mascot"
            width={600}
            height={590}
            priority
            className="h-auto w-56"
          />
        </div>
        {pairingData ? (
          <PairingSuccessCard
            playerName={pairingData.playerName}
            jerseyNumber={pairingData.jerseyNumber}
            startHref={`/pair/${token}/activate`}
          />
        ) : (
          <div className="w-full rounded-2xl border-2 border-canton-ink bg-white px-5 py-6 text-center">
            <h1 className="text-3xl font-black uppercase leading-tight text-canton-ink">
              Link Not Ready
            </h1>
            <p className="mt-3 text-sm font-semibold leading-6 text-canton-muted">
              Ask your parent to generate a new player device link.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
