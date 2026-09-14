import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getSupabaseAdmin() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error("Supabase environment variables are missing");
  }

  return createClient(url, key, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: "Not logged in" },
        { status: 401 }
      );
    }

    const supabase = getSupabaseAdmin();

    const { data, error } = await supabase
      .from("mt5_accounts")
      .select(
        "login, server, status, balance, equity, connected_at, created_at, updated_at"
      )
      .eq("user_id", userId)
      .maybeSingle();

    if (error) {
      console.error("MT5 account lookup error:", error);

      return NextResponse.json(
        { error: "Unable to load MT5 account" },
        { status: 500 }
      );
    }

    if (!data) {
      return NextResponse.json({
        connected: false,
        account: null,
      });
    }

    return NextResponse.json({
      connected: true,
      account: data,
    });
  } catch (error) {
    console.error("MT5 account API error:", error);

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
       }
