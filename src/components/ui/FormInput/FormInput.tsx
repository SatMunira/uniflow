import type { InputHTMLAttributes } from "react";

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export function FormInput({ label, className = "", ...props }: FormInputProps) {
  return (
    <div className="w-full flex flex-col">
      <label className="font-mono text-xs mb-1">{label}</label>
      <input
        className={`bg-white px-2 py-2 border border-black rounded-md mb-3 outline-accent placeholder-gray-300 ${className}`}
        {...props}
      />
    </div>
  );
}
