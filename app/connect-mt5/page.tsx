"use client";
import { useState } from "react";

export default function ConnectMT5() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [server, setServer] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const handleConnect = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");
    try {
      const res = await fetch("/api/mt5/connect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ login, password, server }),
      });
      const data = await res.json();
      if (res.ok) {
        setMsg("✅ MT5 Connected: " + data.message);
        window.location.href = "/dashboard";
      } else {
        setMsg("❌ " + data.error);
      }
    } catch (err) {
      setMsg("❌ Connection failed");
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 400, margin: "100px auto", padding: 20 }}>
      <h1>Connect MT5</h1>
      <form onSubmit={handleConnect}>
        <input placeholder="MT5 Login" value={login} onChange={e=>setLogin(e.target.value)} required style={{width:"100%", padding:10, margin:"10px 0"}} />
        <input placeholder="MT5 Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} required style={{width:"100%", padding:10, margin:"10px 0"}} />
        <input placeholder="Server - e.g. Exness-MT5Real" value={server} onChange={e=>setServer(e.target.value)} required style={{width:"100%", padding:10, margin:"10px 0"}} />
        <button disabled={loading} style={{width:"100%", padding:12, background:"black", color:"white"}}>{loading ? "Connecting..." : "Connect to MT5"}</button>
      </form>
      <p>{msg}</p>
    </div>
  );
        }
