"use client";
import { COINGECKO_ENDPOINTS } from "@/constants";
import { useAppSelector } from "@/redux/hooks";
import { CryptoList } from "./crypto-list";
import { CryptoDetailsData } from "@/interfaces";
import { useState } from "react";

export const CryptoTable = () => {
  const [isActive, setIsActive] = useState<boolean>(true);
  const session = useAppSelector((store) => store.session.session);
  const watchlist = useAppSelector((store) => store.session.watchlist);

  const userFavList = new Set(watchlist);

  const cryptoApiResponse = useAppSelector(
    (state) => state.cryptoApi[COINGECKO_ENDPOINTS.top100],
  );

  const top100List = cryptoApiResponse?.data ?? [];

  const result = top100List.map((c: CryptoDetailsData) => ({
    ...c,
    favorite: userFavList?.has(c.id),
  }));

  const myList = result.filter((data: CryptoDetailsData) => data.favorite);

  const handlerIsActive = () => setIsActive(!isActive);

  return (
    <section className=" my-6 overflow-auto">
      {/*<h2 className="text-2xl font-bold mb-2">Top</h2>*/}
      <ul className="text-2xl font-bold flex gap-8">
        {session ? (
          <>
            <li
              onClick={handlerIsActive}
              className={`${
                isActive
                  ? "relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-1 after:bg-teal-400 after:rounded-full"
                  : ""
              } cursor-pointer p-4 `}
            >
              Top
            </li>
            <li
              onClick={handlerIsActive}
              className={`${
                !isActive
                  ? "relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-1 after:bg-teal-400 after:rounded-full"
                  : ""
              } cursor-pointer p-4`}
            >
              My list
            </li>
          </>
        ) : (
          <li
            onClick={handlerIsActive}
            className="relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-1 after:bg-teal-400 after:rounded-full cursor-pointer p-4"
          >
            Top
          </li>
        )}
      </ul>
      <table className="border-t border-t-thin font-medium text-sm w-full">
        <colgroup>
          <col />
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
            <th className="text-start">Fav</th>
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
          {session
            ? isActive
              ? result!.map((data: CryptoDetailsData) => (
                  <CryptoList key={data.id} data={data} />
                ))
              : myList.map((data: CryptoDetailsData) => (
                  <CryptoList key={data.id} data={data} />
                ))
            : result!.map((data: CryptoDetailsData) => (
                <CryptoList key={data.id} data={data} />
              ))}
        </tbody>
      </table>
    </section>
  );
};
