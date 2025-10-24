export type CardId = string;
export type ColumnId = "todo" | "inprogress" | "review" | "done";

export type KanbanCard = {
  id: string;
  title: string;
  assigneeId?: string;      // ← НОВОЕ
  tags?: string[];
  comments?: number;
  attachments?: number;
};
export type KanbanColumn = {
  id: ColumnId;
  title: string;
  cardIds: CardId[];
};

export type KanbanBoard = {
  projectId: string;
  cards: Record<CardId, KanbanCard>;
  columns: KanbanColumn[];
};

