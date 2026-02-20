import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { authRefresh } from "./auth-refresh";

export const SessionValidator = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accesToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

  console.log("iniciando session");

  if (!accessToken) {
    return await authRefresh(refreshToken);
  }

  try {
    const accesPayload = jwt.verify(accessToken, process.env.ACCESS_SECRET);

    return { status: 200, payload: accesPayload };
  } catch (err: unknown) {
    if (err instanceof Error) {
      if (err.name === "TokenExpiredError") {
        return await authRefresh(refreshToken);
      } else {
        return { status: 401, message: "NO_SESSION" };
      }
    } else {
      return { status: 401, message: "NO_SESSION" };
    }
  }
};
