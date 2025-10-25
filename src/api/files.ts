import { useAuthStore } from "@/store/authStore";

export interface FileLabel {
  id: string;
  name: string;
  color: string;
  fileId: string;
}

export interface FileSubject {
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

export interface FileItem {
  id: string;
  fileName: string;
  fileUrl: string;
  fileSize: number;
  mimeType: string;
  dateCreated: string;
  updatedAt: string;
  subjectId: string;
  subject: FileSubject;
  labels: FileLabel[];
}

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

/**
 * Получает список файлов по subjectId
 * @param subjectId - ID предмета
 */
export const getFilesBySubjectId = async (
  subjectId: string
): Promise<FileItem[]> => {
  const response = await fetch(`${API_BASE_URL}/files?subjectId=${subjectId}`, {
    method: "GET",
    credentials: "include", // разрешаем куки
    headers: {
      Authorization: `Bearer ${useAuthStore.getState().token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Ошибка при загрузке файлов: ${response.statusText}`);
  }

  const data: FileItem[] = await response.json();
  return data;
};
