"use client";
import { COINGECKO_ENDPOINTS } from "@/constants";
import { useAppSelector } from "@/redux/hooks";
import { CryptoDetails } from "./crypto-details";
import { CryptoDetailsData } from "@/interfaces";

export const CryptoList = () => {
  const list = useAppSelector(
    (state) => state.cryptoApi[COINGECKO_ENDPOINTS.top100]
  );

  const details = list?.data ?? [];

  return (
    <section className=" my-6">
      <h2 className="text-2xl font-bold mb-2">Top</h2>
      <table className="border-t border-t-thin font-medium text-sm w-full">
        <colgroup>
          <col className="w-12" />
          <col className="w-80" />
          <col className="max-w-34" />
          <col className="max-w-34" />
          <col className="max-w-34" />
          <col className="max-w-34" />
          <col className="max-w-56" />
          <col className="max-w-56" />
          <col className="max-w-44" />
          <col className="w-auto" />
        </colgroup>
        <thead>
          <tr className="border-b border-b-thin h-12">
            <th>#</th>
            <th className="text-start">Name</th>
            <th className="text-end">Price</th>
            <th className="text-end">1h %</th>
            <th className="text-end">24h %</th>
            <th className="text-end">7d %</th>
            <th className="text-end">Market Cap</th>
            <th className="text-end">Volume(24h)</th>
            <th className="text-end">Circulating Supply</th>
            <th className="hidden xl:table-cell text-end">Last 7 Days</th>
          </tr>
        </thead>
        <tbody>
          {details!.map((data: CryptoDetailsData) => (
            <CryptoDetails key={data.id} data={data} />
          ))}
        </tbody>
      </table>
    </section>
  );
};
