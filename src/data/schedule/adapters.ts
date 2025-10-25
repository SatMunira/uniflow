// src/data/schedule/adapters.ts
import type { ApiSubject, ApiSchedule } from "@/api/scheduleApi";
import type { Subject, WeekCycle } from "@/entities/schedule";

function weekTypeToCycle(w: "all"|"odd"|"even"): WeekCycle {
  if (w === "odd") return "Z1";
  if (w === "even") return "Z2";
  return "WEEKLY";
}

// src/data/schedule/adapters.ts
function dayToNum(d: ApiSchedule["dayOfWeek"]): 0|1|2|3|4|5|6 {
  if (typeof d === "number") return d;
  const map = {Sunday:0, Monday:1, Tuesday:2, Wednesday:3, Thursday:4, Friday:5, Saturday:6} as const;
  return map[d] ?? 1;
}

export function composeSubject(subj: ApiSubject, schedules: ApiSchedule[], year: number): Subject {
  // 1) Берём только свои слоты
  const own = schedules.filter(sc => !sc.subjectId || sc.subjectId === subj.id);

  // 2) Дедуп по (weekday,start,end,cycle)
  const uniq = new Map<string, ApiSchedule>();
  for (const sc of own) {
    const key = `${dayToNum(sc.dayOfWeek)}|${sc.startTime}|${sc.endTime}|${sc.weekType}`;
    if (!uniq.has(key)) uniq.set(key, sc);
  }

  // (опционально) отладка, чтобы поймать баг бэка:
  if (own.length < schedules.length) {
    console.warn("[ADAPTER] filtered foreign schedules for", subj.id,
      "kept", own.length, "of", schedules.length);
  }

  return {
    id: subj.id,
    title: subj.name,
    color: subj.color,
    description: subj.description,
    attachments: subj.attachments,
    patterns: [...uniq.values()].map(sc => ({
      weekday: dayToNum(sc.dayOfWeek),
      start: sc.startTime,
      end: sc.endTime,
      cycle: sc.weekType === "odd" ? "Z1" : sc.weekType === "even" ? "Z2" : "WEEKLY",
      range: { year, fromKw: 1 },
    })),
  };
}
