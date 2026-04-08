"use server";

import { CryptoDetailsData } from "@/interfaces";
import { prisma } from "@/lib/auth/prisma";
import { SessionValidator } from "@/lib/auth/session-validator";
import { watchListDataMapper } from "@/lib/watchlist-data-mapper";

export const AddCryptoToWatchlist = async (data: CryptoDetailsData) => {
  try {
    const cleaned = await watchListDataMapper(data);

    const crypto = await prisma.watchlist.create({
      data: cleaned,
    });

    return crypto;
  } catch (e) {
    console.error("error:", e);
  }
};

export const DeleteCryptoToWatchlist = async (id: string) => {
  try {
    const session = await SessionValidator();

    if (session.status === 401) return;

    await prisma.watchlist.delete({
      where: {
        userId_cryptoId: {
          userId: session.payload.sub,
          cryptoId: id,
        },
      },
    });
  } catch (e) {
    console.log(e);
  }
};
