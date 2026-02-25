import jwt, { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";
import { GenerateTokens } from "../generate-tokens";

export const authRefresh = async (refresh: string | undefined) => {
  
  if (refresh) {
    
    try {
      const newPayload = jwt.verify(
        refresh,
        process.env.REFRESH_SECRET,
      ) as JwtPayload;
  

      const cleanPayload = {
        email: newPayload.email,
        username: newPayload.username,
      };

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

      return { status: 200, payload: newPayload };
    } catch (_) {
      
      return { status: 401, message: "NO_SESSION" };
    }
  } else {
    return { status: 401, message: "NO_SESSION" };
  }
};
