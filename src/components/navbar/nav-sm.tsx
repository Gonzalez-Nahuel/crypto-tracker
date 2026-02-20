import { useEffect } from "react";
import { X } from "lucide-react";
import { useTheme } from "@/lib/hooks/useTheme";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { clearUser } from "@/redux/slices/auth-slice";

type NavSMProps = {
  isActive: boolean;
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
  setAuthFormActive: React.Dispatch<React.SetStateAction<boolean | string>>;
};

export const NavSM = ({
  isActive,
  setIsActive,
  setAuthFormActive,
}: NavSMProps) => {
  const session = useAppSelector((state) => state.auth.session);
  const theme = useAppSelector((state) => state.theme);
  const dispatch = useAppDispatch();
  const { changeTheme } = useTheme();

  const router = useRouter();

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

  const handlerAuthMode = (mode: string) => {
    setAuthFormActive(mode);
  };

  const handleLogout = async () => {
    await fetch("api/auth/logout", {
      method: "POST",
      credentials: "include",
    });

    dispatch(clearUser());

    router.refresh();
  };

  const handleGoHome = () => {
    router.push("/");
  };

  return (
    <>
      <nav className=" fixed right-0 left-0 top-0 bottom-0 bg-surface z-20 flex flex-col justify-between p-4 md:hidden">
        <div className="relative -left-4 -top-4 w-screen flex justify-between items-center  px-5 py-4 shadow-[0_-3px_8px_var(--thin)]">
          <h1
            onClick={handleGoHome}
            className="text-xl font-bold text-white px-2.5 py-0.5 cursor-pointer bg-orange-500 border border-white rounded-sm"
          >
            Tracker
          </h1>
          <X className="cursor-pointer" onClick={handlerClick} />
        </div>
        <ul className=""></ul>
        <div className="flex flex-col justify-between h-40">
          {!session ? (
            <>
              <button
                onClick={() => handlerAuthMode("signup")}
                className="text-center font-extrabold text-white p-3 bg-indigo-600 rounded-md text-sm hover:bg-indigo-500 cursor-pointer"
              >
                Create an Account
              </button>
              <button
                onClick={() => handlerAuthMode("login")}
                className="text-center text-white font-extrabold p-3 bg-indigo-600 rounded-md text-sm hover:bg-indigo-500 cursor-pointer"
              >
                Log in
              </button>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="text-center text-white font-extrabold p-3 bg-indigo-600 rounded-md text-sm hover:bg-indigo-500 cursor-pointer"
            >
              Log out
            </button>
          )}

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
    </>
  );
};
