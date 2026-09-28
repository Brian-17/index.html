import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

function BullseyeMark() {
  return (
    <div className="relative flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white">
      <div className="h-5 w-5 rounded-full border-[3px] border-black" />
      <div className="absolute h-2 w-2 rounded-full bg-black" />
    </div>
  );
}

function StatusDot() {
  return (
    <span className="relative flex h-2 w-2">
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#FFD60A] opacity-60" />
      <span className="relative inline-flex h-2 w-2 rounded-full bg-[#FFD60A]" />
    </span>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#050506] text-white">

      {/* Background */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-[#FFD60A]/[0.055] blur-[140px]" />

        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:70px_70px] opacity-30" />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8 lg:px-10">

        <Link href="/" className="flex items-center gap-3">
          <BullseyeMark />

          <div>
            <div className="text-[14px] font-black tracking-tight sm:text-[15px]">
              BULLSEYE FX
            </div>

            <div className="hidden text-[8px] font-medium tracking-[0.25em] text-white/30 sm:block">
              AI TRADING SYSTEM
            </div>
          </div>
        </Link>

        <div className="flex items-center gap-5">
          <SignedOut>
            <Link
              href="/sign-in"
              className="text-sm font-medium text-white/45 transition hover:text-white"
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
      <section className="relative z-10 mx-auto flex min-h-[calc(100vh-82px)] max-w-7xl flex-col items-center px-5 pb-16 pt-14 text-center sm:px-8 sm:pt-20 lg:pt-24">

        {/* Status badge */}
        <div className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.035] px-4 py-2.5 shadow-[0_0_30px_rgba(255,214,10,0.04)] backdrop-blur-xl">
          <StatusDot />

          <span className="text-[10px] font-semibold tracking-[0.16em] text-white/55 sm:text-[11px]">
            AI TRADING
          </span>

          <span className="text-white/15">•</span>

          <span className="text-[10px] font-semibold tracking-[0.16em] text-white/55 sm:text-[11px]">
            MT5
          </span>

          <span className="text-white/15">•</span>

          <span className="text-[10px] font-semibold tracking-[0.16em] text-white/55 sm:text-[11px]">
            24/7
          </span>
        </div>

        {/* Main heading */}
        <h1 className="max-w-5xl text-[55px] font-semibold leading-[0.9] tracking-[-0.065em] sm:text-7xl md:text-8xl lg:text-[104px]">

          <span className="block">AI Trading</span>

          <span className="mt-2 block text-[#FFD60A]">
            that runs itself
          </span>

          <span className="mt-2 block">
            24/7
          </span>

        </h1>

        <p className="mt-7 max-w-xl text-sm leading-6 text-white/40 sm:text-base sm:leading-7">
          Intelligent trading infrastructure built around your MT5 account.
          Connect once. Configure your strategy. Let Bullseye work.
        </p>

        {/* Buttons */}
        <div className="mt-9 flex w-full max-w-md flex-col gap-3 sm:flex-row">

          <SignedOut>
            <Link
              href="/sign-up"
              className="group inline-flex h-14 w-full items-center justify-center rounded-full bg-[#FFD60A] px-7 text-sm font-bold text-black shadow-[0_10px_40px_rgba(255,214,10,0.12)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#ffe04a] hover:shadow-[0_15px_50px_rgba(255,214,10,0.2)]"
            >
              Start Free

              <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>

            <Link
              href="/sign-in"
              className="inline-flex h-14 w-full items-center justify-center rounded-full border border-white/10 bg-white/[0.025] px-7 text-sm font-semibold text-white/65 backdrop-blur-xl transition duration-300 hover:border-white/20 hover:bg-white/[0.05] hover:text-white"
            >
              Sign In
            </Link>
          </SignedOut>

          <SignedIn>
            <Link
              href="/connect-mt5"
              className="group inline-flex h-14 w-full items-center justify-center rounded-full bg-[#FFD60A] px-7 text-sm font-bold text-black shadow-[0_10px_40px_rgba(255,214,10,0.12)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#ffe04a]"
            >
              Connect MT5

              <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </SignedIn>

        </div>

        {/* Product preview */}
        <div className="relative mt-20 w-full max-w-5xl sm:mt-24">

          {/* Glow */}
          <div className="absolute left-1/2 top-10 h-56 w-3/4 -translate-x-1/2 rounded-full bg-[#FFD60A]/[0.06] blur-[90px]" />

          {/* Terminal */}
          <div className="relative overflow-hidden rounded-[24px] border border-white/10 bg-[#0b0b0d]/90 text-left shadow-[0_30px_100px_rgba(0,0,0,0.55)] backdrop-blur-xl">

            {/* Terminal header */}
            <div className="flex items-center justify-between border-b border-white/[0.07] px-5 py-4 sm:px-6">

              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-white/10" />
                  <span className="h-2 w-2 rounded-full bg-white/10" />
                  <span className="h-2 w-2 rounded-full bg-white/10" />
                </div>

                <span className="ml-2 text-[10px] font-semibold tracking-[0.18em] text-white/30">
                  BULLSEYE COMMAND
                </span>
              </div>

              <div className="flex items-center gap-2">
                <StatusDot />
                <span className="text-[9px] font-semibold tracking-wider text-white/35">
                  SYSTEM READY
                </span>
              </div>

            </div>

            {/* Terminal body */}
            <div className="grid gap-4 p-4 sm:grid-cols-3 sm:p-6">

              {/* AI card */}
              <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5 sm:col-span-2">

                <div className="flex items-start justify-between">

                  <div>
                    <p className="text-[9px] font-semibold tracking-[0.2em] text-white/25">
                      BULLSEYE AI
                    </p>

                    <h3 className="mt-2 text-lg font-semibold">
                      Market Intelligence
                    </h3>
                  </div>

                  <div className="rounded-full border border-[#FFD60A]/15 bg-[#FFD60A]/[0.06] px-3 py-1.5">
                    <span className="text-[9px] font-semibold text-[#FFD60A]">
                      ACTIVE
                    </span>
                  </div>

                </div>

                {/* Fake chart — visual only */}
                <div className="relative mt-7 h-32 overflow-hidden rounded-xl border border-white/[0.05] bg-black/20">

                  <div className="absolute inset-x-0 top-1/4 border-t border-white/[0.04]" />
                  <div className="absolute inset-x-0 top-2/4 border-t border-white/[0.04]" />
                  <div className="absolute inset-x-0 top-3/4 border-t border-white/[0.04]" />

                  <svg
                    viewBox="0 0 700 150"
                    preserveAspectRatio="none"
                    className="absolute inset-0 h-full w-full"
                  >
                    <path
                      d="M0 120 C45 115 55 90 100 105 C145 120 155 75 200 88 C245 100 260 65 300 72 C340 80 360 45 405 58 C450 70 465 35 510 50 C550 63 580 25 620 40 C650 48 675 20 700 28"
                      fill="none"
                      stroke="currentColor"
                      className="text-[#FFD60A]"
                      strokeWidth="3"
                    />
                  </svg>

                </div>

                <div className="mt-4 flex items-center justify-between">

                  <div>
                    <p className="text-[8px] uppercase tracking-[0.18em] text-white/25">
                      Market status
                    </p>

                    <p className="mt-1 text-xs font-medium text-white/65">
                      Monitoring
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-[8px] uppercase tracking-[0.18em] text-white/25">
                      Engine
                    </p>

                    <p className="mt-1 text-xs font-medium text-[#FFD60A]">
                      Ready
                    </p>
                  </div>

                </div>

              </div>

              {/* Right column */}
              <div className="grid gap-4 sm:grid-rows-2">

                <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5">

                  <p className="text-[9px] font-semibold tracking-[0.2em] text-white/25">
                    MT5 ACCOUNT
                  </p>

                  <div className="mt-4 flex items-center gap-2">
                    <StatusDot />

                    <span className="text-sm font-semibold">
                      Awaiting connection
                    </span>
                  </div>

                  <p className="mt-2 text-[10px] leading-5 text-white/25">
                    Connect your MT5 account to activate live account data.
                  </p>

                </div>

                <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5">

                  <p className="text-[9px] font-semibold tracking-[0.2em] text-white/25">
                    AUTOMATION
                  </p>

                  <p className="mt-3 text-2xl font-semibold tracking-tight">
                    24<span className="text-[#FFD60A]">/</span>7
                  </p>

                  <p className="mt-1 text-[10px] text-white/25">
                    Built for continuous operation
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* Bottom statement */}
        <div className="mt-10 flex items-center gap-3 text-[9px] font-semibold uppercase tracking-[0.25em] text-white/20">
          <span>Connect</span>
          <span>•</span>
          <span>Configure</span>
          <span>•</span>
          <span>Automate</span>
        </div>

      </section>
    </main>
  );
      }
