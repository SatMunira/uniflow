import type { Task } from "@/api/tasks";
import { Check, Clock } from "lucide-react";

interface TaskCardProps {
  task: Task;
  onToggle: (id: string) => void;
  isCompleted?: boolean;
}

export default function TaskCard({
  task,
  onToggle,
  isCompleted = false,
}: TaskCardProps) {
  // Функция для расчета дней до дедлайна
  const getDaysUntilDue = (): number => {
    const today = new Date();
    const dueDate = new Date(task.dueDate);
    const diffTime = dueDate.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  // Форматирование даты в человекочитаемый вид
  const getFormattedDate = (): string => {
    const date = new Date(task.dueDate);
    return date.toLocaleDateString(undefined, {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const getDaysText = () => {
    if (isCompleted) return "Completed";

    const daysUntilDue = getDaysUntilDue();
    if (daysUntilDue > 0) return `${daysUntilDue} days left`;
    if (daysUntilDue === 0) return "Due today";
    return "Overdue";
  };

  return (
    <div
      className={`relative w-full bg-white border-2 rounded-xl px-12 py-4 pr-16 transition ${
        isCompleted
          ? "border-accent"
          : "border-[#CBE1FB] shadow-sm"
      }`}
    >
      {/* Checkbox Button */}
      <button
        onClick={() => onToggle(task.id)}
        className={`absolute -left-5 top-4 w-10 h-10 rounded-full border-2 flex items-center justify-center transition ${
          isCompleted
            ? "border-accent bg-accent hover:bg-accent"
            : "border-[#CBE1FB] bg-[#CBE1FB] hover:bg-[#a4cbfa]"
        }`}
        aria-label={isCompleted ? "Mark as incomplete" : "Mark as complete"}
      >
        <Check
          className={`w-5 h-5 text-white`}
          strokeWidth={isCompleted ? 3 : 2}
        />
      </button>

      {/* Content */}
      <div>
        <h3
          className={`text-lg font-semibold pr-12 ${
            isCompleted ? "text-gray-500 line-through" : "text-gray-900"
          }`}
        >
          {task.title}
        </h3>

        <div
          className={`flex items-center gap-2 mt-1 text-xs ${
            isCompleted ? "text-gray-400" : "text-gray-500"
          }`}
        >
          <Clock size={14} />
          <span>{getFormattedDate()}</span>
          <span className="ml-2">{getDaysText()}</span>
        </div>

        <p
          className={`text-sm mt-3 leading-relaxed ${
            isCompleted ? "text-gray-500 line-through" : "text-gray-700"
          }`}
        >
          {task.description}
        </p>
      </div>
    </div>
  );
}
