import { GlobalData } from "@/interfaces";

export const total2MarketCapVariation = (
  data: GlobalData,
  btcMCV: number,
  total2: number
) => {
  const btcDominance = data.market_cap_percentage.btc;
  const total2MC = total2;
  const btcVariation = btcMCV;
  const totalMCap = data.total_market_cap.usd;
  const marketCapVariation = data.market_cap_change_percentage_24h_usd;
  const totalMCapYesterday = totalMCap / (1 + marketCapVariation / 100);
  const btcMCap = totalMCap * (btcDominance / 100);
  const btcMCapYesterday = btcMCap / (1 + btcVariation / 100);
  const total2MCapYesterday = totalMCapYesterday - btcMCapYesterday;
  const total2MCapVariation =
    ((total2MC - total2MCapYesterday) / total2MCapYesterday) * 100;

  return total2MCapVariation;
};
