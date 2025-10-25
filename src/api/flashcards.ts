import { useAuthStore } from "@/store/authStore";

export interface FlashcardSubject {
  id: string;
  name: string;
  code: string;
  professor: string;
  description: string;
  color: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

export interface Flashcard {
  id: string;
  question: string;
  answer: string;
  createdAt: string;
  updatedAt: string;
  subjectId: string;
  subject: FlashcardSubject;
}

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

/**
 * Получает список флеш-карт по subjectId
 * @param subjectId - ID предмета
 */
export const getFlashcardsBySubjectId = async (
  subjectId: string
): Promise<Flashcard[]> => {
  const response = await fetch(
    `${API_BASE_URL}/flashcards?subjectId=${subjectId}`,
    {
      method: "GET",
      credentials: "include", // разрешаем куки
      headers: {
        Authorization: `Bearer ${useAuthStore.getState().token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Ошибка при загрузке флеш-карт: ${response.statusText}`);
  }

  const data: Flashcard[] = await response.json();
  return data;
};
