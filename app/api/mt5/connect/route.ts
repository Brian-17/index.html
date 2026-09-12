import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Not logged in" }, { status: 401 });

  const { login, password, server } = await req.json();
  
  // TODO: Save to your DB - Supabase/Firebase
  // For now just test connection
  console.log("MT5 Connect for user", userId, login, server);

  // Here you add your MetaAPI or your own MT5 bridge validation
  // if validation fails, return error

  return NextResponse.json({ message: `Account ${login} linked` });
}
