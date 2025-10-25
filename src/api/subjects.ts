import { useAuthStore } from "@/store/authStore";

export interface Subject {
  id: string;
  name: string;
  code: string;
  professor: string;
  description: string;
  color: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  _count: {
    tasks: number;
    schedules: number;
    files: number;
    flashcards: number;
    kanbans: number;
  };
}

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "https://uniflow.sharshekeev13.dev";

/**
 * Получает список предметов с сервера
 */
export const getSubjects = async (): Promise<Subject[]> => {
  const response = await fetch(`${API_BASE_URL}/subjects`, {
    method: "GET",
    credentials: "include", // разрешаем куки
    headers: {
      Authorization: `Bearer ${useAuthStore.getState().token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Ошибка при загрузке: ${response.statusText}`);
  }

  const data: Subject[] = await response.json();
  return data;
};
