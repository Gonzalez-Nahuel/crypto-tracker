import { SessionValidator } from "@/lib/auth/session-validator";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await SessionValidator();

  if (session.status === 401)
    throw NextResponse.json(
      {},
      { status: session.status, statusText: session.message }
    );

  return NextResponse.json(session.payload, { status: 200 });
}
