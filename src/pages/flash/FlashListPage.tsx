import { Page } from "@/components/layout/Page";
import { PageHeader } from "@/components/layout/PageHeader";
import { FlashListItem } from "@/components/flash/FlashListItem";
import FloatingButton from "@/components/ui/FloatingButton/FloatingButton";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import {
  getSubjectsWithFlashcards,
  type SubjectWithFlashcards,
} from "@/api/subjectWithFlashcards";

export default function FlashListPage() {
  const [query, setQuery] = useState("");
  const [data, setData] = useState<SubjectWithFlashcards[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getSubjectsWithFlashcards();
        setData(result);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);
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
            className="w-full font-mono h-12 rounded-xl border border-black/20 bg-white pl-4 pr-12 outline-none focus:ring-2 focus:ring-black/15"
          />
          <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-black/50">
            <Search />
          </span>
        </div>
      </div>

      {/* Лента группами */}
      <div className="space-y-4">
        {data &&
          data.map((item) => (
            <div key={item.id}>
              <FlashListItem set={item}/>
            </div>
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
