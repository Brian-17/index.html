import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { createHash, createCipheriv, randomBytes } from "crypto";
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

function encryptPassword(password: string) {
  const secret = process.env.MT5_ENCRYPTION_SECRET;

  if (!secret) {
    throw new Error("MT5_ENCRYPTION_SECRET is missing");
  }

  // Derive a 32-byte encryption key from the server secret.
  const key = createHash("sha256").update(secret).digest();

  // AES-256-GCM requires a unique IV for every encryption.
  const iv = randomBytes(12);

  const cipher = createCipheriv("aes-256-gcm", key, iv);

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
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: "Not logged in" },
        { status: 401 }
      );
    }

    const body = await req.json();

    const login = String(body.login || "").trim();
    const password = String(body.password || "");
    const server = String(body.server || "").trim();

    if (!login || !password || !server) {
      return NextResponse.json(
        { error: "All MT5 fields are required" },
        { status: 400 }
      );
    }

    const encryptedPassword = encryptPassword(password);

    const supabase = getSupabaseAdmin();

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
      console.error("Supabase MT5 account error:", error);

      return NextResponse.json(
        { error: "Unable to save MT5 account" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "MT5 account saved securely",
      status: "pending",
    });
  } catch (error) {
    console.error("MT5 connection error:", error);

    return NextResponse.json(
      { error: "Something went wrong while connecting MT5" },
      { status: 500 }
    );
  }
                       }
