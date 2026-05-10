import { Search, X } from "lucide-react";
import { SearchModalList } from "./search-modal-list";
import { useAppSelector } from "@/redux/hooks";
import { COINGECKO_ENDPOINTS } from "@/constants";
import React, { useState } from "react";
import { CryptoDetailsData } from "@/interfaces";

type SearchModalProps = {
  setIsSearchModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const SearchModal = ({ setIsSearchModalOpen }: SearchModalProps) => {
  const [search, setSearch] = useState("");
  const cryptoApiResponse = useAppSelector(
    (state) => state.cryptoApi[COINGECKO_ENDPOINTS.top100],
  );

  const hasSearch = search.trim() !== "";

  const top100List = cryptoApiResponse?.data ?? [];

  const filteredCryptosTitle = "Cryptoassets";

  const filteredCryptos = hasSearch
    ? top100List.filter((crypto: CryptoDetailsData) => {
        const query = search.toLowerCase();

        return (
          crypto.name.toLowerCase().includes(query) ||
          crypto.symbol.toLowerCase().includes(query)
        );
      })
    : [];

  const top100Prevew = top100List.slice(0, 5);
  const top100PrevewTitle = "Top market cap 🔥";

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm animate-in fade-in z-50">
      <div className="absolute flex flex-col justify-between gap-6  py-4 inset-0 sm:top-14 sm:left-1/2 sm:-translate-x-1/2 sm:w-5/6 sm:max-w-3xl sm:h-fit sm:inset-auto bg-card sm:rounded-2xl">
        <div className="flex justify-between gap-3 px-4 text-sm items-center">
          <Search size={15} className="text-gray-500" />
          <input
            onChange={(e) => setSearch(e.target.value)}
            id="search"
            name="search"
            type="text"
            autoComplete="off"
            placeholder="What are you looking for?"
            className=" flex-1 focus:outline-none"
          />
          <X
            onClick={() => setIsSearchModalOpen(false)}
            size={25}
            className="text-gray-500 hover:bg-hover-bg hover:rounded-full cursor-pointer p-1"
          />
        </div>
        {hasSearch && (
          <div className="flex flex-col flex-1 justify-around">
            <SearchModalList
              title={filteredCryptosTitle}
              list={filteredCryptos}
              setIsSearchModalOpen={setIsSearchModalOpen}
            />
          </div>
        )}
        <div className="flex flex-col flex-1 justify-around">
          <SearchModalList
            title={top100PrevewTitle}
            list={top100Prevew}
            setIsSearchModalOpen={setIsSearchModalOpen}
          />
        </div>
      </div>
    </div>
  );
};
