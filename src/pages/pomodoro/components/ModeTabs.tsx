import { TimerMode } from "../types/pomodoro";

interface ModeTabsProps {
  currentMode: TimerMode;
  onModeChange: (mode: TimerMode) => void;
  disabled?: boolean;
}

export default function ModeTabs({
  currentMode,
  onModeChange,
  disabled = false,
}: ModeTabsProps) {
  const tabs = [
    { mode: TimerMode.WORK, label: "Focus" },
    { mode: TimerMode.SHORT_BREAK, label: "Short Break" },
    { mode: TimerMode.LONG_BREAK, label: "Long Break" },
  ];

  return (
    <div className="flex gap-2 p-1 bg-gray-100 rounded-lg border border-gray-300">
      {tabs.map((tab) => (
        <button
          key={tab.mode}
          onClick={() => !disabled && onModeChange(tab.mode)}
          disabled={disabled}
          className={`flex-1 px-4 py-2 rounded-md font-mono text-sm transition-all ${
            currentMode === tab.mode
              ? "bg-black text-white shadow-md"
              : "bg-transparent text-gray-600 hover:bg-gray-200"
          } ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
