import { SessionValidator } from "../auth/session-validator";
import { prisma } from "./prisma";

export const GetUserWatchList = async () => {
  try {
    const userData = await SessionValidator();

    const userId = Number(userData.payload?.sub);

    const userWatchList = await prisma.watchlist.findMany({
      where: {
        userId,
      },
    });

    const Fav = new Map(userWatchList.map((c) => [c.cryptoId, c.id]));

    return Fav;
  } catch (_) {}
};
