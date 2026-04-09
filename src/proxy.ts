import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import { GenerateTokens } from "@/lib/generate-tokens";

export function proxy(req: NextRequest) {
  const accessToken = req.cookies.get("accessToken")?.value;
  const refreshToken = req.cookies.get("refreshToken")?.value;

  if (!accessToken && !refreshToken) return NextResponse.next();

  if (accessToken) {
    try {
      jwt.verify(accessToken!, process.env.ACCESS_SECRET);

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

    const newAccessToken = GenerateTokens.generateAccessToken(cleanPayload);
    const newRefreshToken = GenerateTokens.generateRefreshToken(cleanPayload);

    const res = NextResponse.next();

    res.cookies.set("accessToken", newAccessToken, {
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
