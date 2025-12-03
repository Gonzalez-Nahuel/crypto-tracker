import { CryptoDetailsData } from "@/interfaces";

export const cleanCryptoData = (data: CryptoDetailsData) => {
  const allowedFields = [
    "id",
    "symbol",
    "name",
    "image",
    "current_price",
    "market_cap",
    "market_cap_rank",
    "fully_diluted_valuation",
    "total_volume",
    "market_cap_change_24h",
    "market_cap_change_percentage_24h",
    "circulating_supply",
    "total_supply",
    "max_supply",
    "sparkline_in_7d",
    "price_change_percentage_1h_in_currency",
    "price_change_percentage_24h_in_currency",
    "price_change_percentage_7d_in_currency",
  ];

  return Object.fromEntries(
    Object.entries(data).filter(([key]) => allowedFields.includes(key))
  );
};
