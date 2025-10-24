import { Play, Pause, RotateCcw, SkipForward } from "lucide-react";

interface ControlButtonsProps {
  isRunning: boolean;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  onSkip: () => void;
}

export default function ControlButtons({
  isRunning,
  onStart,
  onPause,
  onReset,
  onSkip,
}: ControlButtonsProps) {
  const handleStart = () => {
    console.log("Start button clicked");
    onStart();
  };

  const handlePause = () => {
    console.log("Pause button clicked");
    onPause();
  };

  const handleReset = () => {
    console.log("Reset button clicked");
    onReset();
  };

  const handleSkip = () => {
    console.log("Skip button clicked");
    onSkip();
  };

  return (
    <div className="flex items-center gap-4 relative z-10">
      {/* Reset Button */}
      <button
        onClick={handleReset}
        type="button"
        className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors border border-gray-300"
        aria-label="Reset timer"
      >
        <RotateCcw size={20} className="text-gray-700" />
      </button>

      {/* Play/Pause Button */}
      <button
        onClick={isRunning ? handlePause : handleStart}
        type="button"
        className="p-6 rounded-full bg-black hover:bg-gray-800 transition-all transform hover:scale-105 shadow-lg"
        aria-label={isRunning ? "Pause timer" : "Start timer"}
      >
        {isRunning ? (
          <Pause size={32} className="text-white" fill="white" />
        ) : (
          <Play size={32} className="text-white" fill="white" />
        )}
      </button>

      {/* Skip Button */}
      <button
        onClick={handleSkip}
        type="button"
        className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors border border-gray-300"
        aria-label="Skip to next session"
      >
        <SkipForward size={20} className="text-gray-700" />
      </button>
    </div>
  );
}
