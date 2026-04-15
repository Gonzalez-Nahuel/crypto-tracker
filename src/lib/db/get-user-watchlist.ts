import { WatchlistType } from "@/interfaces";
import { prisma } from "@/lib/db/prisma";

export const getUserWatchList = async (id: number) => {
  try {
    const userWatchList = await prisma.watchlist.findMany({
      where: {
        userId: id,
      },
    });

    const list = userWatchList.map((c): WatchlistType => c.cryptoId);

    return list;
  } catch (_) {
    return [];
  }
};
