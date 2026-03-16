import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export const SessionValidator = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accesToken")?.value;

  if (!accessToken) return { status: 401, message: "NO_SESSION" };

  try {
    const payload = jwt.verify(accessToken, process.env.ACCESS_SECRET);

    return { status: 200, payload };
  } catch (_) {
    return { status: 401, message: "NO_SESSION" };
  }
};
