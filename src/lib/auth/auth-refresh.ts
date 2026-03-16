import { GenerateTokens } from "@/lib/generate-tokens";
import jwt, { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";

export const authRefresh = async (refresh: string | undefined) => {
  if (refresh) {
    try {
      const newPayload = jwt.verify(
        refresh,
        process.env.REFRESH_SECRET,
      ) as JwtPayload;

      const cleanPayload = {
        sub: newPayload.sub,
        email: newPayload.email,
        username: newPayload.username,
      } as JwtPayload;

      const newAccesToken = GenerateTokens.generateAccesToken(cleanPayload);
      const newRefreshToken = GenerateTokens.generateRefreshToken(cleanPayload);

      (await cookies()).set("accesToken", newAccesToken, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 60 * 15,
      });

      (await cookies()).set("refreshToken", newRefreshToken, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 7,
      });
      console.log("payload:", newPayload, cleanPayload);
      return { status: 200, payload: cleanPayload };
    } catch (err: unknown) {
      console.log("err authrefrtesh", err);
      return { status: 401, message: "NO_SESSION" };
    }
  } else {
    return { status: 401, message: "NO_SESSION" };
  }
};
