import { useEffect } from "react";
import { X } from "lucide-react";
import { useTheme } from "@/lib/hooks/useTheme";
import { useAppSelector } from "@/redux/hooks";

type NavSMProps = {
  isActive: boolean;
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
};

export const NavSM = ({ isActive, setIsActive }: NavSMProps) => {
  const theme = useAppSelector((state) => state.theme);
  const { changeTheme } = useTheme();

  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", isActive);

    const handlerResize = () => {
      if (window.innerWidth > 768) {
        setIsActive(false);
        document.body.classList.remove("overflow-hidden");
      }
    };

    window.addEventListener("resize", handlerResize);

    return () => {
      window.removeEventListener("resize", handlerResize);
    };
  }, [isActive, setIsActive]);

  const handlerClick = () => {
    setIsActive(false);
    document.body.classList.remove("overflow-hidden");
  };

  return (
    <nav className=" fixed right-0 left-0 top-0 bottom-0 bg-surface z-20 flex flex-col justify-between p-4 md:hidden">
      <div className="w-screen -left-4 -top-4 relative bg-amber-300 flex justify-between items-center p-3 shadow-[0_2px_3px_#ffd230]">
        <h1 className="text-xl font-bold text-white px-2.5 py-0.5 cursor-pointer bg-orange-500 border border-white rounded-sm">
          Tracker
        </h1>
        <X className="cursor-pointer text-black" onClick={handlerClick} />
      </div>
      <ul className=""></ul>
      <div className="flex flex-col justify-between h-40">
        <button className="text-center font-extrabold text-white p-3 bg-indigo-600 rounded-md text-sm hover:bg-indigo-500 cursor-pointer">
          Create an Account
        </button>
        <button className="text-center text-white font-extrabold p-3 bg-indigo-600 rounded-md text-sm hover:bg-indigo-500 cursor-pointer">
          Log in
        </button>
        <div className="w-full flex justify-between bg-theme-selector  p-1 rounded-md">
          <button
            onClick={() => changeTheme("light")}
            className={`text-xs font-semibold cursor-pointer hover:text-foreground w-1/3 block text-center p-2.5 rounded-md transition-colors duration-500 ${
              theme === "light"
                ? "bg-selected-theme text-foreground font-bold"
                : "bg-transparent text-gray-400 font-semibold"
            }`}
          >
            Light
          </button>
          <button
            onClick={() => changeTheme("dark")}
            className={`text-xs font-semibold cursor-pointer hover:text-foreground w-1/3 block text-center p-2.5 rounded-md transition-colors duration-500 ${
              theme === "dark"
                ? "bg-selected-theme text-foreground font-bold"
                : "bg-transparent text-gray-400 font-semibold"
            }`}
          >
            Dark
          </button>
          <button
            onClick={() => changeTheme("system")}
            className={`text-xs font-semibold cursor-pointer hover:text-foreground w-1/3 block text-center p-2.5 rounded-md transition-colors duration-500 ${
              theme === "system"
                ? "bg-selected-theme text-foreground font-bold"
                : "bg-transparent text-gray-400 font-semibold"
            }`}
          >
            System
          </button>
        </div>
      </div>
    </nav>
  );
};
