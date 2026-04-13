import { JwtPayload } from "jsonwebtoken";

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
  fully_diluted_valuation: number;
  total_volume: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  sparkline_in_7d: SparkLine;
  price_change_percentage_1h_in_currency: number;
  price_change_percentage_24h_in_currency: number;
  price_change_percentage_7d_in_currency: number;
  favorite: boolean;
}

export interface PrivateUser {
  id: number;
  email: string;
  username: string;
  password: string;
}

export interface PublicUser {
  sub: number;
  email: string;
  username: string;
}

export type TokenPayload = JwtPayload & {
  email: string;
  username: string;
};

type SuccessSession = {
  status: 200;
  payload: PublicUser;
};

type ErrorSession = {
  status: 401;
  message: string;
};

export type Session = SuccessSession | ErrorSession;

export type WatchlistType = string;
