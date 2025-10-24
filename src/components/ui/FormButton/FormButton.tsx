import type { ButtonHTMLAttributes } from "react";

interface FormButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function FormButton({ children, className = "", ...props }: FormButtonProps) {
  return (
    <button
      className={`w-full bg-accent px-2 py-2 text-white font-mono rounded-md hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
