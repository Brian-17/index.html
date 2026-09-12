import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Not logged in" }, { status: 401 });

  const { login, password, server } = await req.json();
  
  if(!login || !password || !server) {
    return NextResponse.json({ error: "All fields required" }, { status: 400 });
  }

  console.log("MT5 Connect for user", userId, login, server);

  // TODO: Save to Supabase / Your DB
  // await supabase.from('mt5_accounts').insert({ user_id: userId, login, server })

  return NextResponse.json({ message: `Account ${login} linked successfully` });
}
