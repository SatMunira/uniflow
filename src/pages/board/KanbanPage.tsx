import * as React from "react";
import { useParams, Link } from "react-router-dom";
import { Page } from "@/components/layout/Page";
import { PageHeader } from "@/components/layout/PageHeader";
import { KanbanColumn } from "@/components/kanban/KanbanColumn";
import type { KanbanBoard, KanbanCard } from "@/entities/board";
import type { Project } from "@/entities/projects";
import projectsMock from "@/mocks/projects";
import { createDefaultBoard } from "@/mocks/board";
import Modal from "@/components/ui/Modal/Modal";
import { Tag, MessageSquareText } from "lucide-react";

// UI из твоего примера
import { AccentButton } from "@/components/ui/AccentButton/AccentButton";
import SubtleButton from "@/components/ui/SubtleButton/SubtleButton";
import DropdownMenu from "@/components/ui/DropdownMenu/DropdownMenu";
import { TextAlignStart, FolderOpen, Plus } from "lucide-react";

type UIAttachment = {
  id: string;
  kind: "PDF" | "IMG" | "DOC" | "OTHER";
  name: string;
  addedAgo: string;
  downloadUrl?: string;
};

type UIComment = {
  id: string;
  author: string;
  ago: string;
  text: string;
  // простой «цвет» кружка-аватара (как на скрине — пастельные)
  badgeClass: string;
};

export default function KanbanPage() {
  const { id = "" } = useParams<{ id: string }>();

  const project: Project | undefined = React.useMemo(
    () => (projectsMock as Project[]).find((p) => p.id === id),
    [id]
  );

  const [board, setBoard] = React.useState<KanbanBoard>(() => createDefaultBoard(id));
  const [selectedCardId, setSelectedCardId] = React.useState<string | null>(null);
  const selectedCard: KanbanCard | undefined = selectedCardId ? board.cards[selectedCardId] : undefined;

  // ===== demo-состояния для модалки карточки =====
  const [desc, setDesc] = React.useState("");
  const [attachments, setAttachments] = React.useState<UIAttachment[]>([
    {
      id: "a1",
      kind: "PDF",
      name: "_Книга_Принца_Полукровки.pdf",
      addedAgo: "12 minutes ago",
      downloadUrl: "/api/files/a1/download",
    },
  ]);

  const [comments, setComments] = React.useState<UIComment[]>([
    {
      id: "c1",
      author: "Ernaz Erkinbekov",
      ago: "25 minutes ago",
      text: "Ich bin fertig.",
      badgeClass: "bg-lime-200",
    },
    {
      id: "c2",
      author: "Das Tank",
      ago: "just now",
      text: "Cool",
      badgeClass: "bg-sky-200",
    },
  ]);
  const [newComment, setNewComment] = React.useState("");

  function addCard(columnId: KanbanBoard["columns"][number]["id"], title: string) {
    const cardId = crypto.randomUUID().slice(0, 8);
    const newCard: KanbanCard = { id: cardId, title, comments: 0, attachments: 0, tags: [] };
    setBoard((prev) => ({
      ...prev,
      cards: { ...prev.cards, [cardId]: newCard },
      columns: prev.columns.map((c) =>
        c.id === columnId ? { ...c, cardIds: [cardId, ...c.cardIds] } : c
      ),
    }));
  }

  function dropCard(cardId: string, toColumnId: KanbanBoard["columns"][number]["id"]) {
    setBoard((prev) => {
      const removed = prev.columns.map((c) => ({ ...c, cardIds: c.cardIds.filter((id) => id !== cardId) }));
      const next = removed.map((c) => (c.id === toColumnId ? { ...c, cardIds: [cardId, ...c.cardIds] } : c));
      return { ...prev, columns: next };
    });
  }

  function handleAttachmentDownload(att: UIAttachment) {
    const a = document.createElement("a");
    a.href = att.downloadUrl || "#";
    a.download = att.name;
    a.rel = "noopener";
    document.body.appendChild(a);
    a.click();
    a.remove();
  }

  function handleAttachmentDelete(attId: string) {
    setAttachments((prev) => prev.filter((a) => a.id !== attId));
  }

  function handleAddFakeAttachment() {
    const n = crypto.randomUUID().slice(0, 4);
    setAttachments((prev) => [
      ...prev,
      {
        id: "a" + n,
        kind: "PDF",
        name: `file_${n}.pdf`,
        addedAgo: "just now",
        downloadUrl: "#",
      },
    ]);
  }

  function handleAddComment() {
    const text = newComment.trim();
    if (!text) return;
    setComments((prev) => [
      ...prev,
      {
        id: crypto.randomUUID().slice(0, 6),
        author: "You",
        ago: "just now",
        text,
        badgeClass: "bg-violet-200",
      },
    ]);
    setNewComment("");
  }

  if (!project) {
    return (
      <Page>
        <PageHeader title="Kanban Board" />
        <p className="text-sm">
          Проект не найден. <Link className="underline" to="/projects">Назад</Link>
        </p>
      </Page>
    );
  }

  return (
    <Page>
      <PageHeader title="Kanban Board" subtitle={<span className="font-mono">{project.title}</span>} />
      <div className="flex gap-6 overflow-x-auto pb-6">
        {board.columns.map((col) => (
          <KanbanColumn
            key={col.id}
            column={col}
            cards={board.cards}
            onAddCard={addCard}
            onDropCard={dropCard}
            onCardClick={(card) => setSelectedCardId(card.id)}
          />
        ))}
      </div>

      {/* ====== MODAL карточки (как на макете) ====== */}
      <Modal
        isOpen={!!selectedCard}
        onClose={() => setSelectedCardId(null)}
        title={selectedCard?.title ?? "Task"}
        width="1440px"
        height="auto"
        footerHeight="0px"
        headerBg="#B0A4E4"
        headerColor="#000"
        contentBg="#FEFFEF"
        footer={null}
      >
        <div className="-mx-6  -mb-6 -mt-6">
          {/* двухколоночный лэйаут со средней разделительной линией */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1px_1fr] min-h-[560px] font-mono">
            {/* Левая колонка */}
            <div className="p-6 md:p-10">
              {/* Labels (заглушка под будущие тэги) */}
              <div className="flex items-center gap-3 mb-6">
                <span className="inline-flex items-center gap-2 rounded-md border border-black/40 px-3 py-1 text-sm bg-white font-thin">
                  <Tag className="size-4" />
                  Labels
                </span>
                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-md border border-black/40 px-3 py-1 text-sm h-8 bg-[#F0F0F0]"
                >
                  <Plus className="size-4" />

                </button>
              </div>

              {/* Description */}
              <section className="space-y-3">
                <div className="flex items-center gap-3">
                  <TextAlignStart className="size-5" />
                  <h3 className="text-base font-semibold">Description</h3>
                </div>

                <textarea
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  placeholder="Add a more detailed description..."
                  className="w-full min-h-[160px] rounded-[10px] border border-black/50 px-4 py-3 text-base leading-relaxed placeholder:text-black/30 bg-white"
                />

                <div className="flex items-center gap-3 pt-1">
                  <AccentButton
                    type="button"
                    onClick={() => {/* TODO: save desc to backend */ }}
                    className="px-4 py-2 rounded-lg font-semibold bg-[#FF4E8A] text-white w-24 justify-center"
                  >
                    Save
                  </AccentButton>
                  <SubtleButton
                    type="button"
                    onClick={() => setDesc("")}
                    className="px-4 py-2 rounded-lg font-semibold bg-black/10 text-black w-24 justify-center"
                  >
                    Cancel
                  </SubtleButton>
                </div>
              </section>

              {/* Attachments */}
              <section className="mt-10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FolderOpen className="size-5" />
                    <h3 className="text-base font-semibold">Attachements</h3>
                  </div>

                  <button
                    type="button"
                    onClick={handleAddFakeAttachment}
                    className="px-5 py-1 rounded-lg font-normal text-white bg-[#B0A4E4] w-20 justify-center"
                  >
                    Add
                  </button>
                </div>

                <div className="mt-6 space-y-6">
                  {attachments.map((att) => (
                    <div key={att.id} className="grid grid-cols-[88px_1fr_auto] items-center gap-8">
                      <div
                        className="inline-grid place-items-center w-[88px] h-[44px]
                                 rounded-lg border border-[#BABABA] bg-[#E9EADA]
                                 text-sm font-extrabold"
                      >
                        {att.kind}
                      </div>

                      <div className="min-w-0">
                        <div className="font-semibold text-sm truncate">{att.name}</div>
                        <div className="text-black/50 font-semibold text-xs mt-1">added {att.addedAgo}</div>
                      </div>

                      <DropdownMenu
                        items={[
                          { label: "Download", onClick: () => handleAttachmentDownload(att) },
                          { label: "Delete", labelColor: "#EB171A", onClick: () => handleAttachmentDelete(att.id) },
                        ]}
                        trigger={
                          <div className="w-10 py-2 bg-[#F4F4F4] rounded-2xl flex flex-row justify-center items-center border border-gray-400 gap-[2px] hover:bg-gray-200">
                            <span className="w-1 h-1 bg-black rounded-full"></span>
                            <span className="w-1 h-1 bg-black rounded-full"></span>
                            <span className="w-1 h-1 bg-black rounded-full"></span>
                          </div>
                        }
                      />
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Разделительная линия */}
            <div className="hidden lg:block w-px bg-black" />

            {/* Правая колонка — Comments */}
            <div className="p-6 md:p-10 bg-[#E6E7D8]">
              <div className="flex items-center gap-3 mb-4">
                <MessageSquareText className="size-5" />
                <h3 className="text-base font-semibold">Comments and activity</h3>
              </div>

              <div className="mb-6">
                <input
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Write a comment..."
                  className="w-full rounded-md border border-black/40 bg-white px-4 py-3 text-base"
                />
                <div className="mt-3">
                  <AccentButton onClick={handleAddComment} className="px-4 py-2 rounded-lg font-semibold">
                    Add comment
                  </AccentButton>
                </div>
              </div>

              <div className="space-y-6">
                {comments.map((c) => (
                  <div key={c.id} className="grid grid-cols-[36px_1fr] gap-3 items-start">
                    <div className={`h-9 w-9 rounded-full border border-black/20 ${c.badgeClass}`} />
                    <div>
                      <div className="text-sm">
                        <span className="font-semibold">{c.author}</span>{" "}
                        <span className="text-black/60 underline">{c.ago}</span>
                      </div>
                      <div className="mt-2 rounded-md bg-white border border-black/20 px-4 py-3 shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
                        {c.text}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </Page>
  );
}
