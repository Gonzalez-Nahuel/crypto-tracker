import { Check, X } from "lucide-react";
import { SetStateAction } from "react";

type AuthModalProps = {
  isActive: React.Dispatch<SetStateAction<boolean>>;
  title: string;
  text: string;
  type: string;
};

export const AuthModal = ({ isActive, title, text, type }: AuthModalProps) => {
  const handlerActive = () => {
    isActive(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-30">
      <div className="flex flex-col justify-around relative w-md h-60 bg-card p-3 rounded-xl">
        <div>
          <X
            onClick={handlerActive}
            size={20}
            className="absolute right-4 top-6 cursor-pointer"
          />
        </div>
        <div className="flex justify-center w-full">
          {type === "success" ? (
            <Check
              strokeWidth={3}
              size={55}
              className="bg-green-600 rounded-full p-3"
            />
          ) : (
            <h2 className="text-3xl font-bold text-pink-600">{title}</h2>
          )}
        </div>
        <div className="w-full text-center">
          <p
            className={`${type === "success" ? "text-2xl font-bold" : "text-lg"}`}
          >
            {text}
          </p>
        </div>
        {type === "verification" && (
          <div className="w-full text-center">
            <button
              onClick={handlerActive}
              className="text-center text-white font-extrabold px-12 py-3 bg-indigo-600 rounded-xl text-sm hover:bg-indigo-500 cursor-pointer"
            >
              Ok
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
