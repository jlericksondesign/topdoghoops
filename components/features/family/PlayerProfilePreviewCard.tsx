import Link from "next/link";
import { PlayerIdentityRow } from "@/components/features/family/PlayerIdentityRow";

type PlayerProfilePreviewCardProps = {
  playerName: string;
  jerseyNumber: number;
  onAcceptHref?: string;
  acceptToken?: string;
  leagueLabel?: string;
};

export function PlayerProfilePreviewCard({
  playerName,
  jerseyNumber,
  onAcceptHref,
  acceptToken,
  leagueLabel,
}: PlayerProfilePreviewCardProps) {
  return (
    <div className="w-full">
      <div className="overflow-hidden rounded-2xl bg-canton-card">
        <PlayerIdentityRow
          playerName={playerName}
          jerseyNumber={jerseyNumber}
          leagueLabel={leagueLabel}
        />
        <div className="px-5 pb-5 pt-1">
          {acceptToken ? (
            <form action="/invite/accept/confirm" method="post">
              <input type="hidden" name="token" value={acceptToken} />
              <button
                type="submit"
                className="block w-full rounded-xl bg-canton-green py-2.5 text-center text-sm font-bold uppercase tracking-wide text-white"
              >
                Accept &amp; Continue
              </button>
            </form>
          ) : (
            <Link
              href={onAcceptHref ?? "/family"}
              className="block rounded-xl bg-canton-green py-2.5 text-center text-sm font-bold uppercase tracking-wide text-white"
            >
              Accept &amp; Continue
            </Link>
          )}
        </div>
      </div>
      <p className="mt-3 text-center text-xs text-canton-muted">
        By continuing you confirm this is your child&apos;s account.
      </p>
    </div>
  );
}
