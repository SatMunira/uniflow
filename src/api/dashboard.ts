import { useAuthStore } from "@/store/authStore";

export interface DashboardUser {
  id: string;
  fullName: string;
  email: string;
}

export interface DashboardTask {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  status: "TODO" | "IN_PROGRESS" | "DONE";
  priority: "LOW" | "MEDIUM" | "HIGH";
  createdAt: string;
  updatedAt: string;
  subjectId: string;
  subject: {
    id: string;
    name: string;
    color: string;
  };
}

export interface DashboardSchedule {
  id: string;
  title: string;
  startTime: string;
  endTime: string;
  date: string;
  location?: string;
  subjectId: string;
  subject: {
    id: string;
    name: string;
    color: string;
  };
}

export interface DashboardResponse {
  user: DashboardUser;
  tasks: DashboardTask[];
  upcomingSchedules: DashboardSchedule[];
}

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "https://uniflow.sharshekeev13.dev";

/**
 * Получает данные для дашборда
 */
export const getDashboard = async (): Promise<DashboardResponse> => {
  const response = await fetch(`${API_BASE_URL}/users/dashboard`, {
    method: "GET",
    credentials: "include",
    headers: {
      Authorization: `Bearer ${useAuthStore.getState().token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Ошибка при загрузке данных дашборда: ${response.statusText}`);
  }

  const data: DashboardResponse = await response.json();
  return data;
};
