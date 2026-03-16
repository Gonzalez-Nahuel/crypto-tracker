"use client";
import { COINGECKO_ENDPOINTS } from "@/constants";
import { CryptoDetailsData } from "@/interfaces";
import { useAppSelector } from "@/redux/hooks";

import { PriceInfo } from "./price-info";
import LineChart from "../shared/line-chart";
import { GridDetails } from "../shared/grid-details";

type CryptoDetailsProps = {
  id: string;
};

export const CryptoDetails = ({ id }: CryptoDetailsProps) => {
  const top100 = useAppSelector(
    (state) => state.cryptoApi[COINGECKO_ENDPOINTS.top100]
  );

  if (!top100 || !top100.data) {
    return <div>Cargando datos...</div>;
  }

  const cryptoList = top100?.data ?? [];

  const crypto = cryptoList.find((c: CryptoDetailsData) => c.id === id);

  return (
    <main className="m-4 h-175 flex lg:items-center">
      <div className="flex flex-col gap-24 lg:h-150 lg:flex-row lg:justify-between lg:max-w-350 xl:mx-auto w-full">
        <section className="flex flex-col gap-10 lg:w-lg lg:justify-between">
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
          <div className="hidden lg:block">
            <GridDetails data={crypto} />
          </div>
        </section>
        <section className="lg:w-2/3 lg:flex lg:justify-center  lg:items-center">
          <div className="lg:hidden">
            <GridDetails data={crypto} />
          </div>
          <div className="hidden lg:block  w-full">
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
        </section>
      </div>
    </main>
  );
};
