export enum TimerMode {
  WORK = "work",
  SHORT_BREAK = "shortBreak",
  LONG_BREAK = "longBreak",
}

export interface PomodoroSettings {
  workDuration: number; // in minutes
  shortBreakDuration: number; // in minutes
  longBreakDuration: number; // in minutes
  autoStartBreaks: boolean;
  autoStartWork: boolean;
  soundEnabled: boolean;
  sessionsUntilLongBreak: number;
}

export interface PomodoroSession {
  id: string;
  mode: TimerMode;
  duration: number;
  completedAt: Date;
}

export interface TimerState {
  mode: TimerMode;
  timeLeft: number; // in seconds
  isRunning: boolean;
  completedSessions: number;
  currentCycle: number;
}

export const DEFAULT_SETTINGS: PomodoroSettings = {
  workDuration: 25,
  shortBreakDuration: 5,
  longBreakDuration: 15,
  autoStartBreaks: false,
  autoStartWork: false,
  soundEnabled: true,
  sessionsUntilLongBreak: 4,
};
