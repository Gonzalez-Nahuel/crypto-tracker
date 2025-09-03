import { StatWithCart } from "./stat-with-cart.tsx";
import { StatWithVariation } from "./stat-with-variation.tsx";

type MetricCardProps = {
  value: string;
};

export const MetricCard = ({ value }: MetricCardProps) => {
  return (
    <a className=" block bg-card p-2 min-w-36 w-max shadow-md shadow-surface rounded-lg">
      <h3 className="text-gray-400 text-[11px] mb-1">{value} </h3>
      {value === "Market cap" || value === "Total 2" ? (
        <StatWithVariation value={value} />
      ) : (
        <StatWithCart value={value} />
      )}
    </a>
  );
};
