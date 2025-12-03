"use client";
import { Menu, X, Search } from "lucide-react";
import { NavXl } from "./nav-xl";
import { NavSM } from "./nav-sm";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { setTheme } from "@/redux/slices/theme-slice";
import { useRouter } from "next/navigation";
import { AuthForm } from "../shared/auth-form";

export const NavBar = () => {
  const [isActiveXL, setIsActiveXL] = useState(false);
  const [isActiveXS, setIsActiveXS] = useState(false);
  const [authFormActive, setAuthFormActive] = useState<boolean | string>(false);

  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    const storagedTheme = localStorage.getItem("theme-tracker");

    if (!storagedTheme || storagedTheme === "system") {
      dispatch(setTheme("system"));
    } else if (storagedTheme === "dark") {
      dispatch(setTheme("dark"));
    } else {
      dispatch(setTheme("light"));
    }
  }, [dispatch]);

  const handlClick = () => {
    router.push("/");
  };

  return (
    <header className="bg-surface relative p-2.5 border-b border-thin flex justify-between items-center ">
      <div className="px-4">
        <h1
          className="text-xl font-bold text-white px-2.5 py-0.5 cursor-pointer bg-orange-500 border border-white rounded-sm"
          onClick={handlClick}
        >
          Tracker
        </h1>
      </div>
      <div className="flex justify-between gap-7 items-center">
        <button className="text-blue-400 hover:text-inherit cursor-pointer">
          <Search size={21} />
        </button>
        <button
          onClick={() => setIsActiveXL((a) => !a)}
          className=" hover:bg-background-menu hidden md:block rounded-md cursor-pointer p-1"
        >
          {isActiveXL ? <X /> : <Menu />}
        </button>
        <button
          onClick={() => setIsActiveXS((a) => !a)}
          className=" hover:bg-background-menu md:hidden block rounded-md cursor-pointer p-1"
        >
          <Menu />
        </button>
      </div>
      {isActiveXL && (
        <NavXl
          setIsActive={setIsActiveXL}
          setAuthFormActive={setAuthFormActive}
        />
      )}
      {isActiveXS && (
        <NavSM
          isActive={isActiveXS}
          setIsActive={setIsActiveXS}
          setAuthFormActive={setAuthFormActive}
        />
      )}
      {authFormActive && (
        <AuthForm mode={authFormActive} setAuthFormActive={setAuthFormActive} />
      )}
    </header>
  );
};
