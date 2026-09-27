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

/**
 * Create a server-side Supabase client.
 * Never expose the service-role key to the browser.
 */
function getSupabaseAdmin() {
  const url = process.env.SUPABASE_URL;
  const serviceRoleKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    throw new Error(
      "Supabase environment variables are missing"
    );
  }

  return createClient(url, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

/**
 * Encrypt the MT5 password using AES-256-GCM.
 * The encryption secret must remain on the server.
 */
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

/**
 * POST /api/mt5/connect
 *
 * Saves the authenticated user's MT5 account details.
 * This saves the credentials securely; it does not
 * establish a live connection to the MT5 terminal.
 */
export async function POST(req: Request) {
  try {
    // 1. Verify the user is signed in with Clerk.
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: "Not logged in" },
        { status: 401 }
      );
    }

    // 2. Read and validate the submitted fields.
    let body: {
      login?: unknown;
      password?: unknown;
      server?: unknown;
    };

    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 }
      );
    }

    const login = String(body.login ?? "").trim();
    const password = String(body.password ?? "");
    const server = String(body.server ?? "").trim();

    if (!login || !password || !server) {
      return NextResponse.json(
        { error: "All MT5 fields are required" },
        { status: 400 }
      );
    }

    // 3. Encrypt the password before storing it.
    const encryptedPassword =
      encryptPassword(password);

    // 4. Create the server-side database client.
    const supabase = getSupabaseAdmin();

    // 5. Save the account.
    // A user's existing account is updated rather
    // than creating duplicate rows.
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
        { error: "Unable to save MT5 account" },
        { status: 500 }
      );
    }

    // 6. Return success without returning credentials.
    return NextResponse.json(
      {
        success: true,
        message: "MT5 account saved securely",
        status: "pending",
      },
      { status: 200 }
    );
  } catch (error) {
    // Do not log the submitted password or secrets.
    console.error(
      "MT5 connection error:",
      error instanceof Error
        ? error.message
        : "Unknown server error"
    );

    return NextResponse.json(
      {
        error:
          "Something went wrong while connecting MT5",
      },
      { status: 500 }
    );
  }
}
