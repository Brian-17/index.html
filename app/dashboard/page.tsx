import { auth } from "@clerk/nextjs/server"; import { redirect } from "next/navigation";
export default async function Dashboard(){
  const {userId} = await auth(); if(!userId) redirect("/");
  return (<div className="bg-[#08080a] text-white min-h-screen p-8"><h1 className="text-3xl font-black">BULLSEYE <span className="text-[#FFD60A]">SNIPER ENGINE</span></h1><p className="text-gray-400 mt-4">User {userId} connected ✓ • MT5 integration ready</p><div className="mt-8 bg-[#121216] border border-[#FFD60A]/20 rounded-2xl p-6 font-mono text-xs">9/9 Confluence • SIGNAL: BUY 🎯<br/>ENTRY 67420 | SL 67280 | TP 67800</div></div>)
}
