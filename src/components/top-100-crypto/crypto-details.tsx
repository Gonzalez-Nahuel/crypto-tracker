"use client";
import { COINGECKO_ENDPOINTS } from "@/constants";
import { CryptoDetailsData, CryptoNewsType } from "@/interfaces";
import { useAppSelector } from "@/redux/hooks";
import { PriceInfo } from "./price-info";
import LineChart from "../shared/line-chart";
import { GridDetails } from "../shared/grid-details";
import { CryptoNews } from "../ui/crypto-news";

type CryptoDetailsProps = {
  id: string;
  news: CryptoNewsType[];
};

export const CryptoDetails = ({ id, news }: CryptoDetailsProps) => {
  const top100 = useAppSelector(
    (state) => state.cryptoApi[COINGECKO_ENDPOINTS.top100],
  );

  if (!top100 || !top100.data) {
    return <div>Cargando datos...</div>;
  }

  const cryptoList = top100?.data ?? [];

  const crypto = cryptoList.find((c: CryptoDetailsData) => c.id === id);

  return (
    <div className=" h-[calc(100vh-55px)] overflow-hidden">
      <div className="flex flex-col lg:flex-row h-full w-full">
        <div className="flex px-4 flex-col overflow-y-auto gap-10 lg:w-80 lg:shrink-0 lg:h-full lg:overflow-hidden lg:justify-evenly lg:border-r lg:border-thin">
          <PriceInfo data={crypto} />
          <div className="lg:hidden text-foreground px-2">
            <LineChart
              value={crypto.price_change_percentage_7d_in_currency}
              data={crypto.sparkline_in_7d.price}
              height={300}
              horzlines={true}
              rightPrice={true}
              timeScale={true}
              border={true}
            />
          </div>
          <div className="mt-20">
            <GridDetails data={crypto} />
          </div>
          <section className="lg:hidden">
            <CryptoNews news={news} />
          </section>
        </div>
        <div className="hidden lg:flex lg:overflow-y-auto lg:h-full lg:flex-col lg:gap-12 lg:min-w-0 lg:flex-1 lg:py-8 xl:flex-row xl:gap-0 xl:p-0 xl:overflow-hidden">
          <div className="hidden px-4 lg:block flex-1 xl:flex xl:items-center xl:min-w-0">
            <div className="w-full">
              <LineChart
                value={crypto.price_change_percentage_7d_in_currency}
                data={crypto.sparkline_in_7d.price}
                height={380}
                horzlines={true}
                rightPrice={true}
                timeScale={true}
                border={true}
              />
            </div>
          </div>
          <section className="xl:w-80 xl:shrink-0 xl:border-l xl:border-thin px-4 py-4 h-full xl:pt-8 xl:overflow-auto">
            <CryptoNews news={news} />
          </section>
        </div>
      </div>
    </div>
  );
};
