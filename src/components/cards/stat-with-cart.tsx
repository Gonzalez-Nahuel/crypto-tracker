"use client";
import { FearAndGreed, GlobalData } from "@/interfaces";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { BtcDominanceStats } from "../stats/btc-dominance-stats";
import { useAppSelector } from "@/redux/hooks";

const GaugeChart = dynamic(() => import("react-gauge-chart"), { ssr: false });

type StatWithCartProps = {
  value: string;
};

export const StatWithCart = ({ value }: StatWithCartProps) => {
  const [data, setData] = useState<FearAndGreed | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [btcMCPercentage, setBtcMCPercentage] = useState<GlobalData | null>(
    null
  );

  const MCPercentage = useAppSelector((state) => state.cryptoApi["global"]);
  const fearAndGreed = useAppSelector((state) => state.cryptoApi["fear-greed"]);

  useEffect(() => {
    const getData = async () => {
      if (value === "Btc dominance") {
        if (!MCPercentage) return;

        if (!MCPercentage.ok) {
          setBtcMCPercentage(null);
          setError(MCPercentage.error ?? null);
        } else {
          setError(null);
          setBtcMCPercentage(MCPercentage.data.data.market_cap_percentage.btc);
        }
      } else {
        if (!fearAndGreed) return;

        if (!fearAndGreed.ok) {
          setData(null);
          setError(fearAndGreed.error ?? null);
        } else {
          setData(fearAndGreed.data.data[0]);
          setError(null);
        }
      }
    };
    getData();
  }, [value, MCPercentage, fearAndGreed]);

  const fearAndGreedValue = data ? Number(data.value) / 100 : 0;
  const btcPercentage = btcMCPercentage
    ? Math.floor(Number(btcMCPercentage))
    : 0;

  if (error) return <span>{error}</span>;

  if (value === "Btc dominance") {
    return !btcMCPercentage ? (
      <>
        <div className="h-4 w-16 bg-gray-200 animate-pulse rounded mb-1" />
        <div className="h-3 w-8 bg-gray-200 animate-pulse rounded" />
      </>
    ) : (
      <BtcDominanceStats btcPercentage={btcPercentage} />
    );
  } else {
    return !data ? (
      <>
        <div className="h-4 w-16 bg-gray-200 animate-pulse rounded mb-1" />
        <div className="h-3 w-8 bg-gray-200 animate-pulse rounded" />
      </>
    ) : (
      <div className=" w-full text-center text-xl relative">
        <GaugeChart
          id="fear-greed-gauge"
          nrOfLevels={5}
          colors={["#d32f2f", "#f57c00", "#fbc02d", "#388e3c", "#1b5e20"]}
          arcWidth={0.1}
          percent={fearAndGreedValue}
          formatTextValue={(value) => `${value}`}
          textColor="white"
          fontSize="13px"
          style={{ width: "90px", margin: "auto", fontWeight: "bold" }}
          needleColor="red"
        />
      </div>
    );
  }
};
