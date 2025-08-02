import { ChevronDown } from "lucide-react";

export const InfoCard = () => {
  return (
    <a className=" block bg-card p-1 min-w-36 w-max shadow-md shadow-surface rounded-lg">
      <div className="text-gray-400 text-[11px]  ">Seccion </div>
      <div>
        <div className="text-[16px] font-bold">$3.79T</div>
        <div className=" text-[11px] font-bold text-red-500">
          <ChevronDown className="text-red-500 inline w-3 h-3" />
          <span>45.5 %</span>
        </div>
      </div>
    </a>
  );
};
