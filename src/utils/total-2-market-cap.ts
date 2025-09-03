import { GlobalData } from "@/interfaces";

export const Total2MarketCap = (data: GlobalData): number => {
  const btcPercentage = data.market_cap_percentage.btc / 100;
  const marketCapBtc = data.total_market_cap.usd * btcPercentage;
  const total2 = data.total_market_cap.usd - marketCapBtc;

  return total2;
};
