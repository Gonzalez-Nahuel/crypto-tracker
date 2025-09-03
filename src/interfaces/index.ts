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
