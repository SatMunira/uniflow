// src/api/scheduleApi.ts
import { useAuthStore } from "@/store/authStore";

export type ApiSubject = {
  id: string; name: string; description?: string; color?: string;
  attachments?: Array<{ id: string; name: string; mime: string; size?: number; url?: string; createdAt: string; }>;
};

// src/api/scheduleApi.ts
export type ApiSchedule = {
  id: string;
  dayOfWeek:
    | 0|1|2|3|4|5|6
    | "Sunday"|"Monday"|"Tuesday"|"Wednesday"|"Thursday"|"Friday"|"Saturday"
    | "Sonntag"|"Montag"|"Dienstag"|"Mittwoch"|"Donnerstag"|"Freitag"|"Samstag";
  startTime: string;
  endTime: string;
  weekType: "all" | "odd" | "even";
  room?: string;
  subjectId?: string;           // ⬅️ добавили
};

const BASE = import.meta.env.VITE_API_BASE_URL || "https://uniflow.sharshekeev13.dev";
// ^ используй ТУ ЖЕ переменную, что и в твоём «рабочем» примере

async function http<T>(url: string, init?: RequestInit): Promise<T> {
  const token = useAuthStore.getState().token;
  const full = `${BASE}${url}`;
  const res = await fetch(full, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(init?.headers || {}),
    },
    ...init,
  });

  // временный супер-дебаг
  const body = await res.clone().text();
  console.log("[HTTP]", res.status, res.statusText, full, "→", body.slice(0, 300));

  if (!res.ok) throw new Error(`${res.status} ${res.statusText}: ${body}`);
  return JSON.parse(body) as T;
}

// замени getSubjectSchedules на этот вариант
export const scheduleApi = {
  getSubjects: () => http<ApiSubject[]>(`/subjects`),
  getSubject: (subjectId: string) => http<ApiSubject>(`/subjects/${subjectId}`),

  async getSubjectSchedules(subjectId: string): Promise<ApiSchedule[]> {
    try {
      return await http<ApiSchedule[]>(`/subjects/${subjectId}/schedules`);
    } catch (e: any) {
      // если эндпоинта нет — пробуем вариант с query-параметром
      const msg = typeof e === "string" ? e : (e?.message ?? "");
      if (msg.includes("404") || msg.includes("Not Found")) {
        console.warn("[API] fallback → GET /schedules?subjectId=", subjectId);
        return http<ApiSchedule[]>(`/schedules?subjectId=${encodeURIComponent(subjectId)}`);
      }
      throw e;
    }
  },
};

