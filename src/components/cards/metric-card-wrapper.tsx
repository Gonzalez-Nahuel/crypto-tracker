"use client";
import { metrics } from "@/constants";
import { MetricCard } from "./metric-card";
import { useAppDispatch } from "@/redux/hooks";
import { AlternativeMe, Coingecko } from "@/redux/slices/crypto-slice";
import { useEffect } from "react";

export const MetricCardWrapper = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(Coingecko({ path: "global" }));
    dispatch(
      Coingecko({
        path: "coins/markets",
        params: "vs_currency=usd&ids=bitcoin",
      })
    );
    dispatch(AlternativeMe());
  }, [dispatch]);

  return (
    <section className="flex gap-2 w-max mx-auto my-4">
      {metrics.map((value, index) => (
        <MetricCard key={index} value={value} />
      ))}
    </section>
  );
};
