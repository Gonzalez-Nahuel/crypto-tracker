"use client";
import { CryptoDetailsData } from "@/interfaces";
import { currencyFormatter } from "@/utils/currency-formatter";
import { formatNumberAbbreviated } from "@/utils/format-number-abbreviated";
import Image from "next/image";
import { ProgressIndicator } from "../shared/progress-indicator";
import LineChart from "../shared/line-chart";
import { useRouter } from "next/navigation";
import { PriceVariation } from "../shared/price-variation";
import {
  AddCryptoToWatchlist,
  DeleteCryptoToWatchlist,
} from "@/app/actions/watch-list/actions";
import { LoaderCircle, Star } from "lucide-react";
import { useState } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { refreshWatchlist } from "@/redux/slices/session-slice";

interface CryptoDetailsProps {
  data: CryptoDetailsData;
}

export const CryptoList = ({ data }: CryptoDetailsProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handlerRoute = (id: string) => {
    router.push(`/details/${id}`);
  };

  const toggleFavCrypto = async (crypto: CryptoDetailsData) => {
    setIsLoading(true);

    dispatch(refreshWatchlist(crypto.id));

    try {
      if (crypto.favorite) {
        await DeleteCryptoToWatchlist(crypto.id);
      } else {
        await AddCryptoToWatchlist(crypto);
      }
    } catch (_) {
      dispatch(refreshWatchlist(crypto.id));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <tr
      onClick={() => handlerRoute(data.id)}
      className="border-b border-b-thin h-12 cursor-pointer"
    >
      <td
        onClick={(e) => {
          e.stopPropagation();
          toggleFavCrypto(data);
        }}
      >
        {data.favorite ? (
          isLoading ? (
            <LoaderCircle className="animate-spin w-5 h-5" />
          ) : (
            <Star width={16} height={16} color="gold" fill="gold" />
          )
        ) : isLoading ? (
          <LoaderCircle className="animate-spin w-5 h-5" />
        ) : (
          <Star width={16} height={16} color="gold" />
        )}
      </td>
      <td className="text-center p-1.5">{data.market_cap_rank}</td>
      <td>
        <div className="flex items-center gap-2">
          <Image
            className="rounded-full" /*(\u25BC) flecha abajo*/
            src={data.image} /*(\u25B2) flecha arriba*/
            alt={data.id}
            width={25}
            height={25}
          />
          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
            <span className="font-semibold">{data.name}</span>
            <span className="text-gray-400 font-normal text-xs sm:text-sm">
              {data.symbol.toUpperCase()}
            </span>
          </div>
        </div>
      </td>
      <td>
        <div className="text-end">
          <span>{currencyFormatter(data.current_price)}</span>
        </div>
      </td>
      <td className="text-end hidden sm:table-cell">
        <PriceVariation
          variation={data.price_change_percentage_1h_in_currency}
        />
      </td>
      <td className="text-end">
        <PriceVariation
          variation={data.price_change_percentage_24h_in_currency}
        />
      </td>
      <td className="text-end hidden md:table-cell">
        <PriceVariation
          variation={data.price_change_percentage_7d_in_currency}
        />
      </td>
      <td className="hidden lg:table-cell">
        <div className="text-end ">
          <span>{currencyFormatter(data.market_cap)}</span>
        </div>
      </td>
      <td className="text-end hidden md:table-cell">
        <div>
          <span>{currencyFormatter(data.total_volume)}</span>
        </div>
        <div className="text-xs">
          {formatNumberAbbreviated(data.total_volume / data.current_price)}
        </div>
      </td>
      <td className="text-end hidden lg:table-cell">
        <div className="flex flex-col items-end">
          <div className="mb-1">
            {formatNumberAbbreviated(data.circulating_supply)}
          </div>
          <div>
            {data.max_supply ? (
              <ProgressIndicator
                a={data.circulating_supply}
                b={data.max_supply}
              />
            ) : (
              ""
            )}
          </div>
        </div>
      </td>
      <td className="xl:flex justify-end hidden">
        <div className="w-44">
          <LineChart
            value={data.price_change_percentage_7d_in_currency}
            data={data.sparkline_in_7d.price}
            height={38}
          />
        </div>
      </td>
    </tr>
  );
};
