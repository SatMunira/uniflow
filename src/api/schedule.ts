import { useAuthStore } from "@/store/authStore";

export interface ParsedScheduleItem {
  Wochentag: string;
  VeranstaltungCode: string;
  Veranstaltung: string;
  Zyklus: string;
  Anfang: string;
  Ende: string;
  Raum: string;
  Dozent: string;
}

export interface ScheduleParseResponse {
  items: ParsedScheduleItem[];
  statistics: {
    total: number;
    by_day: Record<string, number>;
    days: string[];
  };
  saveSummary: {
    parsedCount: number;
    processedCount: number;
    createdCount: number;
    updatedCount: number;
    skippedCount: number;
    created: string[];
    updated: string[];
    skipped: string[];
    errors: Array<{
      name: string;
      reason: string;
    }>;
  };
  saveSchedulesSummary: {
    createdCount: number;
    updatedCount: number;
    skippedCount: number;
    errorCount: number;
    created: any[];
    updated: any[];
    skipped: any[];
    errors: any[];
  };
}

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "https://uniflow.sharshekeev13.dev";

/**
 * Загружает и парсит PDF файл с расписанием
 */
export const uploadSchedulePDF = async (
  file: File
): Promise<ScheduleParseResponse> => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${API_BASE_URL}/schedules/parse-pdf`, {
    method: "POST",
    credentials: "include",
    headers: {
      Authorization: `Bearer ${useAuthStore.getState().token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error(
      `Ошибка при загрузке расписания: ${response.statusText}`
    );
  }

  const data: ScheduleParseResponse = await response.json();
  return data;
};
