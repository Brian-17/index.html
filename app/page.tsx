import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

const stats = [
  {
    label: "MARKET ENGINE",
    value: "AI-POWERED",
    sub: "Smart Money Concepts",
  },
  {
    label: "EXECUTION",
    value: "MT5 READY",
    sub: "Fast automated execution",
  },
  {
    label: "AVAILABILITY",
    value: "24 / 7",
    sub: "Cloud bot infrastructure",
  },
];

function BullseyeMark() {
  return (
    <div className="relative flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-white">
      <div className="h-4 w-4 rounded-full border-[3px] border-black" />
      <div className="absolute h-1.5 w-1.5 rounded-full bg-black" />
    </div>
  );
}

function ArrowUpRight() {
  return (
    <svg
      viewBox="0 0 20 20"
      className="h-4 w-4"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M5 15 15 5M7 5h8v8"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Chart() {
  return (
    <svg
      viewBox="0 0 900 360"
      className="h-full w-full"
      preserveAspectRatio="none"
      aria-label="Bullseye trading chart"
    >
      <defs>
        <linearGradient id="area" x1="0" x2="0" y1="0" y2="1">
          <stop
            offset="0%"
            stopColor="#FFD60A"
            stopOpacity="0.22"
          />
          <stop
            offset="100%"
            stopColor="#FFD60A"
            stopOpacity="0"
          />
        </linearGradient>
      </defs>

      <g opacity="0.08" stroke="white">
        <path d="M0 60H900" />
        <path d="M0 120H900" />
        <path d="M0 180H900" />
        <path d="M0 240H900" />
        <path d="M0 300H900" />

        <path d="M90 0V360" />
        <path d="M180 0V360" />
        <path d="M270 0V360" />
        <path d="M360 0V360" />
        <path d="M450 0V360" />
        <path d="M540 0V360" />
        <path d="M630 0V360" />
        <path d="M720 0V360" />
        <path d="M810 0V360" />
      </g>

      <path
        d="M0 310
        C50 300 65 275 105 285
        S160 270 195 255
        S245 265 275 230
        S330 205 360 220
        S410 185 445 195
        S485 160 520 178
        S565 130 605 148
        S650 115 685 128
        S735 82 770 105
        S825 68 900 45
        L900 360
        L0 360Z"
        fill="url(#area)"
      />

      <path
        d="M0 310
        C50 300 65 275 105 285
        S160 270 195 255
        S245 265 275 230
        S330 205 360 220
        S410 185 445 195
        S485 160 520 178
        S565 130 605 148
        S650 115 685 128
        S735 82 770 105
        S825 68 900 45"
        fill="none"
        stroke="#FFD60A"
        strokeWidth="4"
        strokeLinecap="round"
      />

      <circle
        cx="900"
        cy="45"
        r="6"
        fill="#FFD60A"
      />

      <circle
        cx="900"
        cy="45"
        r="14"
        fill="#FFD60A"
        opacity="0.12"
      />
    </svg>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#050507] text-white selection:bg-[#FFD60A] selection:text-black">

      {/* Background glow */}
      <div className="pointer-events-none fixed inset-0 -z-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,214,10,0.07),transparent_32%)]" />

      {/* NAVBAR */}
      <nav className="relative z-10 mx-auto flex max-w-[1380px] items-center justify-between px-5 py-5 sm:px-8 lg:px-12">

        <Link
          href="/"
          className="flex items-center gap-3"
          aria-label="Bullseye FX home"
        >
          <BullseyeMark />

          <span className="text-[15px] font-extrabold tracking-[-0.02em] sm:text-[17px]">
            BULLSEYE FX
          </span>
        </Link>

        <div className="flex items-center gap-2.5 sm:gap-5">

          <SignedOut>
            <Link
              href="/sign-in"
              className="hidden text-sm font-medium text-white/55 transition hover:text-white sm:block"
            >
              Sign In
            </Link>
          </SignedOut>

          <SignedIn>
            <UserButton />
          </SignedIn>

          <Link
            href="/connect-mt5"
            className="group inline-flex items-center gap-2 rounded-full bg-[#FFD60A] px-4 py-2.5 text-[12px] font-bold text-black transition hover:scale-[1.02] hover:bg-[#ffe04a] sm:px-5 sm:text-[13px]"
          >
            Connect MT5
            <ArrowUpRight />
          </Link>

        </div>
      </nav>

      {/* HERO */}
      <section className="relative z-10 mx-auto max-w-[1380px] px-5 pb-20 pt-14 text-center sm:px-8 sm:pt-20 lg:px-12 lg:pt-24">

        {/* Badge */}
        <div className="mx-auto inline-flex max-w-full items-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-4 py-2 text-[10px] font-medium text-white/65 shadow-[0_0_40px_rgba(255,214,10,0.04)] sm:text-[11px]">

          <span className="h-1.5 w-1.5 shrink-0 animate-pulse rounded-full bg-emerald-400" />

          AI TRADING • MT5 • CLOUD BOTS • 24/7 VPS

        </div>

        {/* Main heading */}
        <h1 className="mx-auto mt-8 max-w-[900px] text-[50px] font-semibold leading-[0.91] tracking-[-0.055em] sm:text-[70px] md:text-[88px] lg:text-[100px]">

          AI Trading

          <br />

          <span className="text-[#FFD60A]">
            that runs itself
          </span>

          <br />

          <span className="text-white">
            24/7
          </span>

        </h1>

        {/* Description */}
        <p className="mx-auto mt-7 max-w-[610px] text-[14px] leading-6 text-white/45 sm:text-[16px] sm:leading-7">
          Connect your MT5 account and let Bullseye automate your trading
          workflow with AI signals, Smart Money Concepts and cloud-based
          execution.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">

          <Link
            href="/sign-up"
            className="inline-flex w-full max-w-[260px] items-center justify-center gap-2 rounded-full bg-[#FFD60A] px-7 py-4 text-sm font-bold text-black transition hover:scale-[1.02] hover:bg-[#ffe04a]"
          >
            Start Free on MT5
            <ArrowUpRight />
          </Link>

          <Link
            href="#how-it-works"
            className="inline-flex w-full max-w-[260px] items-center justify-center rounded-full border border-white/10 bg-white/[0.025] px-7 py-4 text-sm font-semibold text-white/70 transition hover:border-white/20 hover:text-white sm:w-auto"
          >
            See how it works
          </Link>

        </div>

        {/* TRADING TERMINAL */}
        <div className="mx-auto mt-16 max-w-[1120px] overflow-hidden rounded-[28px] border border-white/10 bg-[#0b0b0d] p-2 shadow-[0_25px_100px_rgba(0,0,0,0.45)] sm:mt-20 sm:p-3">

          <div className="overflow-hidden rounded-[21px] border border-white/[0.06] bg-[#070709]">

            {/* Terminal header */}
            <div className="flex items-center justify-between border-b border-white/[0.07] px-4 py-3 sm:px-5">

              <div className="flex items-center gap-2.5">

                <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(74,222,128,0.5)]" />

                <span className="font-mono text-[10px] font-semibold tracking-[0.12em] text-white/60 sm:text-[11px]">
                  BULLSEYE SNIPER
                </span>

              </div>

              <div className="hidden items-center gap-4 font-mono text-[9px] tracking-[0.12em] text-white/30 sm:flex">
                <span>NAS100</span>
                <span>M15</span>
                <span>LIVE</span>
              </div>

              <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2.5 py-1 font-mono text-[9px] font-bold text-emerald-300">
                RUNNING
              </span>

            </div>

            {/* Terminal body */}
            <div className="grid min-h-[310px] grid-cols-1 lg:grid-cols-[1fr_250px]">

              {/* Chart */}
              <div className="relative min-h-[280px] p-4 sm:p-6">

                <div className="absolute left-5 top-5 font-mono text-[9px] text-white/25 sm:left-6 sm:top-6">
                  67,420.00
                </div>

                <div className="absolute bottom-5 left-5 font-mono text-[9px] text-white/25 sm:left-6">
                  66,980.00
                </div>

                <Chart />

                <div className="absolute bottom-8 left-[57%] rounded-lg border border-[#FFD60A]/20 bg-[#FFD60A]/10 px-2.5 py-1.5 font-mono text-[9px] font-bold text-[#FFD60A]">
                  BUY • 67,420
                </div>

              </div>

              {/* AI signal panel */}
              <div className="border-t border-white/[0.07] p-4 lg:border-l lg:border-t-0">

                <div className="flex items-center justify-between">

                  <span className="font-mono text-[9px] tracking-[0.12em] text-white/35">
                    AI MARKET BIAS
                  </span>

                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />

                </div>

                <div className="mt-3 rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4">

                  <p className="text-xs font-semibold text-white/45">
                    Current signal
                  </p>

                  <p className="mt-1 text-2xl font-bold tracking-tight text-[#FFD60A]">
                    BULLISH
                  </p>

                  <p className="mt-1 font-mono text-[9px] text-white/30">
                    CONFIDENCE 87%
                  </p>

                </div>

                <div className="mt-3 grid grid-cols-2 gap-2">

                  <div className="rounded-xl border border-white/[0.07] bg-white/[0.025] p-3">

                    <p className="font-mono text-[8px] text-white/30">
                      ENTRY
                    </p>

                    <p className="mt-1 text-xs font-bold">
                      67,420
                    </p>

                  </div>

                  <div className="rounded-xl border border-white/[0.07] bg-white/[0.025] p-3">

                    <p className="font-mono text-[8px] text-white/30">
                      TIMEFRAME
                    </p>

                    <p className="mt-1 text-xs font-bold">
                      M15
                    </p>

                  </div>

                </div>

              </div>

            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mx-auto mt-5 grid max-w-[1120px] grid-cols-1 gap-3 sm:grid-cols-3">

          {stats.map((stat) => (

            <div
              key={stat.label}
              className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5 text-left transition hover:border-white/[0.12] hover:bg-white/[0.035]"
            >

              <p className="font-mono text-[9px] font-semibold tracking-[0.16em] text-white/30">
                {stat.label}
              </p>

              <p className="mt-2 text-base font-bold tracking-tight text-white">
                {stat.value}
              </p>

              <p className="mt-1 text-xs text-white/35">
                {stat.sub}
              </p>

            </div>

          ))}

        </div>

      </section>

      {/* HOW IT WORKS */}
      <section
        id="how-it-works"
        className="relative z-10 border-t border-white/[0.06] bg-white/[0.012]"
      >

        <div className="mx-auto max-w-[1380px] px-5 py-20 sm:px-8 lg:px-12 lg:py-24">

          <div className="max-w-2xl">

            <p className="font-mono text-[10px] font-bold tracking-[0.2em] text-[#FFD60A]">
              THE BULLSEYE FLOW
            </p>

            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] sm:text-5xl">
              From MT5 connection to automated execution.
            </h2>

            <p className="mt-5 text-sm leading-6 text-white/40 sm:text-base">
              A simple workflow designed to keep your trading setup connected,
              monitored and ready to execute.
            </p>

          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-3">

            {[
              [
                "01",
                "Connect MT5",
                "Securely link your MetaTrader 5 trading account to Bullseye FX.",
              ],
              [
                "02",
                "Choose your bot",
                "Select the strategy and market workflow you want Bullseye to run.",
              ],
              [
                "03",
                "Let it run",
                "Your cloud bot stays active around the clock while you monitor performance.",
              ],
            ].map(([num, title, text]) => (

              <div
                key={num}
                className="group rounded-3xl border border-white/[0.07] bg-[#0a0a0c] p-6 sm:p-7"
              >

                <div className="flex items-center justify-between">

                  <span className="font-mono text-xs text-[#FFD60A]">
                    {num}
                  </span>

                  <ArrowUpRight />

                </div>

                <h3 className="mt-12 text-xl font-bold tracking-tight">
                  {title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-white/35">
                  {text}
                </p>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* FOOTER */}
      <footer className="relative z-10 border-t border-white/[0.06] px-5 py-8 sm:px-8 lg:px-12">

        <div className="mx-auto flex max-w-[1380px] flex-col gap-3 text-xs text-white/25 sm:flex-row sm:items-center sm:justify-between">

          <span>
            © {new Date().getFullYear()} Bullseye FX
          </span>

          <span>
            AI trading infrastructure • MT5 • 24/7
          </span>

        </div>

      </footer>

    </main>
  );
}
