import { useScheduleStore } from '@/store/schedule';

export function useFakeSchedule() {
  const { occurrences, weekAnchor, nextWeek, prevWeek, setWeek, markAttended } =
    useScheduleStore();

  return {
    weekAnchor,
    occurrences,
    nextWeek,
    prevWeek,
    setWeek,
    markAttended,
  };
}
