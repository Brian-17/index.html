"use client";
import { useState } from "react";

export default function ConnectMT5Page() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [server, setServer] = useState("");
  const [loading, setLoading] = useState(false);

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
    <div className="min-h-screen bg-[#050507] flex items-center justify-center p-4">
      <form onSubmit={handleConnect} className="w-full max-w-md bg-white/5 border border-white/10 p-8 rounded-2xl">
        <h1 className="text-2xl font-bold mb-6">Connect MT5</h1>
        <input value={login} onChange={e=>setLogin(e.target.value)} placeholder="MT5 Login" required className="w-full p-3 mb-3 bg-black border border-white/10 rounded" />
        <input value={password} onChange={e=>setPassword(e.target.value)} type="password" placeholder="Master Password" required className="w-full p-3 mb-3 bg-black border border-white/10 rounded" />
        <input value={server} onChange={e=>setServer(e.target.value)} placeholder="Server e.g. Exness-MT5Real" required className="w-full p-3 mb-6 bg-black border border-white/10 rounded" />
        <button disabled={loading} className="w-full p-3 bg-yellow-400 text-black font-bold rounded">
          {loading ? "Connecting..." : "Connect to MT5"}
        </button>
      </form>
    </div>
  );
}
