"use client";

import { authRequest } from "@/lib/auth/auth-request";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { closeAuthForm, setMode } from "@/redux/slices/auth-form-slice";
import { fetchMe } from "@/redux/slices/session-slice";
import { X } from "lucide-react";
import { useState } from "react";

type AuthFormProps = {
  setIsActiveNavXl: React.Dispatch<React.SetStateAction<boolean>>;
  setIsActiveNavXs: React.Dispatch<React.SetStateAction<boolean>>;
  setIsAuthModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  setText: React.Dispatch<React.SetStateAction<string>>;
  setType: React.Dispatch<React.SetStateAction<string>>;
};

export const AuthForm = ({
  setIsActiveNavXl,
  setIsActiveNavXs,
  setIsAuthModalOpen,
  setTitle,
  setText,
  setType,
}: AuthFormProps) => {
  const { mode } = useAppSelector((state) => state.authModal);
  const [isAuthMessage, setIsAuthMessage] = useState(false);
  const [authMessage, setAuthMessage] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  const handlerAuth = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    const url = mode === "login" ? "/api/auth/login" : "/api/auth/signup";

    const form = new FormData(e.currentTarget);

    const authResponse = await authRequest(url, form);

    if (!authResponse.ok) {
      setIsAuthMessage(true);
      setAuthMessage(authResponse.message);
      return;
    }

    if (mode === "login") {
      await dispatch(fetchMe());

      setText("You successfully logged in");
      setType("success");
      setIsAuthModalOpen(true);

      dispatch(closeAuthForm());
    } else {
      setTitle("Verify your account");
      setText("we have sent a verfication email to your inbox!");
      setType("verification");
      setIsAuthModalOpen(true);
      dispatch(setMode("login"));
    }

    setIsAuthMessage(false);
    setIsActiveNavXl(false);
    setIsActiveNavXs(false);
  };

  return (
    <div className="fixed flex justify-center items-center inset-0 bg-black/30 z-30 no-scrollbar">
      <div className="relative rounded-2xl max-h-[90vh] overflow-hidden">
        <X
          onClick={() => dispatch(closeAuthForm())}
          className="absolute right-5 top-5 cursor-pointer"
        />
        <div className="max-h-[90vh] overflow-y-auto no-scrollbar ">
          <form
            onSubmit={handlerAuth}
            action=""
            className="flex flex-col justify-between w-md  bg-card rounded-2xl h-150 p-6 no-scrollbar"
          >
            <ul className="flex justify-center gap-4 text-2xl font-bold">
              <li
                onClick={() => {
                  dispatch(setMode("login"));
                  setIsAuthMessage(false);
                }}
                className={`${
                  mode === "login"
                    ? "relative after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:w-1/2 after:-translate-x-1/2 after:h-1 after:bg-teal-400 after:rounded-full"
                    : ""
                } p-2 cursor-pointer`}
              >
                Log In
              </li>
              <li
                onClick={() => {
                  dispatch(setMode("signup"));
                  setIsAuthMessage(false);
                }}
                className={`${
                  mode === "signup"
                    ? "relative after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:w-1/2 after:-translate-x-1/2 after:h-1 after:bg-teal-400 after:rounded-full"
                    : ""
                } p-2 cursor-pointer`}
              >
                Sign Up
              </li>
            </ul>
            <div
              className={`${
                mode === "signup" ? "block" : "hidden"
              } flex flex-col gap-2`}
            >
              <label htmlFor="username" className="text-xs font-bold">
                Username
              </label>
              <input
                id="username"
                name="username"
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
                name="email"
                spellCheck={false}
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
                name="password"
                type="password"
                placeholder="Enter your password..."
                className="bg-surface p-4 rounded-md border border-thin text-sm focus:outline-blue-400 focus:outline-2"
              />
              {isAuthMessage && (
                <span className="text-amber-500">{authMessage}</span>
              )}
            </div>
            <button
              type="submit"
              className="text-center text-white font-extrabold p-3 bg-indigo-600 rounded-xl text-sm hover:bg-indigo-500 cursor-pointer"
            >
              {mode === "login" ? "Log in" : "Create an account"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
