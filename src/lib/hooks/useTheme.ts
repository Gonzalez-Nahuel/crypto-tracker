"use client";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setTheme } from "@/redux/slices/theme-slice";
import { useEffect } from "react";

export const useTheme = () => {
  const selectedTheme = useAppSelector((state) => state.theme);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!selectedTheme) return;

    const prefersDark =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;

    const root = document.documentElement;

    if (selectedTheme === "system") {
      root.classList.toggle("dark", prefersDark);
      root.classList.toggle("light", !prefersDark);
    } else {
      root.classList.toggle("light", selectedTheme === "light");
      root.classList.toggle("dark", selectedTheme === "dark");
    }

    localStorage.setItem("theme-tracker", selectedTheme);
  }, [selectedTheme]);

  const changeTheme = (theme: string) => {
    dispatch(setTheme(theme));
  };

  return { changeTheme };
};
