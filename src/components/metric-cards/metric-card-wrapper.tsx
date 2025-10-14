"use client";
import {
  COINGECKO_ENDPOINTS,
  CRYPTOCOMPARE_ENDPOINTS,
  metrics,
  URL_APIS,
} from "@/constants";
import { MetricCard } from "./metric-card";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Request } from "@/redux/slices/crypto-slice";
import { useEffect, useRef } from "react";

const cacheDuration = 10 * 60 * 1000;

export const MetricCardWrapper = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.cryptoApi);

  const fetched = useRef<{ [key: string]: boolean }>({});

  useEffect(() => {
    const needsFecth = (endpoint: string) => {
      const entry = state[endpoint];
      if (!entry) return true;
      const now = Date.now();
      const expired = now - entry.timeStamp > cacheDuration;
      return expired;
    };

    const endpoints = [
      {
        key: COINGECKO_ENDPOINTS.global,
        baseUrl: URL_APIS.coingecko,
        endpoint: COINGECKO_ENDPOINTS.global,
      },
      {
        key: COINGECKO_ENDPOINTS.top100,
        baseUrl: URL_APIS.coingecko,
        endpoint: COINGECKO_ENDPOINTS.top100,
      },
      { key: URL_APIS.alternativeMe, baseUrl: URL_APIS.alternativeMe },
      {
        key: CRYPTOCOMPARE_ENDPOINTS.marketCapChart,
        baseUrl: URL_APIS.cryptoCompare,
        endpoint: CRYPTOCOMPARE_ENDPOINTS.marketCapChart,
      },
    ];

    endpoints.forEach(({ key, baseUrl, endpoint }) => {
      if (!fetched.current[key] && needsFecth(key)) {
        dispatch(Request({ baseUrl, endpoint }));
        fetched.current[key] = true; // Marcamos como ya solicitado
      }
    });
  }, [dispatch, state]);

  return (
    <>
      <section className="flex justify-between gap-2 w-full md:max-w-4xl xl:max-w-4/6 mx-auto my-8 ">
        {metrics.map((value, index) => (
          <MetricCard key={index} value={value} />
        ))}
      </section>
    </>
  );
};
