type BtcDominanceStatsProps = {
  btcPercentage: number;
};

export const BtcDominanceStats = ({
  btcPercentage,
}: BtcDominanceStatsProps) => {
  return (
    <div>
      <div className="text-sm xl:text-xl mb-2.5 text-gray-400 ">
        <span className="font-extrabold text-foreground xl:text-2xl">
          {btcPercentage}
        </span>
        /<span className="font-thin xl:text-xl"> 100</span>
      </div>
      <div className="hidden xl:flex justify-between text-gray-400 font-bold text-sm mb-1.5">
        <span>Altcoin</span>
        <span>Bitcoin</span>
      </div>
      <div className="w-full">
        <div
          className="h-1.5 rounded-full relative flex items-center xl:h-2"
          style={{
            background:
              "linear-gradient(to right, #dc2626 0%, #dc2626 25%, #fca5a5 25%, #fca5a5 50%, #93c5fd 50%, #93c5fd 75%, #2563eb 75%, #2563eb 100% )",
          }}
        >
          <div
            className="absolute w-3 h-3 rounded-full bg-white border-2 border-black -translate-x-1/2 "
            style={{ left: `${btcPercentage}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};
