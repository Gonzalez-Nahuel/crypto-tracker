"use client";
import {
  COINGECKO_ENDPOINTS,
  CRYPTOCOMPARE_ENDPOINTS,
  metrics,
  URL_APIS,
} from "@/constants";
import { MetricCard } from "./metric-card";
import { useAppDispatch } from "@/redux/hooks";
import { Request } from "@/redux/slices/crypto-slice";
import { useEffect } from "react";

export const MetricCardWrapper = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      Request({
        baseUrl: URL_APIS.coingecko,
        endpoint: `${COINGECKO_ENDPOINTS.global}`,
      })
    );
    dispatch(
      Request({
        baseUrl: URL_APIS.coingecko,
        endpoint: `${COINGECKO_ENDPOINTS.bitcoin}`,
      })
    );
    dispatch(Request({ baseUrl: URL_APIS.alternativeMe }));
    dispatch(
      Request({
        baseUrl: URL_APIS.cryptoCompare,
        endpoint: `${CRYPTOCOMPARE_ENDPOINTS.marketCapChart}`,
      })
    );
  }, [dispatch]);

  return (
    <>
      <section className="flex justify-between gap-2 w-full md:max-w-4xl xl:max-w-4/6 mx-auto my-4">
        {metrics.map((value, index) => (
          <MetricCard key={index} value={value} />
        ))}
      </section>
    </>
  );
};
