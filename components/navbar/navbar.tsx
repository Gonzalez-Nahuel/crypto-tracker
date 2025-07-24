import { Menu, X, Search } from "lucide-react";

export const NavBar = () => {
  return (
    <nav className=" bg-[#171717] p-2.5 flex justify-between items-center border-b">
      <div className="px-4">
        <h1 className="text-xl font-bold px-2.5 py-0.5 cursor-pointer bg-orange-500 border rounded-xs">
          Tracker
        </h1>
      </div>
      <div className="flex justify-between gap-7 items-center">
        <button className="text-cyan-400 hover:text-white cursor-pointer">
          <Search size={21} />
        </button>
        <button className=" hover:bg-[#373737] rounded-md cursor-pointer p-1">
          <Menu />
        </button>
      </div>
    </nav>
  );
};
