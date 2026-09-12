"use client";
import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function ConnectMT5Page() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [server, setServer] = useState("");
  const [loading, setLoading] = useState(false);
  const { isSignedIn, isLoaded } = useUser();
  const router = useRouter();

  if (!isLoaded) return <div className="min-h-screen bg-[#050507] text-white flex items-center justify-center">Loading...</div>;
  
  if (!isSignedIn) {
    return (
      <div className="min-h-screen bg-[#050507] text-white flex items-center justify-center flex-col gap-4">
        <p>Please sign in to connect MT5</p>
        <button onClick={()=>router.push("/sign-in")} className="p-3 bg-yellow-400 text-black font-bold rounded">Go to Sign In</button>
      </div>
    );
  }

  const handleConnect = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("/api/mt5/connect", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ login, password, server }),
    });
    const data = await res.json();
    setLoading(false);
    if(res.ok) {
      alert("Connected: " + data.message);
      window.location.href = "/";
    } else {
      alert(data.error);
    }
  };

  return (
    <div className="min-h-screen bg-[#050507] text-white flex items-center justify-center p-4">
      <form onSubmit={handleConnect} className="w-full max-w-md bg-white/5 border border-white/10 p-8 rounded-2xl">
        <h1 className="text-2xl font-bold mb-6 text-white">Connect MT5</h1>
        <input value={login} onChange={e=>setLogin(e.target.value)} placeholder="MT5 Login" required className="w-full p-3 mb-3 bg-black border border-white/10 rounded text-white" />
        <input value={password} onChange={e=>setPassword(e.target.value)} type="password" placeholder="Master Password" required className="w-full p-3 mb-3 bg-black border border-white/10 rounded text-white" />
        <input value={server} onChange={e=>setServer(e.target.value)} placeholder="Server e.g. Exness-MT5Real" required className="w-full p-3 mb-6 bg-black border border-white/10 rounded text-white" />
        <button disabled={loading} className="w-full p-3 bg-yellow-400 text-black font-bold rounded">
          {loading ? "Connecting..." : "Connect to MT5"}
        </button>
      </form>
    </div>
  );
}
