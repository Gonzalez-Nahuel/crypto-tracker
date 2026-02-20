"use client";
import { Menu, X, Search } from "lucide-react";
import { NavXl } from "./nav-xl";
import { NavSM } from "./nav-sm";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setTheme } from "@/redux/slices/theme-slice";
import { useRouter } from "next/navigation";
import { AuthForm } from "../auth/auth-form";
import { LoginSuccess } from "../auth/login-succes";

export const NavBar = () => {
  const [isActiveNavXL, setIsActiveNavXL] = useState(false);
  const [isActiveNavXS, setIsActiveNavXS] = useState(false);
  const [authFormActive, setAuthFormActive] = useState<boolean | string>(false);
  const [isLoginSuccessOpen, setIsLoginSuccessOpen] = useState(false);

  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.username);
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

  const handleGoHome = () => {
    router.push("/");
  };

  return (
    <header className="bg-surface relative p-2.5 border-b border-thin flex justify-between items-center ">
      <div className="px-4">
        <h1
          className="text-xl font-bold text-white px-2.5 py-0.5 cursor-pointer bg-orange-500 border border-white rounded-sm"
          onClick={handleGoHome}
        >
          Tracker
        </h1>
        <h2>{user}</h2>
      </div>
      <div className="flex justify-between gap-7 items-center">
        <button className="text-blue-400 hover:text-inherit cursor-pointer">
          <Search size={21} />
        </button>
        <button
          onClick={() => setIsActiveNavXL((a) => !a)}
          className=" hover:bg-background-menu hidden md:block rounded-md cursor-pointer p-1"
        >
          {isActiveNavXL ? <X /> : <Menu />}
        </button>
        <button
          onClick={() => setIsActiveNavXS((a) => !a)}
          className=" hover:bg-background-menu md:hidden block rounded-md cursor-pointer p-1"
        >
          <Menu />
        </button>
      </div>
      {isActiveNavXL && (
        <NavXl
          setIsActive={setIsActiveNavXL}
          setAuthFormActive={setAuthFormActive}
        />
      )}
      {isActiveNavXS && (
        <NavSM
          isActive={isActiveNavXS}
          setIsActive={setIsActiveNavXS}
          setAuthFormActive={setAuthFormActive}
        />
      )}
      {authFormActive && (
        <AuthForm
          mode={authFormActive}
          setAuthFormActive={setAuthFormActive}
          setIsActiveNavXl={setIsActiveNavXL}
          setIsActiveNavXs={setIsActiveNavXS}
          setIsLoginSuccessOpen={setIsLoginSuccessOpen}
        />
      )}
      {isLoginSuccessOpen && <LoginSuccess isActive={setIsLoginSuccessOpen} />}
    </header>
  );
};
