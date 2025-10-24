import { BrainCircuit } from "lucide-react";
import type { ReactNode } from "react";

interface AuthFormCardProps {
  title: string;
  description: string;
  children: ReactNode;
}

export const AuthFormCard = ({ title, description, children }: AuthFormCardProps) => {
  return (
    <div className="w-full m-8 lg:m-0 lg:w-1/3 bg-white backdrop-blur-sm rounded-xl border border-black flex flex-col justify-start items-center font-mono p-8 gap-4 relative z-10 shadow-2xl">
      <div className="w-full flex justify-center items-center">
        <div className="bg-black rounded-full p-4">
          <BrainCircuit size={48} color="white" />
        </div>
      </div>

      <div className="w-full">
        <h1 className="text-4xl font-bold m-0 text-center">{title}</h1>
        <p className="text-sm text-gray-400 text-center mt-2">{description}</p>
      </div>

      {children}
    </div>
  );
};
