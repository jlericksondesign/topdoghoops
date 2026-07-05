import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  return (
    <main className="bg-canton-grid flex min-h-dvh flex-col items-center px-9 pb-[72px] pt-14">
      <h1 className="canton-wordmark text-center text-[68px] uppercase leading-[1.01] tracking-normal min-[390px]:text-[78px]">
        <span className="whitespace-nowrap">Top Dog</span>
        <br />
        <span>Hoops</span>
      </h1>

      <Image
        src="/bulldog-mascot.png"
        alt="Top Dog Hoops mascot"
        width={600}
        height={590}
        priority
        className="mt-[30px] h-auto w-[234px]"
      />

      <div className="flex-1" />

      <div className="flex w-full flex-col gap-4">
        <Link
          href="/parent/link-request"
          className="rounded-2xl border-2 border-white bg-canton-green py-4 text-center text-base font-bold uppercase tracking-wide text-white shadow-[0_4px_0_rgba(0,0,0,0.15)]"
        >
          Parent Sign In
        </Link>
        <Link
          href="/kid/sign-in"
          className="rounded-2xl border-2 border-white bg-canton-orange py-4 text-center text-base font-bold uppercase tracking-wide text-white shadow-[0_4px_0_rgba(0,0,0,0.15)]"
        >
          Kid Sign In
        </Link>
      </div>
    </main>
  );
}
