import { SessionValidator } from "@/lib/auth/session-validator";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await SessionValidator();

  if (session.status === 401)
    return NextResponse.json(
      { ok: false, message: "NO_SESSION" },
      { status: session.status },
    );

  return NextResponse.json(session.payload, { status: session.status });
}
