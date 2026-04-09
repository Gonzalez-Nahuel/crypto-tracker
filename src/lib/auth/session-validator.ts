import { PublicUser, Session, TokenPayload } from "@/interfaces";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export const SessionValidator = async (): Promise<Session> => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) return { status: 401, message: "NO_SESSION" };

  try {
    const payload = jwt.verify(
      accessToken,
      process.env.ACCESS_SECRET,
    ) as TokenPayload;

    const userPayload: PublicUser = {
      sub: Number(payload.sub),
      email: payload.email,
      username: payload.username,
    };

    return { status: 200, payload: userPayload };
  } catch (_) {
    return { status: 401, message: "NO_SESSION" };
  }
};
