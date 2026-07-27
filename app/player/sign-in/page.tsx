import { AppHeaderBar } from "@/components/app/AppHeaderBar";
import { PlayerSignInRequestForm } from "@/components/features/auth/PlayerSignInRequestForm";

export default function PlayerSignInPage() {
  return (
    <main className="flex min-h-dvh flex-col bg-canton-cream-grid">
      <AppHeaderBar dashboardHref="/player" />
      <div className="flex flex-1 flex-col justify-center px-8 pb-10 pt-12">
        <div className="rounded-2xl border-2 border-canton-ink bg-white px-5 py-6 text-center">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-canton-green">
            Player Access
          </p>
          <h1 className="mt-2 text-3xl font-black uppercase leading-tight text-canton-ink">
            Player Sign In
          </h1>
          <p className="mt-3 text-sm font-semibold leading-6 text-canton-muted">
            Enter your parent&apos;s email. If it is linked to a player, we&apos;ll
            send your parent a sign-in link so they can set up this device.
          </p>
          <PlayerSignInRequestForm />
        </div>
      </div>
    </main>
  );
}
