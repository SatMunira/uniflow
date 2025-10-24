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

  const handleModeClick = (mode: TimerMode) => {
    console.log("Mode tab clicked:", mode, "disabled:", disabled);
    if (!disabled) {
      onModeChange(mode);
    }
  };

  return (
    <div className="flex gap-2 p-1 bg-white rounded-lg border border-gray-300 relative z-10">
      {tabs.map((tab) => (
        <button
          key={tab.mode}
          onClick={() => handleModeClick(tab.mode)}
          disabled={disabled}
          type="button"
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
