export const metrics: string[] = [
  "Market Cap",
  "Total 2",
  "Btc Dominance",
  "Fear & Greed",
];

export const URL_APIS = {
  coingecko: "https://api.coingecko.com/api/v3/",
  alternativeMe: "https://api.alternative.me/fng/",
  cryptoCompare: "https://min-api.cryptocompare.com/",
};

export const COINGECKO_ENDPOINTS = {
  global: "global",
  top100:
    "coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=1h,24h,7d",
};

export const CRYPTOCOMPARE_ENDPOINTS = {
  marketCapChart: "data/v2/histoday?fsym=BTC&tsym=USD&limit=150",
};
