// src/components/common/EmptyState.tsx
import type { ReactNode } from "react";
import { PageHeader } from "@/components/layout/PageHeader";

export function EmptyState({
  icon,
  title,
  description,
  actions,
}: {
  icon?: ReactNode;
  title: string;
  description?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="rounded-xl border border-dashed p-10 text-center">
      {icon ? <div className="mb-4 flex justify-center">{icon}</div> : null}

      <PageHeader
        title={title}
        sticky={false}
        titleClassName="font-mono text-xl tracking-tight h-tight text-center"
      />

      {description ? (
        <div className="mt-1 text-sm text-muted-foreground">
          {description}
        </div>
      ) : null}

      {actions ? (
        <div className="mt-6 flex justify-center gap-2">{actions}</div>
      ) : null}
    </div>
  );
}
