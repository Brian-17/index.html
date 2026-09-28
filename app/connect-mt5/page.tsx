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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ login, password, server }),
      });

      const text = await response.text();
      let data: any = {};
      try { data = JSON.parse(text); } catch { data = { raw: text }; }

      console.log("RESPONSE:", response.status, data);

      if (!response.ok) {
        setError(data.error || data.raw || `Error ${response.status}`);
        setLoading(false);
        return;
      }

      setMessage(`MT5 ${data.account_number || login} saved! Redirecting...`);
      setPassword("");

      setTimeout(() => {
        window.location.href = "/";
      }, 1000);

    } catch (err: any) {
      console.error(err);
      setError(err.message || "Something went wrong");
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#050506] text-white">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-[#FFD60A]/[0.05] blur-[140px]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.018)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.018)_1px,transparent_1px)] bg-[size:70px_70px]" />
      </div>

      <nav className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8 lg:px-10">
        <Link href="/" className="flex items-center gap-3">
          <BullseyeMark />
          <div>
            <div className="text-[14px] font-black tracking-tight">BULLSEYE FX</div>
            <div className="hidden text-[8px] font-medium tracking-[0.25em] text-white/30 sm:block">AI TRADING SYSTEM</div>
          </div>
        </Link>
        <UserButton />
      </nav>

      <section className="relative z-10 flex min-h-[calc(100vh-80px)] items-center justify-center px-5 py-12">
        <div className="w-full max-w-lg">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-[#FFD60A]/20 bg-[#FFD60A]/[0.07] text-xl">🎯</div>
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#FFD60A]">STEP 01</p>
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Connect your MT5</h1>
            <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-white/35">Connect your MetaTrader 5 account to bring your trading environment into Bullseye FX.</p>
          </div>

          <div className="rounded-[26px] border border-white/10 bg-[#0a0a0c]/90 p-5 shadow-[0_30px_100px_rgba(0,0,0,0.55)] backdrop-blur-xl sm:p-7">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.16em] text-white/35">MT5 Login</label>
                <input type="text" inputMode="numeric" value={login} onChange={(e) => setLogin(e.target.value)} placeholder="55004111" required className="h-14 w-full rounded-2xl border border-white/10 bg-white/[0.035] px-4 text-sm text-white outline-none placeholder:text-white/20 focus:border-[#FFD60A]/40" />
              </div>
              <div>
                <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.16em] text-white/35">MT5 Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Your MT5 password" required className="h-14 w-full rounded-2xl border border-white/10 bg-white/[0.035] px-4 text-sm text-white outline-none placeholder:text-white/20 focus:border-[#FFD60A]/40" />
              </div>
              <div>
                <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.16em] text-white/35">MT5 Server</label>
                <input type="text" value={server} onChange={(e) => setServer(e.target.value)} placeholder="HFMarketsKE-Live2" required className="h-14 w-full rounded-2xl border border-white/10 bg-white/[0.035] px-4 text-sm text-white outline-none placeholder:text-white/20 focus:border-[#FFD60A]/40" />
              </div>

              {error && <div className="rounded-2xl border border-red-500/20 bg-red-500/[0.06] px-4 py-3 text-xs leading-5 text-red-300 whitespace-pre-wrap">{error}</div>}
              {message && <div className="rounded-2xl border border-[#FFD60A]/20 bg-[#FFD60A]/[0.06] px-4 py-3 text-xs leading-5 text-[#FFD60A]">✓ {message}</div>}

              <button type="submit" disabled={loading} className="flex h-14 w-full items-center justify-center rounded-full bg-[#FFD60A] text-sm font-bold text-black disabled:opacity-60">
                {loading? "Connecting..." : "Connect MT5"} {!loading && <span className="ml-2">→</span>}
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
                }
