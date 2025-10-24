import * as React from "react";
import type { KanbanCard } from "@/entities/board";
import type { ProjectMember } from "@/entities/projects";
import { User } from "lucide-react";

/** Одна пилюля-тег с цветом по названию */
function TagPill({ label }: { label: string }) {
  const key = label.trim().toLowerCase();

  // цвета как на «втором варианте»
  const base =
    "inline-flex items-center rounded-full px-3 py-[6px] text-[13px] font-semibold tracking-tight";
  const byName: Record<string, string> = {
    // яркий розовый
    design: "bg-[#ff00a7] text-white",
    // фиолетовый
    research: "bg-[#6f42ff] text-white",
    // синий
    dev: "bg-[#1e63ff] text-white",
  };

  const cls = byName[key] ?? "bg-fuchsia-200 text-black/80";
  return <span className={`${base} ${cls}`}>{label}</span>;
}

type Props = {
  card: KanbanCard;
  /** Если передать, покажем «тот же» аватар участника, что и в Projects */
  getMemberIndex?: (id?: string) => { member?: ProjectMember; index?: number };
};

export function KanbanCard({ card, getMemberIndex }: Props) {
  // палитра как в Projects (по индексу)
  const COLORS = ["bg-violet-300", "bg-pink-300", "bg-sky-300", "bg-indigo-300", "bg-green-300"];
  const { member, index } = getMemberIndex?.(card.assigneeId) ?? {};
  const avatarColor = COLORS[(index ?? 0) % COLORS.length];

  return (
    <div
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData("text/card", card.id);
        e.dataTransfer.effectAllowed = "move";
      }}
      className="rounded-2xl border border-black/25 bg-white p-4 shadow-[0_4px_12px_rgba(0,0,0,0.08)]"
    >
      {/* Теги */}
      {!!card.tags?.length && (
        <div className="mb-3 flex flex-wrap gap-2">
          {card.tags.map((t) => (
            <TagPill key={t} label={t} />
          ))}
        </div>
      )}

      {/* Заголовок */}
      <div className="mb-4 text-[18px] leading-snug text-black font-mono">
        {card.title}
      </div>

      {/* Низ карточки: аватар + счётчики */}
      <div className="flex items-center justify-between">
        <span
          title={member?.name}
          className={`inline-flex h-9 w-9 items-center justify-center rounded-full border border-black/15 ${avatarColor}`}
        >
          <User className="h-5 w-5 text-black" />
        </span>

        <div className="flex items-center gap-4 text-[13px] text-black/70">
          <span className="inline-flex items-center gap-1">
            <span className="opacity-70">📎</span>
            {card.attachments ?? 0}
          </span>
          <span className="inline-flex items-center gap-1">
            <span className="opacity-70">💬</span>
            {card.comments ?? 0}
          </span>
        </div>
      </div>
    </div>
  );
}
