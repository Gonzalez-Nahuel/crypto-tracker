import { CryptoDetailsData } from "@/interfaces";
import { SessionValidator } from "../auth/session-validator";

export const watchListDataMapper = async (data: CryptoDetailsData) => {
  const userData = await SessionValidator();

  if (userData.status === 401) throw new Error("Unauthorized");

  const watchlistInfo = {
    cryptoId: data.id,
    userId: Number(userData.payload?.sub),
  };

  return watchlistInfo;
};
