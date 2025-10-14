"use client";
import { COINGECKO_ENDPOINTS } from "@/constants";
import { CryptoDetailsData } from "@/interfaces";
import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/router";

type CryptoDetailsProps = {
  id: string;
};

export const CryptoDetails = ({ id }: CryptoDetailsProps) => {
  const top100 = useAppSelector(
    (state) => state.cryptoApi[COINGECKO_ENDPOINTS.top100]
  );
  console.log(top100);
  console.log(id);
  if (!top100 || !top100.data) {
    return <div>Cargando datos...</div>;
  }

  const cryptoList = top100?.data ?? [];
  console.log(cryptoList);

  const crypto = cryptoList.find((c: CryptoDetailsData) => c.id === id);
  console.log(crypto);
  return <div>{crypto.id}</div>;
};
