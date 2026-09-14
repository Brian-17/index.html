"use client";

import Link from "next/link";
import { useState } from "react";
import { UserButton } from "@clerk/nextjs";

function BullseyeMark() {
  return (
    <div className="relative flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white">
      <div className="h-5 w-5 rounded-full border-[3px] border-black" />
      <div className="absolute h-2 w-2 rounded-full bg-black" />
    </div>
  );
}

export default function ConnectMT5Page() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [server, setServer] = useState("HFMarketsKE-Live2");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);
    setMessage("");
    setError("");

    try {
      const response = await fetch("/api/mt5/connect", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          login,
          password,
          server,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Unable to connect MT5");
        return;
      }

      setMessage("MT5 account saved securely.");

      setPassword("");

      setTimeout(() => {
        window.location.href = "/";
      }, 1200);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#050506] text-white">
      {/* Background */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-[#FFD60A]/[0.05] blur-[140px]" />

        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.018)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.018)_1px,transparent_1px)] bg-[size:70px_70px]" />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8 lg:px-10">
        <Link href="/" className="flex items-center gap-3">
          <BullseyeMark />

          <div>
            <div className="text-[14px] font-black tracking-tight">
              BULLSEYE FX
            </div>

            <div className="hidden text-[8px] font-medium tracking-[0.25em] text-white/30 sm:block">
              AI TRADING SYSTEM
            </div>
          </div>
        </Link>

        <UserButton />
      </nav>

      {/* Main */}
      <section className="relative z-10 flex min-h-[calc(100vh-80px)] items-center justify-center px-5 py-12">
        <div className="w-full max-w-lg">

          {/* Header */}
          <div className="mb-8 text-center">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-[#FFD60A]/20 bg-[#FFD60A]/[0.07] text-xl">
              🎯
            </div>

            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#FFD60A]">
              STEP 01
            </p>

            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Connect your MT5
            </h1>

            <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-white/35">
              Connect your MetaTrader 5 account to bring your trading
              environment into Bullseye FX.
            </p>
          </div>

          {/* Card */}
          <div className="rounded-[26px] border border-white/10 bg-[#0a0a0c]/90 p-5 shadow-[0_30px_100px_rgba(0,0,0,0.55)] backdrop-blur-xl sm:p-7">

            <div className="mb-6 flex items-center justify-between rounded-2xl border border-white/[0.07] bg-white/[0.025] px-4 py-3">
              <div>
                <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-white/25">
                  Broker
                </p>

                <p className="mt-1 text-sm font-semibold">
                  HFM
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#FFD60A]" />

                <span className="text-[10px] font-medium text-white/35">
                  MT5
                </span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Login */}
              <div>
                <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.16em] text-white/35">
                  MT5 Login
                </label>

                <input
                  type="text"
                  inputMode="numeric"
                  value={login}
                  onChange={(e) => setLogin(e.target.value)}
                  placeholder="Enter your MT5 account number"
                  required
                  className="h-14 w-full rounded-2xl border border-white/10 bg-white/[0.035] px-4 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-[#FFD60A]/40 focus:bg-white/[0.05]"
                />
              </div>

              {/* Password */}
              <div>
                <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.16em] text-white/35">
                  MT5 Password
                </label>

                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your MT5 password"
                  required
                  className="h-14 w-full rounded-2xl border border-white/10 bg-white/[0.035] px-4 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-[#FFD60A]/40 focus:bg-white/[0.05]"
                />
              </div>

              {/* Server */}
              <div>
                <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.16em] text-white/35">
                  MT5 Server
                </label>

                <input
                  type="text"
                  value={server}
                  onChange={(e) => setServer(e.target.value)}
                  placeholder="Example: HFMarketsKE-Live2"
                  required
                  className="h-14 w-full rounded-2xl border border-white/10 bg-white/[0.035] px-4 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-[#FFD60A]/40 focus:bg-white/[0.05]"
                />
              </div>

              {/* Error */}
              {error && (
                <div className="rounded-2xl border border-red-500/20 bg-red-500/[0.06] px-4 py-3 text-xs leading-5 text-red-300">
                  {error}
                </div>
              )}

              {/* Success */}
              {message && (
                <div className="rounded-2xl border border-[#FFD60A]/20 bg-[#FFD60A]/[0.06] px-4 py-3 text-xs leading-5 text-[#FFD60A]">
                  ✓ {message}
                </div>
              )}

              {/* Button */}
              <button
                type="submit"
                disabled={loading}
                className="group flex h-14 w-full items-center justify-center rounded-full bg-[#FFD60A] text-sm font-bold text-black shadow-[0_10px_40px_rgba(255,214,10,0.12)] transition duration-300 hover:bg-[#ffe04a] hover:shadow-[0_15px_50px_rgba(255,214,10,0.2)] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Connecting..." : "Connect MT5"}

                {!loading && (
                  <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                )}
              </button>
            </form>

            {/* Security */}
            <div className="mt-6 border-t border-white/[0.06] pt-5">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 text-[#FFD60A]">
                  🔒
                </div>

                <div>
                  <p className="text-xs font-medium text-white/60">
                    Your credentials are protected
                  </p>

                  <p className="mt-1 text-[10px] leading-5 text-white/25">
                    Your MT5 password is encrypted before being stored.
                    It is never displayed in your Bullseye dashboard.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <p className="mt-6 text-center text-[9px] uppercase tracking-[0.2em] text-white/20">
            Secure • Private • 24/7
          </p>
        </div>
      </section>
    </main>
  );
        }
