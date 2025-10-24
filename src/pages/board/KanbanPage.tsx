import * as React from "react";
import { useParams, Link } from "react-router-dom";
import { Page } from "@/components/layout/Page";
import { PageHeader } from "@/components/layout/PageHeader";
import { KanbanColumn } from "@/components/kanban/KanbanColumn";
import type { KanbanBoard, KanbanCard } from "@/entities/board";
import type { Project } from "@/entities/projects";
import projectsMock from "@/mocks/projects";
import {createDefaultBoard} from "@/mocks/board";



export default function KanbanPage() {
  const { id = "" } = useParams<{ id: string }>();

  const project: Project | undefined = React.useMemo(
    () => (projectsMock as Project[]).find(p => p.id === id),
    [id]
  );

  const [board, setBoard] = React.useState<KanbanBoard>(() => createDefaultBoard(id));

  function addCard(columnId: KanbanBoard["columns"][number]["id"], title: string) {
    const cardId = crypto.randomUUID().slice(0, 8);
    const newCard: KanbanCard = { id: cardId, title, comments: 0, attachments: 0, tags: [] };
    setBoard(prev => ({
      ...prev,
      cards: { ...prev.cards, [cardId]: newCard },
      columns: prev.columns.map(c => c.id === columnId ? { ...c, cardIds: [cardId, ...c.cardIds] } : c),
    }));
  }

  function dropCard(cardId: string, toColumnId: KanbanBoard["columns"][number]["id"]) {
    setBoard(prev => {
      const removed = prev.columns.map(c => ({ ...c, cardIds: c.cardIds.filter(id => id !== cardId) }));
      const next = removed.map(c => c.id === toColumnId ? { ...c, cardIds: [cardId, ...c.cardIds] } : c);
      return { ...prev, columns: next };
    });
  }

  if (!project) {
    return (
      <Page>
        <PageHeader title="Kanban Board" />
        <p className="text-sm">Проект не найден. <Link className="underline" to="/projects">Назад</Link></p>
      </Page>
    );
  }

  return (
    <Page>
      <PageHeader
        title="Kanban Board"
        subtitle={<span className="font-mono">{project.title}</span>}
      />
      <div className="flex items-start gap-6 overflow-x-auto pb-6">
        {board.columns.map(col => (
          <KanbanColumn
            key={col.id}
            column={col}
            cards={board.cards}
            onAddCard={addCard}
            onDropCard={dropCard}
          />
        ))}
      </div>
    </Page>
  );
}
