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
  bitcoin: "coins/markets?vs_currency=usd&ids=bitcoin",
};

export const CRYPTOCOMPARE_ENDPOINTS = {
  marketCapChart: "data/v2/histoday?fsym=BTC&tsym=USD&limit=100",
};
