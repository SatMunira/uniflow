import * as React from "react";
import { cn } from "@/lib/cn";


export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
    ({ className, ...props }, ref) => (
        <input
            ref={ref}
            className={cn(
                "w-full h-10 px-3 rounded-xl bg-background text-foreground border border-foreground/10 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/30",
                className
            )}
            {...props}
        />
    )
);
Input.displayName = "Input";