import { setHours, setMinutes, startOfWeek, getISOWeek } from 'date-fns';
import type { Occurrence, Subject, WeekCycle } from '@/entities/schedule';

function parseHM(date: Date, hhmm: string) {
  const [h, m] = hhmm.split(':').map(Number);
  return setMinutes(setHours(date, h), m);
}

function isZ1Week(date: Date): boolean {
  const w = getISOWeek(date);
  return w % 2 === 1; 
}

function matchCycleByDate(date: Date, cycle: WeekCycle): boolean {
  if (cycle === 'WEEKLY') return true;
  return cycle === 'Z1' ? isZ1Week(date) : !isZ1Week(date);
}

function matchesView(patternCycle: WeekCycle, view: WeekCycle): boolean {
  if (view === 'WEEKLY') return true;        
  if (patternCycle === 'WEEKLY') return true; 
  return patternCycle === view;               
}

export function generateOccurrencesForWeekView(
  subjects: Subject[],
  anyDateInWeek: Date,
  viewCycle: WeekCycle, 
): Occurrence[] {

console.log(subjects)

  const weekStart = startOfWeek(anyDateInWeek, { weekStartsOn: 1 }); 
  const kw = getISOWeek(anyDateInWeek);
  const year = anyDateInWeek.getFullYear();

  const occs: Occurrence[] = [];

  for (const s of subjects) {
    for (const p of s.patterns) {
      if (p.range.year !== year) continue;
      if (kw < p.range.fromKw) continue;
      if (p.range.toKw && kw > p.range.toKw) continue;

      const day = new Date(weekStart);
      day.setDate(weekStart.getDate() + (p.weekday === 0 ? 6 : p.weekday - 1));

      if (!matchCycleByDate(day, p.cycle)) continue;

      if (!matchesView(p.cycle, viewCycle)) continue;

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
    }
  }

  return occs.sort((a, b) => a.start.getTime() - b.start.getTime());
}

export function getCycleForDate(date: Date): Exclude<WeekCycle, 'WEEKLY'> {
  return isZ1Week(date) ? 'Z1' : 'Z2';
}

export function toggleAttended(list: Occurrence[], id: string) {
  const i = list.findIndex((o) => o.id === id);
  if (i >= 0) list[i] = { ...list[i], attended: !list[i].attended };
}
