import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  (await cookies()).delete("accesToken");
  (await cookies()).delete("refreshToken");

  return NextResponse.json(
    { ok: true, message: "Logout successful" },
    { status: 200 },
  );
}
