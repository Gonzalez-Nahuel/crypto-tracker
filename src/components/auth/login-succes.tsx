import { Check, X } from "lucide-react";
import { SetStateAction } from "react";

type LoginSuccessProps = {
  isActive: React.Dispatch<SetStateAction<boolean>>;
};

export const LoginSuccess = ({ isActive }: LoginSuccessProps) => {
  const handlerActive = () => {
    isActive(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-30">
      <div className="flex flex-col justify-around relative w-md h-60 bg-nav p-3 rounded-xl">
        <div>
          <X
            onClick={handlerActive}
            size={30}
            className="absolute right-4 top-6 cursor-pointer"
          />
        </div>
        <div className="flex justify-center w-full">
          <Check
            strokeWidth={3}
            size={55}
            className="bg-green-600 rounded-full p-3"
          />
        </div>
        <div className="w-full text-center">
          <p className="font-extrabold text-2xl">You successfully logged in!</p>
        </div>
      </div>
    </div>
  );
};
