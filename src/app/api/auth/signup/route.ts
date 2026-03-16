import { AuthError } from "@/lib/auth/auth-error";
import { CredentialsValidator } from "@/lib/auth/credentials-validator";
import { GenerateTokens } from "@/lib/generate-tokens";
import { prisma } from "@/lib/bd/prisma";
import { toPublicUser } from "@/lib/to-public-user";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, username, password } = await req.json();

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

    const publicUser = toPublicUser(newUser!);

    const accesToken = GenerateTokens.generateAccesToken(publicUser);
    const refreshToken = GenerateTokens.generateRefreshToken(publicUser);

    (await cookies()).set("accesToken", accesToken, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 60 * 15,
    });

    (await cookies()).set("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7,
    });

    return NextResponse.json(
      {
        ok: true,
        message: "Usuario creado",
      },
      { status: 200 },
    );
  } catch (err: unknown) {
    let message = "Internal server error";
    let status = 500;

    if (err instanceof AuthError) {
      message = err.message;
      status = err.status;
    }

    return NextResponse.json({ ok: false, message }, { status });
  }
}
