import { TimerMode } from "../types/pomodoro";

interface TimerDisplayProps {
  timeLeft: number;
  totalTime: number;
  mode: TimerMode;
  isRunning: boolean;
}

export default function TimerDisplay({
  timeLeft,
  totalTime,
  mode,
  isRunning,
}: TimerDisplayProps) {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const progress = ((totalTime - timeLeft) / totalTime) * 100;

  const getModeColor = () => {
    switch (mode) {
      case TimerMode.WORK:
        return {
          primary: "#EF4444", // red-500
          secondary: "#FEE2E2", // red-100
          gradient: "from-red-400 to-orange-500",
        };
      case TimerMode.SHORT_BREAK:
        return {
          primary: "#10B981", // green-500
          secondary: "#D1FAE5", // green-100
          gradient: "from-green-400 to-emerald-500",
        };
      case TimerMode.LONG_BREAK:
        return {
          primary: "#3B82F6", // blue-500
          secondary: "#DBEAFE", // blue-100
          gradient: "from-blue-400 to-cyan-500",
        };
    }
  };

  const colors = getModeColor();
  const circumference = 2 * Math.PI * 120; // radius = 120
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  const getModeLabel = () => {
    switch (mode) {
      case TimerMode.WORK:
        return "Focus Time";
      case TimerMode.SHORT_BREAK:
        return "Short Break";
      case TimerMode.LONG_BREAK:
        return "Long Break";
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center">
      {/* Background gradient animation */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} opacity-10 rounded-full blur-3xl ${
          isRunning ? "animate-pulse" : ""
        }`}
        style={{ width: "400px", height: "400px" }}
      />

      {/* Circular progress */}
      <div className="relative w-80 h-80">
        <svg className="w-full h-full transform -rotate-90">
          {/* Background circle */}
          <circle
            cx="160"
            cy="160"
            r="120"
            stroke={colors.secondary}
            strokeWidth="8"
            fill="none"
          />
          {/* Progress circle */}
          <circle
            cx="160"
            cy="160"
            r="120"
            stroke={colors.primary}
            strokeWidth="8"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-linear"
            style={{
              filter: isRunning ? "drop-shadow(0 0 8px " + colors.primary + ")" : "none",
            }}
          />
        </svg>

        {/* Timer content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div
            className={`text-7xl font-mono font-bold ${
              isRunning ? "animate-pulse-subtle" : ""
            }`}
            style={{ color: colors.primary }}
          >
            {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
          </div>
          <div className="mt-4 text-xl font-medium text-gray-600">
            {getModeLabel()}
          </div>
        </div>
      </div>

      {/* Subtle animation styles */}
      <style>{`
        @keyframes pulse-subtle {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.9;
          }
        }
        .animate-pulse-subtle {
          animation: pulse-subtle 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </div>
  );
}
