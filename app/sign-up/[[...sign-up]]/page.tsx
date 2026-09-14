import Link from "next/link";
import { SignUp } from "@clerk/nextjs";

function BullseyeMark() {
  return (
    <div className="relative flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white">
      <div className="h-5 w-5 rounded-full border-[3px] border-black" />
      <div className="absolute h-2 w-2 rounded-full bg-black" />
    </div>
  );
}

export default function SignUpPage() {
  return (
    <main className="min-h-screen bg-[#050506] text-white">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-[#FFD60A]/[0.05] blur-[140px]" />
      </div>

      <nav className="relative mx-auto flex max-w-7xl items-center px-5 py-5 sm:px-8">
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
      </nav>

      <section className="relative flex min-h-[calc(100vh-80px)] items-center justify-center px-5 py-10">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#FFD60A]">
              BULLSEYE FX
            </p>

            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Start with Bullseye
            </h1>

            <p className="mt-3 text-sm text-white/35">
              Create your account and connect MT5.
            </p>
          </div>

          <div className="rounded-[24px] border border-white/10 bg-white/[0.025] p-2 shadow-[0_30px_100px_rgba(0,0,0,0.45)] backdrop-blur-xl">
            <SignUp />
          </div>

          <p className="mt-6 text-center text-[9px] uppercase tracking-[0.2em] text-white/20">
            Secure • Automated • 24/7
          </p>
        </div>
      </section>
    </main>
  );
}
