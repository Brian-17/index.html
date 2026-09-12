import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function Home(){
 return (
  <div className="bg-[#050507] text-white min-h-screen">
    <nav className="flex justify-between items-center px-6 md:px-12 py-5 max-w-[1400px] mx-auto">
      <div className="flex items-center gap-2.5"><div className="w-7 h-7 rounded-full bg-white flex items-center justify-center"><div className="w-3 h-3 bg-black rounded-full"></div></div><span className="font-semibold">BULLSEYE FX</span></div>
      <div className="flex items-center gap-3">
        <Link href="/sign-in" className="text-[13px] text-gray-400">Sign In</Link>
        <SignedIn><UserButton /></SignedIn>
        <Link href="/sign-up" className="bg-[#FFD60A] text-black px-5 py-2.5 rounded-full font-semibold text-[13px]">Connect MT5</Link>
      </div>
    </nav>

    <section className="max-w-[1400px] mx-auto px-6 md:px-12 pt-20 text-center">
      <div className="inline-flex items-center gap-2 bg-[#121214] border border-white/10 px-4 py-1.5 rounded-full text-[11px] text-gray-300"><span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span> AI Trading with MT5 Connection, Cloud Bots & Free VPS</div>
      <h1 className="mt-8 text-[38px] md:text-[88px] font-medium leading-[0.9] tracking-[-0.04em]">AI Trading<br/><span className="text-[#FFD60A]">that runs itself</span><br/>24/7</h1>
      <p className="text-gray-400 mt-6 max-w-[540px] mx-auto text-[15px]">Connect your MT5 account, run AI trading bots on free VPS, prompt-based trading, Smart Money Concepts.</p>
      <div className="mt-8 flex justify-center gap-3">
        <Link href="/sign-up" className="bg-[#FFD60A] text-black px-8 py-3.5 rounded-full font-semibold text-sm">Start Free on MT5</Link>
      </div>
      <div className="mt-20 bg-[#101012] border border-white/10 rounded-[32px] p-3 max-w-5xl mx-auto"><div className="bg-black rounded-[20px] h-[360px] flex items-center justify-center border border-white/5 font-mono text-[11px] text-gray-500">◎ BULLSEYE SNIPER • LIVE • NAS100 M15 • BULLISH BIAS ✓ • BUY @ 67420 ✓</div></div>
    </section>
  </div>
 )
}import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function Home(){
 return (
  <div className="bg-[#050507] text-white min-h-screen">
    <nav className="flex justify-between items-center px-6 md:px-12 py-5 max-w-[1400px] mx-auto">
      <div className="flex items-center gap-2.5"><div className="w-7 h-7 rounded-full bg-white flex items-center justify-center"><div className="w-3 h-3 bg-black rounded-full"></div></div><span className="font-semibold">BULLSEYE FX</span></div>
      <div className="flex items-center gap-3">
        <SignedOut><SignInButton mode="modal"><button className="text-[13px] text-gray-400">Sign In</button></SignInButton></SignedOut>
        <SignedIn><UserButton /></SignedIn>
        <SignedOut><SignInButton mode="modal"><button className="bg-[#FFD60A] text-black px-5 py-2.5 rounded-full font-semibold text-[13px]">Connect MT5</button></SignInButton></SignedOut>
        <SignedIn><Link href="/dashboard" className="bg-[#FFD60A] text-black px-5 py-2.5 rounded-full font-semibold text-[13px]">Dashboard</Link></SignedIn>
      </div>
    </nav>

    <section className="max-w-[1400px] mx-auto px-6 md:px-12 pt-20 text-center">
      <div className="inline-flex items-center gap-2 bg-[#121214] border border-white/10 px-4 py-1.5 rounded-full text-[11px] text-gray-300"><span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span> AI Trading with MT5 Connection, Cloud Bots & Free VPS</div>
      <h1 className="mt-8 text-[38px] md:text-[88px] font-medium leading-[0.9] tracking-[-0.04em]">AI Trading<br/><span className="text-[#FFD60A]">that runs itself</span><br/>24/7</h1>
      <p className="text-gray-400 mt-6 max-w-[540px] mx-auto text-[15px]">Connect your MT5 account, run AI trading bots on free VPS, prompt-based trading, Smart Money Concepts.</p>
      <div className="mt-8 flex justify-center gap-3">
        <SignedOut><SignInButton mode="modal"><button className="bg-[#FFD60A] text-black px-8 py-3.5 rounded-full font-semibold text-sm">Start Free on MT5</button></SignInButton></SignedOut>
        <SignedIn><Link href="/dashboard" className="bg-[#FFD60A] text-black px-8 py-3.5 rounded-full font-semibold text-sm">Go to Sniper Engine</Link></SignedIn>
      </div>
      <div className="mt-20 bg-[#101012] border border-white/10 rounded-[32px] p-3 max-w-5xl mx-auto"><div className="bg-black rounded-[20px] h-[360px] flex items-center justify-center border border-white/5 font-mono text-[11px] text-gray-500">◎ BULLSEYE SNIPER • LIVE • NAS100 M15 • BULLISH BIAS ✓ • BUY @ 67420 ✓</div></div>
    </section>
  </div>
 )
}
