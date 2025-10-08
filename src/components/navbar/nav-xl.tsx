import { useTheme } from "@/lib/hooks/useTheme";
import { useAppSelector } from "@/redux/hooks";
import { useEffect, useRef } from "react";

type NavXLProps = {
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
};

export const NavXl = ({ setIsActive }: NavXLProps) => {
  const currenNav = useRef<HTMLElement>(null);

  const theme = useAppSelector((state) => state.theme);

  const { changeTheme } = useTheme();

  useEffect(() => {
    const handlerResize = () => {
      if (window.innerWidth <= 768) setIsActive(false);
    };

    const hanlerClickOutside = (e: MouseEvent) => {
      if (currenNav.current && !currenNav.current.contains(e.target as Node)) {
        setIsActive(false);
      }
    };

    window.addEventListener("resize", handlerResize);
    document.addEventListener("click", hanlerClickOutside);

    return () => {
      window.removeEventListener("resize", handlerResize);
      document.removeEventListener("click", hanlerClickOutside);
    };
  }, [setIsActive]);

  return (
    <>
      <div className=" absolute top-14 right-[9px] border-l-[16px] border-r-[16px] border-b-8 border-l-transparent border-r-transparent border-b-thin"></div>
      <nav
        ref={currenNav}
        className="hidden absolute md:block w-72 h-44 bg-nav rounded-lg p-3.5 z-10 top-16 right-1 shadow-2xl border border-thin "
      >
        <ul className="text-xs h-full flex flex-col justify-around">
          <li className="">
            <div className="flex justify-around items-center">
              <button className="py-2 px-4 font-extrabold border-2 bg-indigo-600 hover:bg-indigo-500 text-white cursor-pointer border-indigo-400  rounded-lg">
                Log In
              </button>
              <button className="py-2 px-4 font-semibold text-indigo-500 cursor-pointer hover:text-indigo-400 border-2 border-indigo-700 rounded-lg">
                Sign Up
              </button>
            </div>
          </li>

          <span className="border-b-2 border-thin"></span>

          <li className="flex justify-between items-center">
            <span className="font-bold">Theme</span>
            <div className="bg-theme-selector p-0.5 flex items-center rounded-md">
              <button
                onClick={() => changeTheme("light")}
                className={`cursor-pointer hover:text-foreground rounded-md py-1.5 px-3.5 transition-colors duration-500 ${
                  theme === "light"
                    ? "bg-selected-theme text-foreground font-bold"
                    : "bg-transparent text-gray-500 font-semibold"
                }`}
              >
                Light
              </button>
              <button
                onClick={() => changeTheme("dark")}
                className={`cursor-pointer hover:text-foreground rounded-md py-1.5 px-3.5 transition-colors duration-500 ${
                  theme === "dark"
                    ? "bg-selected-theme text-foreground font-bold"
                    : "bg-transparent text-gray-500 font-semibold"
                }`}
              >
                Dark
              </button>
              <button
                onClick={() => changeTheme("system")}
                className={`cursor-pointer hover:text-foreground rounded-md py-1.5 px-3.5 transition-colors duration-500 ${
                  theme === "system"
                    ? "bg-selected-theme text-foreground font-bold"
                    : "bg-transparent text-gray-500 font-semibold"
                }`}
              >
                System
              </button>
            </div>
          </li>
        </ul>
      </nav>
    </>
  );
};
