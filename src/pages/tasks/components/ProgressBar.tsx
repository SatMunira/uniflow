export function ProgressBar({ percentage }: { percentage: number }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 h-4 bg-[#E2E2E2] rounded-full overflow-hidden">
        <div
          className="h-full bg-[#B0A4E4] rounded-l-full transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="text-xs font-semibold text-gray-700">
        {percentage}%
      </span>
    </div>
  );
}