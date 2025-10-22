import type { Subject } from '@/entities/schedule';

export const subjectsMock: Subject[] = [
  {
    id: 'math',
    title: 'Mathematics',
    color: '#2563eb',
    patterns: [
      {
        weekday: 1,        
        start: '09:00',
        end: '10:30',
        cycle: 'Z1',         
        range: { year: 2025, fromKw: 40, toKw: 52 },
      },
      {
        weekday: 3,        
        start: '11:00',
        end: '12:30',
        cycle: 'WEEKLY',     
        range: { year: 2025, fromKw: 40, toKw: 52 },
      },
    ],
  },
  {
    id: 'cs',
    title: 'Computer Science',
    color: '#16a34a',
    patterns: [
      {
        weekday: 5,          
        start: '14:00',
        end: '16:00',
        cycle: 'WEEKLY',         
        range: { year: 2025, fromKw: 40, toKw: 52 },
      },
    ],
  },
];
