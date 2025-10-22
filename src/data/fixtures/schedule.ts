// src/data/fixtures/schedule.ts
import type { Subject } from '@/entities/schedule';

export const SUBJECTS_FIXTURE: Subject[] = [
  {
    id: 'sub-kuni',
    title: 'Kuni',
    patterns: [
      {
        weekday: 1,          // Monday
        start: '08:00',
        end: '09:00',
        cycle: 'WEEKLY',
        range: { year: 2025, fromKw: 42, toKw: 52 },
      },
    ],
  },
  {
    id: 'sub-69',
    title: '69',
    patterns: [
      {
        weekday: 2,          // Tuesday
        start: '09:30',
        end: '12:00',
        cycle: 'WEEKLY',
        range: { year: 2025, fromKw: 42, toKw: 52 },
      },
    ],
  },
  {
    id: 'sub-missionary',
    title: 'Missionary',
    patterns: [
      {
        weekday: 4,          // Thursday
        start: '10:00',
        end: '12:30',
        cycle: 'WEEKLY',
        range: { year: 2025, fromKw: 42, toKw: 52 },
      },
    ],
  },
  {
    id: 'sub-lotus',
    title: 'Lotus',
    patterns: [
      {
        weekday: 5,          // Friday
        start: '08:30',
        end: '09:25',
        cycle: 'A',          
        range: { year: 2025, fromKw: 42, toKw: 52 },
      },
    ],
  },
  {
    id: 'sub-cowgirl',
    title: 'Cowgirl',
    patterns: [
      {
        weekday: 5,          // Friday
        start: '10:30',
        end: '11:30',
        cycle: 'WEEKLY',
        range: { year: 2025, fromKw: 42, toKw: 52 },
      },
    ],
  },

  {
    id: 'sub-dada',
    title: 'Защита от темных искусств',
    description: 'Добавь расширенное описание курса…',
    attachments: [
      {
        id: 'att-pdf-1',
        name: '_Книга_Принца_Полукровки.pdf',
        mime: 'application/pdf',
        url: '/mock/_Книга_Принца_Полукровки.pdf',
        createdAt: '2024-01-15T10:00:00Z',
      },
    ],
    patterns: [], // пусть без расписания, только для примера карточки предмета
  },
];
