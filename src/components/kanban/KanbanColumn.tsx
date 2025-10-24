import * as React from "react";
import type { KanbanCard as KanbanCardType, KanbanColumn as Column } from "@/entities/board";
import { KanbanCard } from "./KanbanCard";

const THEME: Record<
    Column["id"],
    { wrapBg: string; headerBg: string; dot: string; addBorder: string }
> = {
    todo: { wrapBg: "bg-pink-100/80", headerBg: "bg-pink-200/60", dot: "bg-pink-400", addBorder: "border-pink-400/60" },
    inprogress: { wrapBg: "bg-amber-100/80", headerBg: "bg-amber-200/60", dot: "bg-amber-500", addBorder: "border-amber-400/60" },
    review: { wrapBg: "bg-cyan-100/80", headerBg: "bg-cyan-200/60", dot: "bg-cyan-500", addBorder: "border-cyan-500/50" },
    done: { wrapBg: "bg-violet-100/80", headerBg: "bg-violet-200/60", dot: "bg-violet-500", addBorder: "border-violet-500/50" },
};

type Props = {
    column: Column;
    cards: Record<string, KanbanCardType>;
     onAddCard: (columnId: Column["id"], title: string) => void;
  onDropCard: (cardId: string, toColumnId: Column["id"]) => void;
  onAddClickModal?: (columnId: Column["id"]) => void; // если когда-нибудь захочешь вместо inline формы открывать модалку
};

export function KanbanColumn({
  column,
  cards,
  onAddCard,
  onDropCard,
}: Props) {
  const t = THEME[column.id];
  const [isAdding, setIsAdding] = React.useState(false);
  const [draft, setDraft] = React.useState("");

  return (
    <div className={`w-[320px] rounded-[22px] border-2 border-black ${t.wrapBg} flex flex-col self-start overflow-hidden`}>
      {/* Заголовок */}
      <div className="px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className={`size-2 rounded-full ${t.dot}`} />
          <span className="font-mono font-semibold text-[18px]">{column.title}</span>
        </div>
        <span className="text-black/50">⋯</span>
      </div>

      {/* Тело */}
      <div
        className="px-4 py-4 space-y-4"
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          const cardId = e.dataTransfer.getData("text/card");
          if (cardId) onDropCard(cardId, column.id);
        }}
      >
        {column.cardIds.map((id) => (cards[id] ? <KanbanCard key={id} card={cards[id]} /> : null))}

        {/* 1) Свернутая кнопка "+ Add Card" (пунктир потоньше и более квадратные углы) */}
        {!isAdding && (
          <button
            type="button"
            onClick={() => setIsAdding(true)}
            className="w-full rounded-md border border-black border-dashed
                       px-5 py-2 font-mono text-[18px] leading-none
                       inline-flex items-center justify-start gap-3
                       hover:bg-black/5 transition-colors"
          >
            <span className="text-pink-600 text-[22px] leading-none">+</span>
            <span>Add Card</span>
          </button>
        )}

        {/* 2) Развернутая форма (как в первом варианте) */}
        {isAdding && (
          <div className={`rounded-xl border ${t.addBorder} border-dashed p-3`}>
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Enter a title"
              className="w-full h-12 rounded-xl border border-pink-500/70 bg-white px-3
                         text-[16px] font-mono outline-none focus:ring-2 focus:ring-pink-400/40"
            />
            <div className="mt-3 flex items-center gap-3">
              <button
                className="flex-1 rounded-lg bg-[#ff007a] px-4 h-10 text-[16px] font-mono text-white
                           shadow hover:brightness-110 active:translate-y-[1px] transition"
                onClick={() => {
                  const title = draft.trim();
                  if (!title) return;
                  onAddCard(column.id, title);
                  setDraft("");
                  setIsAdding(false);
                }}
              >
                Add card
              </button>
              <button
                className="text-xl leading-none text-black/70 hover:text-black px-2"
                aria-label="Close add form"
                onClick={() => { setDraft(""); setIsAdding(false); }}
              >
                ×
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}