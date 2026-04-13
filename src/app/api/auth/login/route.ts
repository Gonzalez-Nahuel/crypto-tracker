import { CredentialsValidator } from "@/lib/auth/credentials-validator";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { toPublicUser } from "@/lib/mappers/to-public-user";
import { AuthError } from "@/lib/auth/auth-error";
import { setAuthCookies } from "@/lib/auth/set-auth-cookies";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json(
      { ok: false, message: "Missing credentials" },
      { status: 400 },
    );
  }

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    await CredentialsValidator.validateUser(user, password);

    if (!user) throw new AuthError("Invalid credentials", 401);

    const publicUser = toPublicUser(user);

    await setAuthCookies(publicUser);

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    let message = "Internal server error";
    let status = 500;

    if (err instanceof AuthError) {
      message = err.message;
      status = err.status;
    } else {
      console.error("[POST /api/auth/login]", err);
    }

    return NextResponse.json({ ok: false, message }, { status });
  }
}
