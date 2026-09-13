import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

function BullseyeMark() {
  return (
    <div className="relative flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-white">
      <div className="h-4 w-4 rounded-full border-[3px] border-black" />
      <div className="absolute h-1.5 w-1.5 rounded-full bg-black" />
    </div>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050507] text-white">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,214,10,0.08),transparent_35%)]" />

      {/* Navigation */}
      <nav className="relative mx-auto flex max-w-6xl items-center justify-between px-5 py-5 sm:px-8">
        <Link href="/" className="flex items-center gap-3">
          <BullseyeMark />

          <span className="text-[15px] font-extrabold tracking-tight sm:text-base">
            BULLSEYE FX
          </span>
        </Link>

        <div className="flex items-center gap-4">
          <SignedOut>
            <Link
              href="/sign-in"
              className="text-sm font-medium text-white/55 transition hover:text-white"
            >
              Sign In
            </Link>
          </SignedOut>

          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative mx-auto flex min-h-[calc(100vh-80px)] max-w-5xl flex-col items-center justify-center px-5 pb-20 pt-8 text-center sm:px-8">
        
        <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-[10px] font-medium tracking-wide text-white/55 sm:text-[11px]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#FFD60A]" />
          AI TRADING • MT5 • 24/7
        </div>

        <h1 className="max-w-4xl text-[52px] font-semibold leading-[0.92] tracking-[-0.055em] sm:text-7xl md:text-8xl">
          AI Trading
          <br />
          <span className="text-[#FFD60A]">that runs itself</span>
          <br />
          24/7
        </h1>

        <p className="mx-auto mt-7 max-w-xl text-sm leading-6 text-white/40 sm:text-base sm:leading-7">
          Automated trading infrastructure built around your MT5 account.
        </p>

        {/* Buttons */}
        <div className="mt-9 flex w-full max-w-md flex-col gap-3 sm:flex-row sm:justify-center">
          <SignedOut>
            <Link
              href="/sign-up"
              className="inline-flex w-full items-center justify-center rounded-full bg-[#FFD60A] px-7 py-4 text-sm font-bold text-black transition hover:bg-[#ffe04a]"
            >
              Start Free
            </Link>

            <Link
              href="/sign-in"
              className="inline-flex w-full items-center justify-center rounded-full border border-white/10 bg-white/[0.025] px-7 py-4 text-sm font-semibold text-white/70 transition hover:border-white/20 hover:text-white"
            >
              Sign In
            </Link>
          </SignedOut>

          <SignedIn>
            <Link
              href="/connect-mt5"
              className="inline-flex w-full items-center justify-center rounded-full bg-[#FFD60A] px-7 py-4 text-sm font-bold text-black transition hover:bg-[#ffe04a]"
            >
              Connect MT5
            </Link>
          </SignedIn>
        </div>

        <p className="mt-7 text-[10px] uppercase tracking-[0.18em] text-white/20">
          Connect • Configure • Run
        </p>
      </section>
    </main>
  );
}
