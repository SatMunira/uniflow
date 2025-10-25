// src/data/schedule/useSubjects.ts
import { useEffect, useState } from "react";
import { scheduleApi } from "@/api/scheduleApi";
import { composeSubject } from "@/data/schedule/adapters";
import type { Subject } from "@/entities/schedule";
import type { ApiSchedule } from "@/api/scheduleApi";

export function useSubjectsWithSchedules(anchorDate: Date) {
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let cancelled = false;
        (async () => {
            try {
                setLoading(true);
                setError(null);

                const apiSubjects = await scheduleApi.getSubjects();
                const year = anchorDate.getFullYear();

                // src/data/schedule/useSubjects.ts
                console.log("[API] BASE =", import.meta.env.VITE_API_BASE_URL);
                console.log("[API] subjects =", apiSubjects);

                // useSubjectsWithSchedules
                const subjectsFull = await Promise.all(
                    apiSubjects.map(async (s) => {
                        let sch: ApiSchedule[] = [];
                        try {
                            sch = await scheduleApi.getSubjectSchedules(s.id);
                        } catch (e) {
                            console.warn("[API] schedules load failed for", s.id, e);
                            sch = []; // продолжаем без слотов
                        }
                        return composeSubject(s, sch, year);
                    })
                );


                if (!cancelled) setSubjects(subjectsFull);
            } catch (e: any) {
                if (!cancelled) setError(e.message ?? "Failed to load subjects");
            } finally {
                if (!cancelled) setLoading(false);
            }
        })();
        return () => { cancelled = true; };
    }, [anchorDate]);

    return { subjects, loading, error };
}
