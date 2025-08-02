import { Menu, X, Search } from "lucide-react";

export const NavBar = () => {
  return (
    <nav className="bg-surface border-b border-b-thin p-2.5 flex justify-between items-center">
      <div className="px-4">
        <h1 className="text-xl font-bold px-2.5 py-0.5 cursor-pointer bg-orange-500 border rounded-sm">
          Tracker
        </h1>
      </div>
      <div className="flex justify-between gap-7 items-center">
        <button className="text-blue-400 hover:text-inherit cursor-pointer">
          <Search size={21} />
        </button>
        <button className=" hover:bg-[#373737] rounded-md cursor-pointer p-1">
          <Menu />
        </button>
      </div>
    </nav>
  );
};
