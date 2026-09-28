"use client";

import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { useEffect, useState } from "react";

function BullseyeMark() {
  return (
    <div className="relative flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white">
      <div className="h-5 w-5 rounded-full border-[3px] border-black" />
      <div className="absolute h-2 w-2 rounded-full bg-black" />
    </div>
  );
}

function StatusDot({ connected = false }: { connected?: boolean }) {
  return (
    <span className="relative flex h-2 w-2">
      <span className={`absolute inline-flex h-full w-full animate-ping rounded-full ${connected? "bg-green-400" : "bg-[#FFD60A]"} opacity-60`} />
      <span className={`relative inline-flex h-2 w-2 rounded-full ${connected? "bg-green-400" : "bg-[#FFD60A]"}`} />
    </span>
  );
}

export default function Home() {
  const [mt5, setMt5] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/mt5/connect");
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setMt5(data[0]);
        }
      } catch (e) {
        console.log("No MT5 yet");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <main className="min-h-screen overflow-hidden bg-[#050506] text-white">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-[#FFD60A]/[0.055] blur-[140px]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0
