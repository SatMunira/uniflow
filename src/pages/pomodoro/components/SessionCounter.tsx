import { Coffee, Flame } from "lucide-react";

interface SessionCounterProps {
  completedSessions: number;
  currentCycle: number;
  sessionsUntilLongBreak: number;
}

export default function SessionCounter({
  completedSessions,
  currentCycle,
  sessionsUntilLongBreak,
}: SessionCounterProps) {
  const sessionsInCurrentCycle = completedSessions % sessionsUntilLongBreak;

  return (
    <div className="bg-white border border-black rounded-lg p-6 font-mono">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Flame className="text-orange-500" size={24} />
          <span className="text-lg font-semibold">Sessions Today</span>
        </div>
        <span className="text-2xl font-bold">{completedSessions}</span>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Coffee className="text-blue-500" size={24} />
          <span className="text-lg font-semibold">Current Cycle</span>
        </div>
        <span className="text-2xl font-bold">#{currentCycle}</span>
      </div>

      {/* Progress dots */}
      <div className="mt-4">
        <div className="text-sm text-gray-600 mb-2">
          Progress to long break
        </div>
        <div className="flex gap-2">
          {Array.from({ length: sessionsUntilLongBreak }).map((_, index) => (
            <div
              key={index}
              className={`h-3 flex-1 rounded-full transition-colors ${
                index < sessionsInCurrentCycle
                  ? "bg-red-500"
                  : "bg-gray-200"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
