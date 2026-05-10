import { CryptoDetailsData } from "@/interfaces";
import { currencyFormatter } from "@/utils/currency-formatter";
import Image from "next/image";
import { PriceVariation } from "../shared/price-variation";
import { formatNumberAbbreviated } from "@/utils/format-number-abbreviated";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

type SearchModalItemProps = {
  item: CryptoDetailsData;
  setIsSearchModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const SearchModalItem = ({
  item,
  setIsSearchModalOpen,
}: SearchModalItemProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const prevPathname = useRef(pathname);

  useEffect(() => {
    if (prevPathname.current !== pathname) {
      setIsSearchModalOpen(false);
    }

    prevPathname.current = pathname;
  }, [pathname, setIsSearchModalOpen, prevPathname]);

  const handlerRoute = (id: string) => {
    router.push(`/details/${id}`);
  };

  return (
    <li
      onClick={() => handlerRoute(item.id)}
      className="flex p-2 justify-between bg-search-modal-item-bg md:items-center rounded-xl m-2 shadow-lg cursor-pointer border border-transparent hover:bg-search-modal-item-bg-hover hover:border-search-modal-item-border-hover "
    >
      <div className="flex flex-col gap-1 md:flex-row md:justify-between w-3/5 ">
        <div className="flex items-center gap-2 text-sm ">
          <Image
            className="rounded-full"
            src={item.image}
            alt={item.id}
            width={25}
            height={25}
          />

          <div className="flex flex-col">
            <div className="flex gap-1">
              <span className="font-semibold">{item.name}</span>
              <span className="flex items-center text-xs text-gray-400 bg-hover-bg px-1 rounded-sm ">
                #{item.market_cap_rank}
              </span>
            </div>
            <span className="text-gray-400 ">{item.symbol.toUpperCase()}</span>
          </div>
        </div>
        <div className="flex gap-4 px-8 md:flex-col md:px-0 md:justify-center text-xs md:gap-0.5">
          <span className="text-gray-400">
            MCap:
            <span className="text-gray-400 md:text-foreground md:font-bold ml-1">
              {formatNumberAbbreviated(item.market_cap)}
            </span>
          </span>
          <span className="text-gray-400">
            Vol(24h):
            <span className="text-gray-400 md:text-foreground md:font-bold ml-1">
              {formatNumberAbbreviated(item.total_volume)}
            </span>
          </span>
        </div>
      </div>
      <div className="flex flex-col justify-start md:justify-center text-xs items-end">
        <span className="font-bold text-sm">
          {currencyFormatter(item.current_price)}
        </span>
        <PriceVariation variation={item.market_cap_change_percentage_24h} />
      </div>
    </li>
  );
};
