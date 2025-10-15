"use client";
import { COINGECKO_ENDPOINTS } from "@/constants";
import { CryptoDetailsData } from "@/interfaces";
import { useAppSelector } from "@/redux/hooks";

type CryptoDetailsProps = {
  id: string;
};

export const CryptoDetails = ({ id }: CryptoDetailsProps) => {
  const top100 = useAppSelector(
    (state) => state.cryptoApi[COINGECKO_ENDPOINTS.top100]
  );

  if (!top100 || !top100.data) {
    return <div>Cargando datos...</div>;
  }

  const cryptoList = top100?.data ?? [];

  const crypto = cryptoList.find((c: CryptoDetailsData) => c.id === id);

  return <div>{crypto.id}</div>;
};
