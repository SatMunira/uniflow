import * as React from "react";
import { cn } from "@/lib/cn";

export function PageSection({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <section
      className={cn("bg-background/50 rounded-2xl p-4 md:p-6", className)}
      {...props}
    />
  );
}