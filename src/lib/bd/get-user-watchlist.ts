import { SessionValidator } from "../auth/session-validator";
import { prisma } from "./prisma";

export const GetUserWatchList = async () => {
  try {
    const userData = await SessionValidator();

    console.log("userData:", userData);

    const userWatchList = await prisma.watchlist.findMany({
      where: {
        userId: Number(userData.payload?.sub),
      },
    });

    const Fav = new Map(userWatchList.map((c) => [c.cryptoId, c.id]));

    return Fav;
  } catch (e) {
    console.log("error en catch getUSerWatch", e);
  }
};
