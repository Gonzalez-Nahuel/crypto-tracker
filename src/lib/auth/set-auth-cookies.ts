import { PublicUser } from "@/interfaces";
import { GenerateTokens } from "@/lib/generate-tokens";
import { cookies } from "next/headers";

export const setAuthCookies = async (publicUser: PublicUser) => {
  const cookieStore = await cookies();
  const options = {
    httpOnly: true,
    sameSite: "strict" as const,
    //secure: process.env.NODE_ENV === "production",
  };

  const accessToken = GenerateTokens.generateAccessToken(publicUser);
  const refreshToken = GenerateTokens.generateRefreshToken(publicUser);

  cookieStore.set("accessToken", accessToken, { ...options, maxAge: 60 * 15 });
  cookieStore.set("refreshToken", refreshToken, {
    ...options,
    maxAge: 60 * 60 * 24 * 7,
  });
};
