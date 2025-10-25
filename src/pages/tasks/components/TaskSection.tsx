import TaskCard from "./TaskCard";
import EmptyState from "./EmptyState";
import type { Task } from "@/api/tasks";

interface TaskSectionProps {
  title: string;
  tasks: Task[];
  onToggle: (taskId: string) => void;
  isCompleted?: boolean;
  emptyMessage: string;
  emptyEmoji?: string;
}

export default function TaskSection({
  title,
  tasks,
  onToggle,
  isCompleted = false,
  emptyMessage,
  emptyEmoji,
}: TaskSectionProps) {
  return (
    <div className="mt-8 font-mono px-4">
      <div className="mb-4">
        <span className="text-2xl font-semibold">{title}</span>
        <span className="ml-3 text-xl text-gray-400">({tasks.length})</span>
      </div>

      <div className="space-y-4">
        {tasks.length === 0 ? (
          <EmptyState message={emptyMessage} emoji={emptyEmoji} />
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onToggle={onToggle}
              isCompleted={isCompleted}
            />
          ))
        )}
      </div>
    </div>
  );
}
