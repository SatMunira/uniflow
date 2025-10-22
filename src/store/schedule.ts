// src/store/schedule.ts
import { create } from 'zustand';
import type { Occurrence, Subject } from '@/entities/schedule';
import { SUBJECTS_FIXTURE } from '@/data/fixtures/schedule';
import { generateOccurrencesForWeek, toggleAttended } from '@/data/generateWeek';
import { addWeeks } from 'date-fns';

type State = {
  subjects: Subject[];
  weekAnchor: Date;     // любая дата внутри выбранной недели
  occurrences: Occurrence[];
};

type Actions = {
  setWeek: (anchor: Date) => void;
  nextWeek: () => void;
  prevWeek: () => void;
  markAttended: (id: string) => void;
};

export const useScheduleStore = create<State & Actions>((set, get) => ({
  subjects: SUBJECTS_FIXTURE,
  weekAnchor: new Date('2025-10-21T00:00:00'), // чтобы открыть KW43 (как на скрине 20–26 Oct 2025)
  occurrences: [],

  setWeek: (anchor) => {
    const { subjects } = get();
    set({
      weekAnchor: anchor,
      occurrences: generateOccurrencesForWeek(subjects, anchor),
    });
  },

  nextWeek: () => {
    const { weekAnchor, setWeek } = get();
    setWeek(addWeeks(weekAnchor, 1));
  },

  prevWeek: () => {
    const { weekAnchor, setWeek } = get();
    setWeek(addWeeks(weekAnchor, -1));
  },

  markAttended: (id) => {
    const { occurrences } = get();
    const copy = [...occurrences];
    toggleAttended(copy, id);
    set({ occurrences: copy });
  },
}));

// инициализация на старте приложения
useScheduleStore.getState().setWeek(useScheduleStore.getState().weekAnchor);
