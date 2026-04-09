import { getUserWatchList } from "@/lib/db/get-user-watchlist";
import { SessionValidator } from "@/lib/auth/session-validator";
import { NextResponse } from "next/server";

export async function GET() {
  const userData = await SessionValidator();

  if (userData.status !== 200) return NextResponse.json([], { status: 401 });

  const userId = Number(userData.payload?.sub);

  const list = await getUserWatchList(userId);

  return NextResponse.json(list, { status: 200 });
}
