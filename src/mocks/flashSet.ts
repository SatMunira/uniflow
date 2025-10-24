export type FlashSet = {
  id: string;
  title: string;
  termsCount: number;
  author: { username: string; initial: string };
  createdAt: string; 
};

export const flashSetsMock: FlashSet[] = [
  {
    id: "f1",
    title: "Deutsch B1",
    termsCount: 29,
    author: { username: "dell_eyre", initial: "A" },
    createdAt: "2025-07-18T12:00:00.000Z",
  },
  {
    id: "f2",
    title: "Informatik Grundlagen",
    termsCount: 29,
    author: { username: "dell_eyre", initial: "A" },
    createdAt: "2025-07-05T12:00:00.000Z",
  },
  {
    id: "f3",
    title: "Deutsch B1",
    termsCount: 29,
    author: { username: "dell_eyre", initial: "A" },
    createdAt: "2025-06-22T12:00:00.000Z",
  },
  {
    id: "f4",
    title: "Deutsch B1",
    termsCount: 29,
    author: { username: "dell_eyre", initial: "A" },
    createdAt: "2025-06-10T12:00:00.000Z",
  },
  {
    id: "f5",
    title: "Deutsch B1",
    termsCount: 29,
    author: { username: "dell_eyre", initial: "A" },
    createdAt: "2025-06-01T12:00:00.000Z",
  },
];
