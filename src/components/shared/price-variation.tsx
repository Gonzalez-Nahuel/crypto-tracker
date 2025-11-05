import { formatNumberToPercentage } from "@/utils/format-number-to-percentage";

type PriceVariationProps = {
  variation: number;
};

export const PriceVariation = ({ variation }: PriceVariationProps) => {
  return (
    <span
      className={`${
        Math.sign(variation) === -1 ? "text-amber-500" : "text-teal-500"
      } `}
    >
      <span className="text-[8px] mr-1">
        {Math.sign(variation) === -1 ? "\u25BC" : "\u25B2"}
      </span>
      <span>{formatNumberToPercentage(variation)}</span>
    </span>
  );
};
