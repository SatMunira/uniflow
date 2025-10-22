// src/components/layout/PageHeader.tsx
import type { ReactNode } from "react";

export function PageHeader({
  title,
  subtitle,
  actions,
  sticky = true,
  titleClassName = "font-mono h-tight",      // ← ДЕФОЛТ: Anonymous Pro
  subtitleClassName = "",
}: {
  title: string;
  subtitle?: ReactNode;
  actions?: ReactNode;
  sticky?: boolean;
  titleClassName?: string;
  subtitleClassName?: string;
}) {
  return (
    <header className={`${sticky ? "sticky top-0 bg-background/60 backdrop-blur" : ""} py-5`}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className={`text-2xl font-semibold tracking-tight ${titleClassName}`}>
            {title}
          </h1>
          {subtitle ? (
            <div className={`mt-1 text-sm text-muted-foreground ${subtitleClassName}`}>
              {subtitle}
            </div>
          ) : null}
        </div>
        {actions ? <div className="shrink-0">{actions}</div> : null}
      </div>
    </header>
  );
}
