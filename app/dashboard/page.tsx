import Link from "next/link";
import { UserButton } from "@clerk/nextjs";

function BullseyeMark() {
  return (
    <div className="relative flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white">
      <div className="h-4 w-4 rounded-full border-[3px] border-black" />
      <div className="absolute h-1.5 w-1.5 rounded-full bg-black" />
    </div>
  );
}

function StatusDot() {
  return (
    <span className="relative flex h-2 w-2">
      <span className="absolute inline-flex h-full w-full rounded-full bg-[#FFD60A] opacity-40" />
      <span className="relative inline-flex h-2 w-2 rounded-full bg-[#FFD60A]" />
    </span>
  );
}

function StatCard({
  label,
  value,
  subtitle,
}: {
  label: string;
  value: string;
  subtitle: string;
}) {
  return (
    <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5">
      <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-white/25">
        {label}
      </p>

      <p className="mt-4 text-2xl font-semibold tracking-tight">
        {value}
      </p>

      <p className="mt-1 text-[10px] text-white/25">
        {subtitle}
      </p>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-[#050506] text-white">
      {/* Background */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-[#FFD60A]/[0.035] blur-[140px]" />

        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.018)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.018)_1px,transparent_1px)] bg-[size:70px_70px]" />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 border-b border-white/[0.06]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8 lg:px-10">
          <Link href="/" className="flex items-center gap-3">
            <BullseyeMark />

            <div>
              <div className="text-[13px] font-black tracking-tight">
                BULLSEYE FX
              </div>

              <div className="hidden text-[8px] font-medium tracking-[0.25em] text-white/25 sm:block">
                COMMAND CENTER
              </div>
            </div>
          </Link>

          <div className="flex items-center gap-4">
            <div className="hidden items-center gap-2 rounded-full border border-white/[0.07] bg-white/[0.025] px-3 py-2 sm:flex">
              <StatusDot />

              <span className="text-[9px] font-semibold uppercase tracking-[0.15em] text-white/35">
                System
              </span>
            </div>

            <UserButton />
          </div>
        </div>
      </nav>

      {/* Dashboard */}
      <section className="relative z-10 mx-auto max-w-7xl px-5 py-7 sm:px-8 lg:px-10">

        {/* Header */}
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-[#FFD60A]">
              BULLSEYE COMMAND
            </p>

            <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
              Dashboard
            </h1>

            <p className="mt-2 text-sm text-white/30">
              Your trading command center.
            </p>
          </div>

          <Link
            href="/connect-mt5"
            className="inline-flex h-11 items-center justify-center rounded-full bg-[#FFD60A] px-5 text-xs font-bold text-black transition hover:bg-[#ffe04a]"
          >
            Connect MT5 →
          </Link>
        </div>

        {/* Connection banner */}
        <div className="mt-8 flex flex-col gap-4 rounded-2xl border border-[#FFD60A]/15 bg-[#FFD60A]/[0.035] p-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FFD60A]/10">
              <StatusDot />
            </div>

            <div>
              <p className="text-sm font-semibold">
                MT5 connection
              </p>

              <p className="mt-1 text-[10px] text-white/30">
                Account data is awaiting the live MT5 bridge.
              </p>
            </div>
          </div>

          <span className="w-fit rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.15em] text-white/35">
            Pending
          </span>
        </div>

        {/* Stats */}
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          <StatCard
            label="Balance"
            value="—"
            subtitle="Awaiting live MT5 data"
          />

          <StatCard
            label="Equity"
            value="—"
            subtitle="Awaiting live MT5 data"
          />

          <StatCard
            label="Open Trades"
            value="—"
            subtitle="Awaiting live MT5 data"
          />

          <StatCard
            label="Win Rate"
            value="—"
            subtitle="Performance data unavailable"
          />

        </div>

        {/* Main grid */}
        <div className="mt-5 grid gap-5 lg:grid-cols-3">

          {/* Chart */}
          <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5 lg:col-span-2">

            <div className="flex items-center justify-between">
              <div>
                <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-white/25">
                  MARKET
                </p>

                <h2 className="mt-2 text-lg font-semibold">
                  Market Overview
                </h2>
              </div>

              <span className="rounded-full border border-white/[0.07] px-3 py-1.5 text-[9px] text-white/25">
                LIVE DATA PENDING
              </span>
            </div>

            <div className="relative mt-6 flex h-64 items-center justify-center overflow-hidden rounded-xl border border-white/[0.05] bg-black/20">

              <div className="absolute inset-x-0 top-1/4 border-t border-white/[0.04]" />
              <div className="absolute inset-x-0 top-2/4 border-t border-white/[0.04]" />
              <div className="absolute inset-x-0 top-3/4 border-t border-white/[0.04]" />

              <div className="text-center">
                <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.03]">
                  <span className="text-sm text-white/25">⌁</span>
                </div>

                <p className="mt-4 text-xs font-medium text-white/45">
                  Waiting for market data
                </p>

                <p className="mt-1 text-[10px] text-white/20">
                  The live MT5 bridge will populate this chart.
                </p>
              </div>
            </div>
          </div>

          {/* Account */}
          <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5">

            <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-white/25">
              MT5 ACCOUNT
            </p>

            <div className="mt-6 rounded-xl border border-white/[0.06] bg-black/20 p-4">
              <p className="text-[9px] uppercase tracking-[0.16em] text-white/20">
                Status
              </p>

              <div className="mt-3 flex items-center gap-2">
                <StatusDot />

                <span className="text-sm font-semibold">
                  Awaiting bridge
                </span>
              </div>
            </div>

            <div className="mt-4 grid gap-3">
              <div className="flex items-center justify-between border-b border-white/[0.05] pb-3">
                <span className="text-[10px] text-white/25">
                  Broker
                </span>

                <span className="text-[10px] font-medium text-white/50">
                  HFM
                </span>
              </div>

              <div className="flex items-center justify-between border-b border-white/[0.05] pb-3">
                <span className="text-[10px] text-white/25">
                  Platform
                </span>

                <span className="text-[10px] font-medium text-white/50">
                  MetaTrader 5
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[10px] text-white/25">
                  Automation
                </span>

                <span className="text-[10px] font-medium text-[#FFD60A]">
                  24/7
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Open trades */}
        <div className="mt-5 rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5">

          <div className="flex items-center justify-between">
            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-white/25">
                POSITIONS
              </p>

              <h2 className="mt-2 text-lg font-semibold">
                Open Trades
              </h2>
            </div>

            <span className="text-[9px] uppercase tracking-[0.15em] text-white/20">
              MT5
            </span>
          </div>

          <div className="mt-5 flex min-h-32 items-center justify-center rounded-xl border border-white/[0.05] bg-black/20">
            <div className="text-center">
              <p className="text-xs font-medium text-white/35">
                No live positions yet
              </p>

              <p className="mt-1 text-[10px] text-white/20">
                Open trades will appear here once MT5 is connected.
              </p>
            </div>
          </div>
        </div>

        {/* AI */}
        <div className="mt-5 grid gap-5 sm:grid-cols-2">

          <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5">
            <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-white/25">
              BULLSEYE AI
            </p>

            <h2 className="mt-2 text-lg font-semibold">
              Trading Intelligence
            </h2>

            <p className="mt-3 text-xs leading-5 text-white/25">
              AI strategy controls will become available after the MT5
              connection is active.
            </p>

            <div className="mt-5 rounded-xl border border-white/[0.06] bg-black/20 px-4 py-3">
              <span className="text-[9px] font-semibold uppercase tracking-[0.15em] text-white/20">
                Status
              </span>

              <p className="mt-1 text-xs text-white/40">
                Awaiting MT5
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5">
            <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-white/25">
              AUTOMATION
            </p>

            <h2 className="mt-2 text-lg font-semibold">
              24/7 Engine
            </h2>

            <p className="mt-3 text-xs leading-5 text-white/25">
              The Bullseye automation engine will run strategies through
              the MT5 bridge once your trading infrastructure is online.
            </p>

            <div className="mt-5 flex items-center gap-2 rounded-xl border border-[#FFD60A]/10 bg-[#FFD60A]/[0.035] px-4 py-3">
              <StatusDot />

              <span className="text-[10px] font-medium text-white/40">
                Infrastructure pending
              </span>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="pb-8 pt-8 text-center text-[9px] font-semibold uppercase tracking-[0.25em] text-white/15">
          BULLSEYE FX • CONNECT • CONFIGURE • AUTOMATE
        </div>
      </section>
    </main>
  );
                }
