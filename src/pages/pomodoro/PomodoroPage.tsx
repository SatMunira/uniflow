import { Page } from "@/components/layout/Page";
import { PageHeader } from "@/components/layout/PageHeader";
import TimerDisplay from "./components/TimerDisplay";
import ControlButtons from "./components/ControlButtons";
import SessionCounter from "./components/SessionCounter";
import SettingsPanel from "./components/SettingsPanel";
import ModeTabs from "./components/ModeTabs";
import { usePomodoroTimer } from "./hooks/usePomodoroTimer";
import { TimerMode } from "./types/pomodoro";

export default function PomodoroPage() {
  const {
    timerState,
    settings,
    startTimer,
    pauseTimer,
    resetTimer,
    skipTimer,
    switchMode,
    updateSettings,
  } = usePomodoroTimer();

  const getTotalTime = () => {
    switch (timerState.mode) {
      case TimerMode.WORK:
        return settings.workDuration * 60;
      case TimerMode.SHORT_BREAK:
        return settings.shortBreakDuration * 60;
      case TimerMode.LONG_BREAK:
        return settings.longBreakDuration * 60;
    }
  };

  return (
    <>
      <Page>
        <PageHeader title="Pomodoro Timer" />

        <div className="flex flex-col lg:flex-row gap-8 items-start justify-center">
          {/* Main Timer Section */}
          <div className="flex flex-col items-center gap-8 flex-1">
            {/* Mode Tabs */}
            <div className="w-full max-w-md">
              <ModeTabs
                currentMode={timerState.mode}
                onModeChange={switchMode}
                disabled={timerState.isRunning}
              />
            </div>

            {/* Timer Display */}
            <TimerDisplay
              timeLeft={timerState.timeLeft}
              totalTime={getTotalTime()}
              mode={timerState.mode}
              isRunning={timerState.isRunning}
            />

            {/* Control Buttons */}
            <ControlButtons
              isRunning={timerState.isRunning}
              onStart={startTimer}
              onPause={pauseTimer}
              onReset={resetTimer}
              onSkip={skipTimer}
            />
          </div>

          {/* Stats Section */}
          <div className="w-full lg:w-80">
            <SessionCounter
              completedSessions={timerState.completedSessions}
              currentCycle={timerState.currentCycle}
              sessionsUntilLongBreak={settings.sessionsUntilLongBreak}
            />
          </div>
        </div>
      </Page>

      {/* Settings Panel */}
      <SettingsPanel settings={settings} onUpdateSettings={updateSettings} />
    </>
  );
}
