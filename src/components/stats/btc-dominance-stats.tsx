type BtcDominanceStatsProps = {
  btcPercentage: number;
};

export const BtcDominanceStats = ({
  btcPercentage,
}: BtcDominanceStatsProps) => {
  return (
    <div>
      <div className="text-sm mb-2.5 text-gray-400">
        <span className="font-extrabold text-white">56</span> /
        <span className="font-thin"> 100</span>
      </div>
      <div className="w-full">
        <div
          className="h-1.5 rounded-full relative flex items-center"
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
