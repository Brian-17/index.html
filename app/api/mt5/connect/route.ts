import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import {
  createHash,
  createCipheriv,
  randomBytes,
} from "crypto";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function getSupabaseAdmin() {
  const url =
    process.env.SUPABASE_URL ||
    process.env.NEXT_PUBLIC_SUPABASE_URL;

  const serviceRoleKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url) {
    throw new Error("SUPABASE_URL is missing");
  }

  if (!serviceRoleKey) {
    throw new Error(
      "SUPABASE_SERVICE_ROLE_KEY is missing"
    );
  }

  return createClient(url, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

function encryptPassword(password: string): string {
  const secret = process.env.MT5_ENCRYPTION_SECRET;

  if (!secret) {
    throw new Error(
      "MT5_ENCRYPTION_SECRET is missing"
    );
  }

  const key = createHash("sha256")
    .update(secret)
    .digest();

  const iv = randomBytes(12);

  const cipher = createCipheriv(
    "aes-256-gcm",
    key,
    iv
  );

  const encrypted = Buffer.concat([
    cipher.update(password, "utf8"),
    cipher.final(),
  ]);

  const authTag = cipher.getAuthTag();

  return [
    iv.toString("base64"),
    authTag.toString("base64"),
    encrypted.toString("base64"),
  ].join(".");
}

export async function POST(req: Request) {
  let stage = "starting";

  try {
    // 1. Clerk authentication
    stage = "checking authentication";

    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        {
          error: "Not logged in",
          stage,
        },
        { status: 401 }
      );
    }

    // 2. Read request
    stage = "reading request";

    let body: {
      login?: unknown;
      password?: unknown;
      server?: unknown;
    };

    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        {
          error: "Invalid request body",
          stage,
        },
        { status: 400 }
      );
    }

    const login = String(body.login ?? "").trim();
    const password = String(body.password ?? "");
    const server = String(body.server ?? "").trim();

    if (!login || !password || !server) {
      return NextResponse.json(
        {
          error: "All MT5 fields are required",
          stage,
        },
        { status: 400 }
      );
    }

    // 3. Encrypt password
    stage = "encrypting password";

    const encryptedPassword =
      encryptPassword(password);

    // 4. Create Supabase client
    stage = "creating database client";

    const supabase = getSupabaseAdmin();

    // 5. Save MT5 account
    stage = "saving MT5 account";

    const { error } = await supabase
      .from("mt5_accounts")
      .upsert(
        {
          user_id: userId,
          login,
          server,
          encrypted_password: encryptedPassword,
          status: "pending",
          balance: 0,
          equity: 0,
          updated_at: new Date().toISOString(),
        },
        {
          onConflict: "user_id",
        }
      );

    if (error) {
      console.error(
        "Supabase MT5 account error:",
        error.message
      );

      return NextResponse.json(
        {
          error: "Unable to save MT5 account",
          stage,
          databaseError: error.message,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "MT5 account saved securely",
        status: "pending",
      },
      { status: 200 }
    );
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Unknown server error";

    console.error(
      "MT5 connection error:",
      stage,
      message
    );

    return NextResponse.json(
      {
        error: message,
        stage,
      },
      { status: 500 }
    );
  }
      }
