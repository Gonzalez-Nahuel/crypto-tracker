import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import { GenerateTokens } from "@/lib/generate-tokens";

export function proxy(req: NextRequest) {
  const accesToken = req.cookies.get("accesToken")?.value;
  const refreshToken = req.cookies.get("refreshToken")?.value;

  if (!accesToken && !refreshToken) return NextResponse.next();

  if (accesToken) {
    try {
      jwt.verify(accesToken!, process.env.ACCESS_SECRET);

      return NextResponse.next();
    } catch (err: unknown) {
      if (!(err instanceof Error) || err.name !== "TokenExpiredError")
        return NextResponse.next();
    }
  }

  try {
    const newPayload = jwt.verify(
      refreshToken!,
      process.env.REFRESH_SECRET,
    ) as JwtPayload;

    const cleanPayload = {
      sub: newPayload.sub,
      email: newPayload.email,
      username: newPayload.username,
    } as JwtPayload;

    const newAccesToken = GenerateTokens.generateAccesToken(cleanPayload);
    const newRefreshToken = GenerateTokens.generateRefreshToken(cleanPayload);

    const res = NextResponse.next();

    res.cookies.set("accesToken", newAccesToken, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 60 * 15,
    });

    res.cookies.set("refreshToken", newRefreshToken, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7,
    });

    return res;
  } catch (_) {
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api/public).*)"],
};
