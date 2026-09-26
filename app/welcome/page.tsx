import Link from "next/link";
import { UserButton } from "@clerk/nextjs";

function BullseyeMark() {
  return (
    <div className="relative flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-white">
      <div className="h-4 w-4 rounded-full border-[3px] border-black" />
      <div className="absolute h-1.5 w-1.5 rounded-full bg-black" />
    </div>
  );
}

export default function WelcomePage() {
  return (
    <main className="min-h-screen bg-[#050507] text-white">
      <nav className="flex items-center justify-between px-5 py-5 sm:px-8">
        <Link href="/" className="flex items-center gap-3">
          <BullseyeMark />
          <span className="text-[15px] font-extrabold">
            BULLSEYE FX
          </span>
        </Link>

        <UserButton />
      </nav>

      <section className="flex min-h-[calc(100vh-80px)] flex-col items-center justify-center px-5 text-center">
        <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-full bg-[#FFD60A] text-3xl">
          🎯
        </div>

        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-[#FFD60A]">
          BULLSEYE FX
        </p>

        <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl">
          Welcome to Bullseye
        </h1>

        <p className="mt-5 max-w-md text-sm leading-6 text-white/40 sm:text-base">
          Connect your MT5 account
          <br />
          to get started.
        </p>

        <Link
          href="/connect-mt5"
          className="mt-9 inline-flex rounded-full bg-[#FFD60A] px-8 py-4 text-sm font-bold text-black transition hover:bg-[#ffe04a]"
        >
          Connect MT5
        </Link>

        <p className="mt-6 text-[10px] uppercase tracking-[0.18em] text-white/20">
          Secure • Automated • 24/7
        </p>
      </section>
    </main>
  );
}