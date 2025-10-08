import { StatWithCart } from "./stat-with-cart";
import { StatWithVariation } from "./stat-with-variation.tsx";

type MetricCardProps = {
  value: string;
};

export const MetricCard = ({ value }: MetricCardProps) => {
  return (
    <a className=" block bg-card p-2 xl:text-start md:text-center sm:text-start md:max-w-52 w-1/4  xl:max-w-72 shadow-sm shadow-[#0002] xl:rounded-2xl rounded-lg xl:flex xl:flex-col xl:justify-between xl:p-4">
      <h3 className="text-gray-400 xl:text-base xl:font-semibold xl:text-foreground text-[11px] mb-0.5 xl:mb-1 font-normal">
        {value}
      </h3>
      {value === "Market Cap" || value === "Total 2" ? (
        <StatWithVariation value={value} />
      ) : (
        <StatWithCart value={value} />
      )}
    </a>
  );
};
