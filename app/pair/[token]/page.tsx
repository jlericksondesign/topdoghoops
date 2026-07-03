import Image from "next/image";
import { AppHeaderBar } from "@/components/app/AppHeaderBar";
import { PairingSuccessCard } from "@/components/features/pairing/PairingSuccessCard";

export default function PairAcceptancePage() {
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
        <PairingSuccessCard
          playerName="Marcus Johnson"
          jerseyNumber={23}
          startHref="/player"
        />
      </div>
    </main>
  );
}
