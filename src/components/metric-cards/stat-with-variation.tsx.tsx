"use client";

import { useEffect, useState } from "react";
import { formatNumberAbbreviated } from "../../utils/format-number-abbreviated";
import { GlobalData } from "@/interfaces";
import { formatNumberToPercentage } from "@/utils/format-number-to-percentage";
import { Total2MarketCap } from "@/utils/total-2-market-cap";
import { total2MarketCapVariation } from "@/utils/total2-market-cap-variation";
import { useAppSelector } from "@/redux/hooks";
import MiniLineChart from "../stats/chart-card";
import { COINGECKO_ENDPOINTS } from "@/constants";

type StatWithVariationProps = {
  value: string;
};

export const StatWithVariation = ({ value }: StatWithVariationProps) => {
  const [data, setData] = useState<GlobalData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [btcMCV, setBtcMCV] = useState(0);

  const globalData = useAppSelector(
    (state) => state.cryptoApi[`${COINGECKO_ENDPOINTS.global}`]
  );
  const btcMCVariation = useAppSelector(
    (state) => state.cryptoApi[`${COINGECKO_ENDPOINTS.top100}`]
  );

  useEffect(() => {
    if (!globalData || !btcMCVariation) return;

    if (!globalData.ok) {
      setData(null);
      setBtcMCV(0);
      setError(globalData.error ?? null);
    } else {
      setData(globalData.data.data ?? null);
      setError(null);
      setBtcMCV(
        btcMCVariation.data[0].market_cap_change_percentage_24h ?? null
      );
    }
  }, [globalData, btcMCVariation]);

  let marketCapUsd = data ? data.total_market_cap.usd : 0;
  let percentage = data ? data.market_cap_change_percentage_24h_usd : 0;

  if (value === "Total 2") {
    if (data) {
      marketCapUsd = Total2MarketCap(data);
      percentage = total2MarketCapVariation(data, btcMCV, marketCapUsd);
    }
  }

  return (
    <div>
      {error ? (
        <span>{error}</span>
      ) : !data ? (
        <>
          <div className="h-4 w-16 bg-gray-200 animate-pulse rounded mb-1" />
          <div className="h-3 w-8 bg-gray-200 animate-pulse rounded" />
        </>
      ) : (
        <>
          <div className="xl:flex xl:items-center">
            <div className="text-sm font-semibold mb-0.5 xl:font-bold xl:text-xl xl:mr-0.5">
              {error ? "error" : formatNumberAbbreviated(marketCapUsd)}
            </div>
            <div
              className={`text-xs  font-medium xl:font-semibold ${
                Math.sign(percentage) === -1
                  ? "text-amber-500"
                  : "text-teal-500"
              }`}
            >
              <span className="text-[8px] mr-1.5">
                {Math.sign(percentage) === -1 ? "\u25BC" : "\u25B2"}
              </span>

              <span>{formatNumberToPercentage(percentage)}</span>
            </div>
          </div>
          <div className="hidden xl:block">
            <MiniLineChart percentage={percentage} />
          </div>
        </>
      )}
    </div>
  );
};
