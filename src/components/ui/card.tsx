import * as React from "react";
import { cn } from "@/lib/cn";


export function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return <div className={cn("rounded-2xl bg-background border border-foreground/10", className)} {...props} />;
}


export function CardContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return <div className={cn("p-4", className)} {...props} />;
}