export interface MarketCap {
  usd: number;
}

export interface MarketCapPercentage {
  btc: number;
}

export interface GlobalData {
  total_market_cap: MarketCap;
  market_cap_percentage: MarketCapPercentage;
  market_cap_change_percentage_24h_usd: number;
}

export interface FearAndGreed {
  value: string;
  value_classification: string;
}

interface SparkLine {
  price: number[];
}

export interface CryptoDetailsData {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  total_volume: number;
  market_cap_change_percentage_24h: number;
  circulating_supply: number;
  max_supply: number;
  sparkline_in_7d: SparkLine;
  price_change_percentage_1h_in_currency: number;
  price_change_percentage_24h_in_currency: number;
  price_change_percentage_7d_in_currency: number;
}
