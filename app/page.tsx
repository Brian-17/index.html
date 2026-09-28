import { auth } from "@clerk/nextjs/server";
import { createClient } from "@supabase/supabase-js";
import crypto from "crypto";
import { NextResponse } from "next/server";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL! || process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const ALGO = 'aes-256-gcm';
const SECRET = process.env.MT5_ENCRYPTION_SECRET!;

function encrypt(text: string) {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv(ALGO, Buffer.from(SECRET), iv);
  let enc = cipher.update(text, 'utf8', 'hex');
  enc += cipher.final('hex');
  const tag = cipher.getAuthTag().toString('hex');
  return `${iv.toString('hex')}:${tag}:${enc}`;
}

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: "Unauthorized - please login again" }, { status: 401 });

    const { login, password, server } = await req.json();
    if (!login || !password || !server) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // This matches your table from screenshot
    const { error } = await supabase.from('mt5_accounts').insert({
      user_id: userId,
      broker: 'HFM',
      account_number: login.toString(),
      login: login.toString(),
      server: server,
      password_encrypted: encrypt(password),
      encrypted_login: encrypt(login.toString()),
      encrypted_password: encrypt(password),
      encrypted_server: encrypt(server),
    });

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("MT5 Connect Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function GET() {
  const { userId } = await auth();
  if (!userId) return NextResponse.json([], { status: 401 });
  
  const { data } = await supabase
    .from('mt5_accounts')
    .select('account_number, server, broker')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(1);
    
  return NextResponse.json(data);
    }
