import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { encrypt } from "@/lib/encryption";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    // Get the currently signed-in Clerk user
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: "You must be signed in to connect an MT5 account." },
        { status: 401 }
      );
    }

    const body = await req.json();

    const login = String(body.login || "").trim();
    const password = String(body.password || "");
    const server = String(body.server || "").trim();

    if (!login || !password || !server) {
      return NextResponse.json(
        { error: "Please enter your MT5 login, password and server." },
        { status: 400 }
      );
    }

    // Read server-side environment variables
    const supabaseUrl = process.env.SUPABASE_URL?.trim();
    const supabaseServiceKey =
      process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
    const encryptionSecret =
      process.env.MT5_ENCRYPTION_SECRET?.trim();

    // Check Supabase configuration
    if (!supabaseUrl) {
      console.error("SUPABASE_URL is missing");
      return NextResponse.json(
        { error: "SUPABASE_URL is not configured on the server." },
        { status: 500 }
      );
    }

    if (!supabaseServiceKey) {
      console.error("SUPABASE_SERVICE_ROLE_KEY is missing");
      return NextResponse.json(
        {
          error:
            "SUPABASE_SERVICE_ROLE_KEY is not configured on the server.",
        },
        { status: 500 }
      );
    }

    // Check encryption configuration
    if (!encryptionSecret || encryptionSecret.length !== 32) {
      console.error(
        `MT5_ENCRYPTION_SECRET length: ${encryptionSecret?.length || 0}`
      );

      return NextResponse.json(
        {
          error:
            "MT5_ENCRYPTION_SECRET must be exactly 32 characters.",
        },
        { status: 500 }
      );
    }

    // Create Supabase admin client
    const supabase = createClient(
      supabaseUrl,
      supabaseServiceKey,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }
    );

    // Encrypt the MT5 password before saving
    const encryptedPassword = encrypt(password);

    // Save/update the MT5 account
    const { data, error } = await supabase
      .from("mt5_accounts")
      .upsert(
        {
          user_id: userId,
          mt5_login: login,
          mt5_server: server,
          encrypted_password: encryptedPassword,
          is_connected: true,
          updated_at: new Date().toISOString(),
        },
        {
          onConflict: "mt5_login",
        }
      )
      .select()
      .single();

    if (error) {
      console.error("Supabase MT5 error:", error);

      return NextResponse.json(
        {
          error: `Supabase error: ${error.message}`,
        },
        { status: 500 }
      );
    }

    console.log("MT5 account saved:", {
      id: data?.id,
      login,
      server,
      userId,
    });

    return NextResponse.json({
      success: true,
      message: "MT5 account connected successfully.",
      account_number: login,
    });
  } catch (error: any) {
    console.error("MT5 Connect Error:", error);

    return NextResponse.json(
      {
        error:
          error?.message ||
          "Something went wrong while connecting your MT5 account.",
      },
      { status: 500 }
    );
  }
}