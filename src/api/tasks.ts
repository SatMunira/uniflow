import { useAuthStore } from "@/store/authStore";

export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  status: "TODO" | "DONE";
  priority: "LOW" | "MEDIUM" | "HIGH";
  createdAt: string;
  updatedAt: string;
  subjectId: string;
  subject: {
    id: string;
    name: string;
    code: string;
    professor: string;
    description: string;
    color: string;
    createdAt: string;
    updatedAt: string;
    userId: string;
  };
}

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "https://uniflow.sharshekeev13.dev";

/**
 * Получает список задач по subjectId
 * @param subjectId - ID предмета
 */
export const getTasksBySubjectId = async (
  subjectId: string
): Promise<Task[]> => {
  const response = await fetch(`${API_BASE_URL}/tasks?subjectId=${subjectId}`, {
    method: "GET",
    credentials: "include", // разрешаем куки
    headers: {
      Authorization: `Bearer ${useAuthStore.getState().token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Ошибка при загрузке задач: ${response.statusText}`);
  }

  const data: Task[] = await response.json();
  return data;
};
