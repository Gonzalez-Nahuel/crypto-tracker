import { AuthError } from "@/lib/auth/auth-error";
import { CredentialsValidator } from "@/lib/auth/credentials-validator";
import { prisma } from "@/lib/db/prisma";
import { toPublicUser } from "@/lib/mappers/to-public-user";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { setAuthCookies } from "@/lib/auth/set-auth-cookies";

export async function POST(req: Request) {
  const { email, username, password } = await req.json();

  if (!email || !password || !username) {
    return NextResponse.json(
      { ok: false, message: "Missing credentials" },
      { status: 400 },
    );
  }

  try {
    await CredentialsValidator.validateEmail(email);
    CredentialsValidator.validateUsername(username);
    CredentialsValidator.validatePassword(password);

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    const publicUser = toPublicUser(newUser);

    await setAuthCookies(publicUser);

    return NextResponse.json(
      {
        ok: true,
        message: "Usuario creado",
      },
      { status: 201 },
    );
  } catch (err: unknown) {
    let message = "Internal server error";
    let status = 500;

    if (err instanceof AuthError) {
      message = err.message;
      status = err.status;
    } else {
      console.error("[POST /api/auth/signup]", err);
    }

    return NextResponse.json({ ok: false, message }, { status });
  }
}
