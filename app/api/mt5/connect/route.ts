
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { encrypt } from "@/lib/encryption";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: "You must be signed in." },
        { status: 401 }
      );
    }

    const { login, password, server, broker } =
      await req.json();

    if (!login || !password || !server) {
      return NextResponse.json(
        {
          error: "Missing MT5 login, password, or server.",
        },
        { status: 400 }
      );
    }

    const secret = process.env.MT5_ENCRYPTION_SECRET?.trim();

    if (!secret || secret.length !== 32) {
      return NextResponse.json(
        {
          error:
            "MT5_ENCRYPTION_SECRET must be exactly 32 characters.",
        },
        { status: 500 }
      );
    }

    const supabaseUrl = process.env.SUPABASE_URL?.trim();
    const serviceRoleKey =
      process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();

    if (!supabaseUrl || !serviceRoleKey) {
      return NextResponse.json(
        {
          error: "Supabase environment variables are missing.",
        },
        { status: 500 }
      );
    }

    const supabase = createClient(
      supabaseUrl,
      serviceRoleKey
    );

    const encryptedPassword = encrypt(password);

    const { error } = await supabase
      .from("mt5_accounts")
      .insert({
        user_id: userId,
        login: String(login).trim(),
        account_number: String(login).trim(),
        server: String(server).trim(),
        broker: broker ? String(broker).trim() : null,
        encrypted_password: encryptedPassword,
        is_connected: false,
      });

    if (error) {
      console.error("SUPABASE ERROR:", error.message);

      return NextResponse.json(
        { error: `Supabase error: ${error.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "MT5 account details saved successfully.",
    });
  } catch (error: unknown) {
    console.error("MT5 CONNECT ERROR:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Something went wrong while saving MT5 details.",
      },
      { status: 500 }
    );
  }
}
