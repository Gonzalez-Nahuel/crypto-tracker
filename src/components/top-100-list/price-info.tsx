import { CryptoDetailsData } from "@/interfaces";
import { currencyFormatter } from "@/utils/currency-formatter";
import Image from "next/image";
import { PriceVariation } from "../shared/price-variation";

type PriceInfoProps = {
  data: CryptoDetailsData;
};

export const PriceInfo = ({ data }: PriceInfoProps) => {
  return (
    <div className="flex flex-col gap-2 mt-2">
      <div className="flex items-center gap-1.5 text-xs">
        <Image
          className="rounded-full" /*(\u25BC) flecha abajo*/
          src={data.image} /*(\u25B2) flecha arriba*/
          alt={data.id}
          width={25}
          height={25}
        />
        <span className="font-extrabold text-sm md:text-xl">{data.name}</span>
        <span className="text-gray-400">{data.symbol.toUpperCase()}</span>
        <span className="bg-theme-selector px-2  rounded-md text-xs text-gray-400">
          #{data.market_cap_rank}
        </span>
      </div>
      <div className="text-xs flex items-center gap-2 text">
        <span className="text-2xl md:text-[32px] font-extrabold">
          {currencyFormatter(data.current_price)}
        </span>
        <span>
          <PriceVariation
            variation={data.price_change_percentage_24h_in_currency}
          />
          <span
            className={`${
              Math.sign(data.price_change_percentage_24h_in_currency) === -1
                ? "text-amber-500"
                : "text-teal-500"
            } `}
          >
            (1d)
          </span>
        </span>
      </div>
    </div>
  );
};
