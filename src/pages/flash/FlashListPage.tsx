import * as React from "react";
import { Page } from "@/components/layout/Page";
import { PageHeader } from "@/components/layout/PageHeader";
import { FlashListItem } from "@/components/flash/FlashListItem";
import { flashSetsMock, type FlashSet } from "@/mocks/flashSet";
import FloatingButton from "@/components/ui/FloatingButton/FloatingButton";

function groupByMonth(sets: FlashSet[]) {
  const intlMonth = new Intl.DateTimeFormat("de-DE", { month: "long" });
  const groups = new Map<string, FlashSet[]>();

  sets.forEach((s) => {
    const d = new Date(s.createdAt);
    const key = `${intlMonth.format(d)} ${d.getFullYear()}`; // Juli 2025
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key)!.push(s);
  });

  return Array.from(groups.entries()).sort((a, b) => {
    const [ma, ya] = a[0].split(" ");
    const [mb, yb] = b[0].split(" ");
    const ord = (m: string) =>
      new Date(`${m} 01, ${yb}`).getMonth(); 
    if (ya !== yb) return Number(yb) - Number(ya);
    return ord(mb) - ord(ma);
  });
}

export default function FlashListPage() {
  const [query, setQuery] = React.useState("");
  const [activeId, setActiveId] = React.useState<string | null>(flashSetsMock[0]?.id ?? null);

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return flashSetsMock;
    return flashSetsMock.filter((s) =>
      [s.title, s.author.username].some((v) => v.toLowerCase().includes(q))
    );
  }, [query]);

  const grouped = React.useMemo(() => groupByMonth(filtered), [filtered]);

  return (
    <Page>
      <PageHeader title="Flash cards" />

      {/* Поиск */}
      <div className="flex justify-end pb-4">
        <div className="relative w-full max-w-[720px]">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search a card"
            className="w-full h-12 rounded-xl border border-black/20 bg-white pl-4 pr-12 outline-none focus:ring-2 focus:ring-black/15"
          />
          <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-black/50">
            🔍
          </span>
        </div>
      </div>

      {/* Лента группами */}
      <div className="space-y-8">
        {grouped.map(([title, items]) => (
          <section key={title}>
            <div className="mx-2 mb-2 font-mono text-xs uppercase tracking-widest text-black/60">
              im {title.toUpperCase()}
            </div>
            <div className="space-y-4">
              {items.map((s) => (
                <div key={s.id} onMouseEnter={() => setActiveId(s.id)}>
                  <FlashListItem {...({ set: s, active: activeId === s.id } as any)} />
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* FAB для создания набора прямо со списка */}
      <FloatingButton
        title="Create set"
        items={[
          {
            label: "title",
            input: (
              <div className="flex flex-col p-2 min-w-[300px]">
                <label className="font-mono text-xs mb-1">Title</label>
                <input
                  type="text"
                  className="bg-white px-2 py-2 border border-black rounded-md mb-3 outline-none focus:ring-2 focus:ring-black/20"
                  placeholder="Deutsch B2, Biology unit 3…"
                />
                <button
                  className="bg-[#ff007a] px-2 py-2 text-white font-mono rounded-md"
                  onClick={() => {
                    // TODO: создание набора
                    console.log("Create flash set");
                  }}
                >
                  Create
                </button>
              </div>
            ),
          },
        ]}
        position="bottom-right"
      />
    </Page>
  );
}
