import { CredentialsValidator } from "@/lib/auth/credentials-validator";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { toPublicUser } from "@/lib/mappers/to-public-user";
import { AuthError } from "@/lib/auth/auth-error";
import { setAuthCookies } from "@/lib/auth/set-auth-cookies";
import { createVericaficationToken } from "@/lib/auth/create-verification-token";

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

    if (!user)
      return NextResponse.json(
        { ok: false, message: "Invalid credentials" },
        { status: 401 },
      );

    await CredentialsValidator.validateUser(user, password);

    const verificationToken = await prisma.verificationToken.findUnique({
      where: { userId: user.id },
    });

    if (!user.emailVerifyed) {
      if (!verificationToken || verificationToken.expiredAt < new Date()) {
        await createVericaficationToken({
          id: user.id,
          email: user.email,
          token: verificationToken?.token,
        });
      }

      return NextResponse.json(
        {
          ok: false,
          message: "Please check your email to verify your account",
        },
        { status: 403 },
      );
    }

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

    console.log("error login", err);

    return NextResponse.json({ ok: false, message }, { status });
  }
}
