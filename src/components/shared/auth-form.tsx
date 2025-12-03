"use client";

import { X } from "lucide-react";
import { useState } from "react";

type AuthFormProps = {
  mode: string | boolean;
  setAuthFormActive: React.Dispatch<React.SetStateAction<boolean | string>>;
};

export const AuthForm = ({ mode, setAuthFormActive }: AuthFormProps) => {
  const [modeActive, setModeActive] = useState(mode);

  return (
    <div className="fixed flex justify-center items-center inset-0 bg-black/30 z-30 no-scrollbar">
      <div className="relative rounded-2xl max-h-[90vh] overflow-hidden">
        <X
          onClick={() => setAuthFormActive(false)}
          className="absolute right-5 top-5 cursor-pointer"
        />
        <div className="max-h-[90vh] overflow-y-auto no-scrollbar ">
          <form
            action=""
            className="flex flex-col justify-between w-md  bg-card rounded-2xl h-[600px] p-6 no-scrollbar"
          >
            <ul className="flex justify-center gap-4 text-2xl font-bold">
              <li
                onClick={() => setModeActive("login")}
                className={`${
                  modeActive === "login"
                    ? "relative after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:w-1/2 after:-translate-x-1/2 after:h-1 after:bg-teal-400 after:rounded-full"
                    : ""
                } p-2 cursor-pointer`}
              >
                Log In
              </li>
              <li
                onClick={() => setModeActive("signup")}
                className={`${
                  modeActive === "signup"
                    ? "relative after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:w-1/2 after:-translate-x-1/2 after:h-1 after:bg-teal-400 after:rounded-full"
                    : ""
                } p-2 cursor-pointer`}
              >
                Sign Up
              </li>
            </ul>
            <div
              className={`${
                modeActive === "signup" ? "block" : "hidden"
              } flex flex-col gap-2`}
            >
              <label htmlFor="username" className="text-xs font-bold">
                Username
              </label>
              <input
                id="username"
                type="text"
                placeholder="Enter your username..."
                className="bg-surface p-4 rounded-md border border-thin text-sm focus:outline-blue-400 focus:outline-2"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-xs font-bold">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your address..."
                className="bg-surface p-4 rounded-md border border-thin text-sm focus:outline-blue-400 focus:outline-2"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="text-xs font-bold">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password..."
                className="bg-surface p-4 rounded-md border border-thin text-sm focus:outline-blue-400 focus:outline-2"
              />
            </div>
            <button
              type="submit"
              className="text-center text-white font-extrabold p-3 bg-indigo-600 rounded-xl text-sm hover:bg-indigo-500 cursor-pointer"
            >
              {modeActive === "login" ? "Log in" : "Create an account"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
