import * as React from "react";
import { cn } from "@/lib/cn";


export function Avatar({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return <div className={cn("inline-flex items-center justify-center rounded-full bg-foreground/10", className)} {...props} />;
}


export function AvatarFallback({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
    return <span className={cn("select-none", className)} {...props} />;
}