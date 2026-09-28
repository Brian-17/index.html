"use client";
import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { useEffect, useState } from "react";

function BullseyeMark(){
  return (<div className="relative flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white"><div className="h-5 w-5 rounded-full border-[3px] border-black" /><div className="absolute h-2 w-2 rounded-full bg-black" /></div>);
}
function StatusDot({connected}:{connected?:boolean}){
  return (<span className="relative flex h-2 w-2"><span className={`absolute inline-flex h-full w-full animate-ping rounded-full ${connected?'bg-green-400':'bg-[#FFD60A]'} opacity-60`} /><span className={`relative inline-flex h-2 w-2 rounded-full ${connected?'bg-green-400':'bg-[#FFD60A]'}`} /></span>);
}

export default function Home(){
  const [mt5,setMt5]=useState<any>(null);
  const [loading,setLoading]=useState(true);
  useEffect(()=>{
    fetch("/api/mt5/connect").then(r=>r.json()).then(d=>{
      if(Array.isArray(d)&&d.length>0) setMt5(d[0]);
      setLoading(false);
    }).catch(()=>setLoading(false));
  },[]);

  return (
    <main className="min-h-screen overflow-hidden bg-[#050506] text-white">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-[#FFD60A]/[0.055] blur-[140px]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:70px_70px] opacity-30" />
      </div>

      <nav className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-5 py-5">
        <Link href="/" className="flex items-center gap-3"><BullseyeMark /><div className="text-[14px] font-black">BULLSEYE FX</div></Link>
        <div className="flex items-center gap-5"><SignedOut><Link href="/sign-in" className="text-sm text-white/45">Sign In</Link></SignedOut><SignedIn><UserButton /></SignedIn></div>
      </nav>

      <section className="relative z-10 mx-auto flex min-h-[calc(100vh-82px)] max-w-7xl flex-col items-center px-5 pt-14 text-center">
        <div className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.035] px-4 py-2.5"><StatusDot connected={!!mt5} /><span className="text-[10px] tracking-[0.16em] text-white/55">AI TRADING • MT5 • 24/7</span></div>

        <h1 className="max-w-5xl text-[55px] font-semibold leading-[0.9] tracking-[-0.065em] sm:text-7xl lg:text-[104px]">
          <span className="block">AI Trading</span><span className="mt-2 block text-[#FFD60A]">that runs itself</span><span className="mt-2 block">24/7</span>
        </h1>

        <div className="mt-9 flex w-full max-w-md flex-col gap-3 sm:flex-row">
          <SignedOut><Link href="/sign-up" className="inline-flex h-14 w-full items-center justify-center rounded-full bg-[#FFD60A] px-7 text-sm font-bold text-black">Start Free →</Link></SignedOut>
          <SignedIn>
            {mt5? (
              <div className="inline-flex h-14 w-full items-center justify-center rounded-full border border-green-500/20 bg-green-500/10 px-7 text-sm font-bold text-green-300">✓ Connected: {mt5.account_number}</div>
            ) : (
              <Link href="/connect-mt5" className="inline-flex h-14 w-full items-center justify-center rounded-full bg-[#FFD60A] px-7 text-sm font-bold text-black">{loading?"Checking...":"Connect MT5"} →</Link>
            )}
          </SignedIn>
        </div>

        <div className="relative mt-20 w-full max-w-5xl">
          <div className="relative overflow-hidden rounded-[24px] border border-white/10 bg-[#0b0b0d]/90 p-5 text-left">
            <div className="flex items-center justify-between border-b border-white/[0.07] pb-4">
              <span className="text-[10px] tracking-[0.18em] text-white/30">BULLSEYE COMMAND</span>
              <div className="flex items-center gap-2"><StatusDot connected={!!mt5} /><span className="text-[9px] text-white/35">{mt5?"CONNECTED":"SYSTEM READY"}</span></div>
            </div>
            <div className="grid gap-4 pt-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5 sm:col-span-2">
                <p className="text-[9px] tracking-[0.2em] text-white/25">BULLSEYE AI</p>
                <h3 className="mt-2 text-lg font-semibold">Market Intelligence</h3>
                <p className="mt-4 text-xs text-white/40">{mt5?`Live with ${mt5.account_number} on ${mt5.server}`:"Monitoring"}</p>
              </div>
              <div className="grid gap-4">
                <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5">
                  <p className="text-[9px] tracking-[0.2em] text-white/25">MT5 ACCOUNT</p>
                  <div className="mt-4 flex items-center gap-2"><StatusDot connected={!!mt5} /><span className="text-sm font-semibold">{mt5?`${mt5.account_number}`:"Awaiting connection"}</span></div>
                  <p className="mt-2 text-[10px] text-white/25">{mt5?`Server: ${mt5.server} • Live`:"Connect your MT5 to activate."}</p>
                </div>
                <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5">
                  <p className="text-[9px] tracking-[0.2em] text-white/25">AUTOMATION</p>
                  <p className="mt-3 text-2xl font-semibold">24<span className="text-[#FFD60A]">/</span>7</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
            }
