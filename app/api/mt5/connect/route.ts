import { auth } from "@clerk/nextjs/server";
import { createClient } from "@supabase/supabase-js";
import crypto from "crypto";
import { NextResponse } from "next/server";

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url ||!key) throw new Error("Missing Supabase env vars");
  return createClient(url, key);
}

function encrypt(text: string) {
  const secret = process.env.MT5_ENCRYPTION_SECRET;
  if (!secret) throw new Error("Missing MT5_ENCRYPTION_SECRET - add 32 char string in Vercel env vars");
  if (secret.length!== 32) throw new Error("MT5_ENCRYPTION_SECRET must be exactly 32 characters");
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv('aes-256-gcm', Buffer.from(secret), iv);
  let enc = cipher.update(text, 'utf8', 'hex');
  enc += cipher.final('hex');
  const tag = cipher.getAuthTag().toString('hex');
  return `${iv.toString('hex')}:${tag}:${enc}`;
}

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: "Please sign in again" }, { status: 401 });

    const body = await req.json();
    const login = body.login?.toString().trim();
    const password = body.password?.toString();
    const server = body.server?.toString().trim();

    if (!login ||!password ||!server) {
      return NextResponse.json({ error: "All fields required" }, { status: 400 });
    }

    const supabase = getSupabase();

    // Delete old for this user to avoid duplicates
    await supabase.from('mt5_accounts').delete().eq('user_id', userId);

    const { data, error } = await supabase.from('mt5_accounts').insert({
      user_id: userId,
      broker: 'HFM',
      account_number: login,
      login: login,
      server: server,
      password_encrypted: encrypt(password),
      encrypted_login: encrypt(login),
      encrypted_password: encrypt(password),
      encrypted_server: encrypt(server),
    }).select().single();

    if (error) throw new Error(error.message);

    return NextResponse.json({ success: true, account_number: login, server });

  } catch (err: any) {
    console.error("CONNECT API ERROR:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json([], { status: 401 });
    const supabase = getSupabase();
    const { data } = await supabase.from('mt5_accounts').select('account_number, server, broker').eq('user_id', userId).limit(5);
    return NextResponse.json(data || []);
  } catch {
    return NextResponse.json([]);
  }
}
