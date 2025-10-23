import type { ReactNode } from "react";

export function Page({ children }: { children: ReactNode }) {
  return (
    <section className="w-full h-screen flex flex-col">
      <div className="w-full px-16 flex flex-col flex-1">{children}</div>
    </section>
  );
}

export function PageSection({ children, pad = "py-8" }: { children: ReactNode; pad?: string }) {
  return <div className={`${pad}`}>{children}</div>;
}
