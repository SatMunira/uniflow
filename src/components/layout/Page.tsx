import type { ReactNode } from "react";

export function Page({ children }: { children: ReactNode }) {
  return (
    <section className="w-full">
      <div className="mx-auto max-w-[1200px] px-6">{children}</div>
    </section>
  );
}

export function PageSection({ children, pad = "py-8" }: { children: ReactNode; pad?: string }) {
  return <div className={`${pad}`}>{children}</div>;
}
