import type { KanbanBoard } from "@/entities/board";

export function createDefaultBoard(projectId: string): KanbanBoard {
  const cards = {
    c1: { id: "c1", title: "Design Notification Banner", assignee: "A", tags: ["Design"], comments: 2, attachments: 0 },
    c2: { id: "c2", title: "Create Dashboard wireframe", assignee: "B", tags: ["Design","Research"], comments: 2, attachments: 0 },
    c3: { id: "c3", title: "Implement: low priority feature", assignee: "D", tags: ["Dev"], comments: 0, attachments: 0 },
    c4: { id: "c4", title: "Research mobile app", assignee: "G", tags: ["Research"], comments: 2, attachments: 0 },
    c5: { id: "c5", title: "Content draft for health", assignee: "C", tags: ["Content"], comments: 2, attachments: 0 },
  };
  return {
    projectId,
    cards,
    columns: [
      { id: "todo",       title: "To Do",       cardIds: ["c1","c2"] },
      { id: "inprogress", title: "In Progress", cardIds: ["c3"] },
      { id: "review",     title: "In Review",   cardIds: ["c4"] },
      { id: "done",       title: "Completed",   cardIds: ["c5"] },
    ],
  };
}
