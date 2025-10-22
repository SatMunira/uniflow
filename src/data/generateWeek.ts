import { setHours, setMinutes, startOfWeek } from 'date-fns';
import { getISOWeek } from 'date-fns';
import type { Occurrence, Subject, WeekCycle } from '@/entities/schedule';

function parseHM(date: Date, hhmm: string) {
  const [h, m] = hhmm.split(':').map(Number);
  return setMinutes(setHours(date, h), m);
}

function isAWeek(date: Date): boolean {
  const w = getISOWeek(date);
  return w % 2 === 1;
}

function matchCycle(date: Date, cycle: WeekCycle): boolean {
  if (cycle === 'WEEKLY') return true;
  return cycle === 'A' ? isAWeek(date) : !isAWeek(date);
}

export function generateOccurrencesForWeek(
  subjects: Subject[],
  anyDateInWeek: Date,
): Occurrence[] {
  const weekStart = startOfWeek(anyDateInWeek, { weekStartsOn: 1 }); 
  const kw = getISOWeek(anyDateInWeek);
  const year = anyDateInWeek.getFullYear();

  const occs: Occurrence[] = [];

  subjects.forEach((s) => {
    s.patterns.forEach((p) => {
      if (p.range.year !== year) return;
      if (kw < p.range.fromKw) return;
      if (p.range.toKw && kw > p.range.toKw) return;

      const day = new Date(weekStart);
      day.setDate(weekStart.getDate() + (p.weekday === 0 ? 6 : p.weekday - 1)); // 1..5..7

      if (!matchCycle(day, p.cycle)) return;

      const start = parseHM(new Date(day), p.start);
      const end = parseHM(new Date(day), p.end);

      occs.push({
        id: `${s.id}_${start.toISOString()}`,
        subjectId: s.id,
        title: s.title,
        start,
        end,
        attended: false,
      });
    });
  });

  return occs.sort((a, b) => a.start.getTime() - b.start.getTime());
}

export function toggleAttended(list: Occurrence[], id: string) {
  const i = list.findIndex((o) => o.id === id);
  if (i >= 0) list[i] = { ...list[i], attended: !list[i].attended };
}
