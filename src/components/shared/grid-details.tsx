import { CryptoDetailsData } from "@/interfaces";
import { formatNumberAbbreviated } from "@/utils/format-number-abbreviated";
import { PriceVariation } from "./price-variation";

type GridDetailsProps = {
  data: CryptoDetailsData;
};

export const GridDetails = ({ data }: GridDetailsProps) => {
  return (
    <div className="grid grid-cols-2 grid-rows-4 gap-2.5">
      <div className="border border-thin col-span-2 px-2 py-1 flex flex-col items-center rounded-lg justify-center">
        <span className="text-xs text-gray-400">Market cap</span>
        <span className="text-sm font-bold">
          {formatNumberAbbreviated(data.market_cap)}
        </span>
      </div>
      <div className="border border-thin flex flex-col items-center px-2 py-0.5 rounded-lg justify-center">
        <span className="text-xs text-gray-400">Volume (24h)</span>
        <span className="text-sm font-bold">
          {formatNumberAbbreviated(data.total_volume)}
        </span>
      </div>
      <div className="border border-thin flex flex-col items-center px-2 py-0.5 rounded-lg justify-center">
        <span className="text-xs text-gray-400">FDV</span>
        <span className="text-sm font-bold">
          {formatNumberAbbreviated(data.fully_diluted_valuation)}
        </span>
      </div>

      <div className="border border-thin flex flex-col items-center px-2 py-0.5 rounded-lg justify-center">
        <span className="text-xs text-gray-400">Mkt Cap Change(24h)</span>
        <span className="text-sm font-bold ">
          <PriceVariation variation={data.market_cap_change_percentage_24h} />
        </span>
      </div>
      <div className="border border-thin flex flex-col items-center px-2 py-0.5 rounded-lg justify-center">
        <span className="text-xs text-gray-400">Total supply</span>
        <span className="text-sm font-bold">
          {formatNumberAbbreviated(data.total_supply)}
        </span>
      </div>

      <div className="border border-thin flex flex-col items-center px-2 py-0.5 rounded-lg justify-center">
        <span className="text-xs text-gray-400">Max. supply</span>
        <span className="text-sm font-bold">
          {formatNumberAbbreviated(data.max_supply)
            ? formatNumberAbbreviated(data.max_supply)
            : "∞"}
        </span>
      </div>

      <div className="border border-thin flex flex-col items-center px-2 py-0.5 rounded-lg justify-center">
        <span className="text-xs text-gray-400">Circulating supply</span>
        <span className="text-sm font-bold">
          {formatNumberAbbreviated(data.circulating_supply)}
        </span>
      </div>
    </div>
  );
};
