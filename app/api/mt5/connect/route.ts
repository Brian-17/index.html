import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { encrypt } from '@/lib/encryption';

export async function POST(req: Request) {
  try {
    const { login, password, server } = await req.json();

    if (!login || !password || !server) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    // Validate secret length early with trim
    const secretRaw = process.env.MT5_ENCRYPTION_SECRET?.trim();
    if (!secretRaw || secretRaw.length !== 32) {
      console.error(`SECRET LENGTH: ${secretRaw?.length} - value: [${secretRaw}]`);
      return NextResponse.json(
        { error: `MT5_ENCRYPTION_SECRET must be exactly 32 characters (current: ${secretRaw?.length || 0})` },
        { status: 500 }
      );
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const encryptedPassword = encrypt(password);

    // Get user - adjust if you use auth
    const { data: { user } } = await supabase.auth.getUser();
    // If you don't use supabase auth, use your own user id logic

    const { error } = await supabase.from('mt5_accounts').upsert({
      mt5_login: login,
      mt5_server: server,
      encrypted_password: encryptedPassword,
      is_connected: true,
      user_id: user?.id || null,
      updated_at: new Date().toISOString(),
    }, { onConflict: 'mt5_login' });

    if (error) throw error;

    return NextResponse.json({ success: true, message: 'saved! Redirecting' });
  } catch (err: any) {
    console.error('MT5 Connect Error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
