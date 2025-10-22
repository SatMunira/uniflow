import type { WeekCycle } from "@/entities/schedule";

export function CycleSelect({
  value,
  onChange,
  className = "",
}: {
  value: WeekCycle;
  onChange: (v: WeekCycle) => void;
  className?: string;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as WeekCycle)}
      className={[
        "h-9 rounded-md border px-3 text-sm",
        "bg-background text-foreground",
        "focus:outline-none focus:ring-2 focus:ring-ring",
        className,
      ].join(" ")}
    >
      <option value="A">A</option>
      <option value="B">B</option>
      <option value="WEEKLY">Weekly</option>
    </select>
  );
}
