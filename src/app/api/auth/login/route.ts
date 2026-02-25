import { GenerateTokens } from "@/lib/generate-tokens";
import { CredentialsValidator } from "@/lib/auth/credentials-validator";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { toPublicUser } from "@/lib/to-public-user";
import { AuthError } from "@/lib/auth/auth-error";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    await CredentialsValidator.validateUser(user, password);

    const publicUser = toPublicUser(user!);

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

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    let message = "Internal server error";
    let status = 500;

    console.log(err);

    if (err instanceof AuthError) {
      message = err.message;
      status = err.status;
    }

    return NextResponse.json({ ok: false, message }, { status });
  }
}
