"use server";

import { prisma } from "@/lib/prisma";
import { CryptoDetailsData } from "@/interfaces";
import { cleanCryptoData } from "@/lib/clean-crypto-data";
import { Prisma } from "@/generated/prisma";

export const AddCryptoToList = async (data: CryptoDetailsData) => {
  try {
    const cleaned = cleanCryptoData(data) as Prisma.WatchListCreateInput;

    const crypto = await prisma.watchList.create({
      data: cleaned,
    });

    console.log("Crypto añadida a la lista:", crypto);
  } catch (e) {
    console.error("error:", e);
  }
};
