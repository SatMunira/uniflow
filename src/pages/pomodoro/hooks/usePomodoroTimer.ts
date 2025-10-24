import { useState, useEffect, useCallback, useRef } from "react";
import type {
  TimerState,
  PomodoroSettings,
  PomodoroSession,
} from "../types/pomodoro";
import { TimerMode, DEFAULT_SETTINGS } from "../types/pomodoro";

export function usePomodoroTimer() {
  const [settings, setSettings] = useState<PomodoroSettings>(() => {
    const saved = localStorage.getItem("pomodoroSettings");
    return saved ? JSON.parse(saved) : DEFAULT_SETTINGS;
  });

  const [timerState, setTimerState] = useState<TimerState>({
    mode: TimerMode.WORK,
    timeLeft: settings.workDuration * 60,
    isRunning: false,
    completedSessions: 0,
    currentCycle: 1,
  });

  const [sessions, setSessions] = useState<PomodoroSession[]>(() => {
    const saved = localStorage.getItem("pomodoroSessions");
    if (saved) {
      const parsed = JSON.parse(saved);
      return parsed.map((session: PomodoroSession) => ({
        ...session,
        completedAt: new Date(session.completedAt),
      }));
    }
    return [];
  });

  const intervalRef = useRef<number | null>(null);

  // Save settings to localStorage
  useEffect(() => {
    localStorage.setItem("pomodoroSettings", JSON.stringify(settings));
  }, [settings]);

  // Save sessions to localStorage
  useEffect(() => {
    localStorage.setItem("pomodoroSessions", JSON.stringify(sessions));
  }, [sessions]);

  const handleTimerComplete = useCallback(() => {
    // Play sound if enabled
    if (settings.soundEnabled) {
      playNotificationSound();
    }

    // Add session to history
    const newSession: PomodoroSession = {
      id: Date.now().toString(),
      mode: timerState.mode,
      duration:
        timerState.mode === TimerMode.WORK
          ? settings.workDuration
          : timerState.mode === TimerMode.SHORT_BREAK
            ? settings.shortBreakDuration
            : settings.longBreakDuration,
      completedAt: new Date(),
    };

    setSessions((prev) => [newSession, ...prev].slice(0, 20)); // Keep last 20 sessions

    // Determine next mode
    let nextMode: TimerMode;
    let nextCycle = timerState.currentCycle;
    let completedCount = timerState.completedSessions;

    if (timerState.mode === TimerMode.WORK) {
      completedCount++;
      if (completedCount % settings.sessionsUntilLongBreak === 0) {
        nextMode = TimerMode.LONG_BREAK;
        nextCycle++;
      } else {
        nextMode = TimerMode.SHORT_BREAK;
      }
    } else {
      nextMode = TimerMode.WORK;
    }

    const nextDuration =
      nextMode === TimerMode.WORK
        ? settings.workDuration
        : nextMode === TimerMode.SHORT_BREAK
          ? settings.shortBreakDuration
          : settings.longBreakDuration;

    setTimerState({
      mode: nextMode,
      timeLeft: nextDuration * 60,
      isRunning:
        nextMode === TimerMode.WORK
          ? settings.autoStartWork
          : settings.autoStartBreaks,
      completedSessions: completedCount,
      currentCycle: nextCycle,
    });
  }, [timerState, settings]);

  // Timer logic
  useEffect(() => {
    if (timerState.isRunning && timerState.timeLeft > 0) {
      intervalRef.current = window.setInterval(() => {
        setTimerState((prev) => ({
          ...prev,
          timeLeft: prev.timeLeft - 1,
        }));
      }, 1000);
    } else if (timerState.timeLeft === 0 && timerState.isRunning) {
      handleTimerComplete();
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [timerState.isRunning, timerState.timeLeft, handleTimerComplete]);

  const startTimer = useCallback(() => {
    setTimerState((prev) => ({ ...prev, isRunning: true }));
  }, []);

  const pauseTimer = useCallback(() => {
    setTimerState((prev) => ({ ...prev, isRunning: false }));
  }, []);

  const resetTimer = useCallback(() => {
    const duration =
      timerState.mode === TimerMode.WORK
        ? settings.workDuration
        : timerState.mode === TimerMode.SHORT_BREAK
          ? settings.shortBreakDuration
          : settings.longBreakDuration;

    setTimerState((prev) => ({
      ...prev,
      timeLeft: duration * 60,
      isRunning: false,
    }));
  }, [timerState.mode, settings]);

  const skipTimer = useCallback(() => {
    setTimerState((prev) => ({ ...prev, timeLeft: 0, isRunning: true }));
  }, []);

  const switchMode = useCallback(
    (mode: TimerMode) => {
      const duration =
        mode === TimerMode.WORK
          ? settings.workDuration
          : mode === TimerMode.SHORT_BREAK
            ? settings.shortBreakDuration
            : settings.longBreakDuration;

      setTimerState((prev) => ({
        ...prev,
        mode,
        timeLeft: duration * 60,
        isRunning: false,
      }));
    },
    [settings]
  );

  const updateSettings = useCallback((newSettings: Partial<PomodoroSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  }, []);

  const playNotificationSound = () => {
    // Simple beep sound using Web Audio API
    const audioContext = new AudioContext();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = 800;
    oscillator.type = "sine";

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(
      0.01,
      audioContext.currentTime + 0.5
    );

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
  };

  return {
    timerState,
    settings,
    sessions,
    startTimer,
    pauseTimer,
    resetTimer,
    skipTimer,
    switchMode,
    updateSettings,
  };
}
