"use client";
import { COINGECKO_ENDPOINTS } from "@/constants";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { CryptoList } from "./crypto-list";
import { CryptoDetailsData } from "@/interfaces";
import { useEffect, useMemo, useState, useTransition } from "react";
import { CryptoTableSkeleton } from "./crypto-table-skeleton";
import { openAuthForm } from "@/redux/slices/auth-form-slice";

export const CryptoTable = () => {
  const [showSkeleton, setShowSkeleton] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [tab, setTab] = useState<"top" | "favorite">("top");
  const session = useAppSelector((store) => store.session.session);
  const watchlist = useAppSelector((store) => store.session.watchlist);

  const dispatch = useAppDispatch();

  const cryptoApiResponse = useAppSelector(
    (state) => state.cryptoApi[COINGECKO_ENDPOINTS.top100],
  );

  const isLoading = cryptoApiResponse?.loading || showSkeleton;

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (isPending) {
      timeout = setTimeout(() => setShowSkeleton(true), 150);
    } else {
      setShowSkeleton(false);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [isPending]);

  const result = useMemo(() => {
    const top100List = cryptoApiResponse?.data ?? [];
    const userFavList = new Set(watchlist);

    return top100List.map((c: CryptoDetailsData) => ({
      ...c,
      favorite: userFavList?.has(c.id),
    }));
  }, [cryptoApiResponse, watchlist]);

  const myList = result.filter((data: CryptoDetailsData) => data.favorite);

  const dataToRender =
    session && watchlist.length > 0 && tab === "favorite" ? myList : result;

  const changeTab = (newTab: "top" | "favorite") => {
    startTransition(() => {
      setTab(newTab);
    });
  };

  return (
    <section className=" my-6">
      <ul className="text-2xl font-bold flex gap-8">
        {session && watchlist.length > 0 ? (
          <>
            <li
              onClick={() => changeTab("top")}
              className={`${
                tab === "top"
                  ? "relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-1 after:bg-teal-400 after:rounded-full"
                  : ""
              } cursor-pointer p-4 `}
            >
              Top
            </li>
            <li
              onClick={() => changeTab("favorite")}
              className={`${
                tab === "favorite"
                  ? "relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-1 after:bg-teal-400 after:rounded-full"
                  : ""
              } cursor-pointer p-4`}
            >
              My list
            </li>
          </>
        ) : (
          <li className="relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-1 after:bg-teal-400 after:rounded-full cursor-pointer p-4">
            Top
          </li>
        )}
      </ul>
      {showLoginPrompt && (
        <div className="fixed z-50 top-1/2  left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%]  max-w-md bg-card text-foreground border border-thin rounded-2xl shadow-xl p-4 animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2 font-semibold text-sm">
              <span className="text-green-500">✔</span>
              Add to your Watchlist?
            </div>
            <button
              onClick={() => setShowLoginPrompt(false)}
              className="text-muted-foreground hover:text-foreground transition"
            >
              ✕
            </button>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Sign up in just a few easy steps.
          </p>
          <button
            onClick={() => {
              dispatch(openAuthForm("signup"));
              setShowLoginPrompt(false);
            }}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-xl font-medium transition cursor-pointer"
          >
            Create an account
          </button>
        </div>
      )}
      <table className="border-t border-t-thin font-medium text-sm w-full">
        <colgroup>
          <col />
          <col className="w-12" />
          <col className="w-80" />
          <col className="w-36" />
          <col className="w-auto" />
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
            <th className="text-end hidden sm:table-cell">1h %</th>
            <th className="text-end">24h %</th>
            <th className="text-end hidden md:table-cell">7d %</th>
            <th className="text-end hidden lg:table-cell">Market Cap</th>
            <th className="text-end hidden md:table-cell">Volume(24h)</th>
            <th className="text-end hidden lg:table-cell">
              Circulating Supply
            </th>
            <th className="hidden xl:table-cell text-end">Last 7 Days</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <CryptoTableSkeleton />
          ) : (
            dataToRender!.map((data: CryptoDetailsData) => (
              <CryptoList
                key={data.id}
                data={data}
                setShowLoginPrompt={setShowLoginPrompt}
              />
            ))
          )}
        </tbody>
      </table>
    </section>
  );
};
