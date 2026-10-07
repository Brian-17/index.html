import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { encrypt } from "@/lib/encryption";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    // Get the logged-in Clerk user
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: "You must be signed in." },
        { status: 401 }
      );
    }

    const { login, password, server } = await req.json();

    if (!login || !password || !server) {
      return NextResponse.json(
        { error: "Missing MT5 login, password, or server." },
        { status: 400 }
      );
    }

    // Encryption secret
    const secret = process.env.MT5_ENCRYPTION_SECRET?.trim();

    if (!secret || secret.length !== 32) {
      return NextResponse.json(
        {
          error: "MT5_ENCRYPTION_SECRET must be exactly 32 characters.",
        },
        { status: 500 }
      );
    }

    // Supabase
    const supabaseUrl = process.env.SUPABASE_URL?.trim();
    const serviceRoleKey =
      process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();

    if (!supabaseUrl) {
      return NextResponse.json(
        { error: "SUPABASE_URL is missing." },
        { status: 500 }
      );
    }

    if (!serviceRoleKey) {
      return NextResponse.json(
        { error: "SUPABASE_SERVICE_ROLE_KEY is missing." },
        { status: 500 }
      );
    }

    const supabase = createClient(
      supabaseUrl,
      serviceRoleKey
    );

    // Encrypt MT5 password
    const encryptedPassword = encrypt(password);

    // Save MT5 account
    // IMPORTANT: There is NO is_connected field here.
    const { error } = await supabase
      .from("mt5_accounts")
      .upsert(
        {
          user_id: userId,
          mt5_login: login,
          mt5_server: server,
          encrypted_password: encryptedPassword,
          updated_at: new Date().toISOString(),
        },
        {
          onConflict: "mt5_login",
        }
      );

    if (error) {
      console.error("SUPABASE ERROR:", error);

      return NextResponse.json(
        {
          error: `Supabase error: ${error.message}`,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "MT5 account connected successfully.",
    });
  } catch (error: any) {
    console.error("MT5 CONNECT ERROR:", error);

    return NextResponse.json(
      {
        error:
          error?.message ||
          "Something went wrong while connecting MT5.",
      },
      { status: 500 }
    );
  }
          }
