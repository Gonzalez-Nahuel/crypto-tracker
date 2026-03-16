"use server";

import { CryptoDetailsData } from "@/interfaces";
import { prisma } from "@/lib/bd/prisma";
import { watchListDataMapper } from "@/lib/watchlist-data-mapper";

export const AddCryptoToWatchList = async (data: CryptoDetailsData) => {
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
