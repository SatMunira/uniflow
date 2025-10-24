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
          primary: "rgba(239, 68, 68, 1)", // red-500 with 30% opacity
          secondary: "rgba(254, 226, 226, 1)", // red-100 with 30% opacity
          gradient: "from-red-400/30 to-orange-500/10",
        };
      case TimerMode.SHORT_BREAK:
        return {
          primary: "rgba(16, 185, 129, 1)", // green-500 with 30% opacity
          secondary: "rgba(209, 250, 229, 1)", // green-100 with 30% opacity
          gradient: "from-green-400/30 to-emerald-500/10",
        };
      case TimerMode.LONG_BREAK:
        return {
          primary: "rgba(59, 130, 246, 1)", // blue-500 with 30% opacity
          secondary: "rgba(219, 234, 254, 1)", // blue-100 with 30% opacity
          gradient: "from-blue-400/30 to-cyan-500/10",
        };
    }
  };

  const colors = getModeColor();

  // Используем процентные значения для адаптивности
  const radius = 45; // процент от viewBox
  const circumference = 2 * Math.PI * radius;
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
    <div className="relative flex flex-col items-center justify-center w-full max-w-2xl px-4 pointer-events-none">
      {/* Background gradient animation */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} opacity-10 rounded-full blur-3xl ${
          isRunning ? "animate-pulse" : ""
        } w-[150%] h-[150%] -translate-x-[16.67%] -translate-y-[16.67%] z-10`}
      />

      {/* Circular progress */}
      <div className="relative w-full aspect-square max-w-sm sm:max-w-md lg:max-w-lg">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            stroke={colors.secondary}
            strokeWidth="2"
            fill="none"
          />
          {/* Progress circle */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            stroke={colors.primary}
            strokeWidth="2"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-linear"
            style={{
              filter: isRunning ? "drop-shadow(0 0 0.5rem " + colors.primary + ")" : "none",
            }}
          />
        </svg>

        {/* Timer content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div
            className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-mono font-bold ${
              isRunning ? "animate-pulse-subtle" : ""
            }`}
            style={{ color: colors.primary }}
          >
            {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
          </div>
          <div className="mt-2 sm:mt-3 md:mt-4 text-sm sm:text-base md:text-lg lg:text-xl font-medium text-gray-600">
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
