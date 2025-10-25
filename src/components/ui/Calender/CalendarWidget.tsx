import { useMemo, useState } from "react";

// ===== Calendar =====
export function CalendarWidget({ initialDate = new Date() }: { initialDate?: Date }) {
  const [view, setView] = useState(
    new Date(initialDate.getFullYear(), initialDate.getMonth(), 1)
  );

  const today = new Date();
  const year = view.getFullYear();
  const month = view.getMonth(); // 0..11

  const monthName = view.toLocaleString("en", { month: "long" });

  const { blanks, days } = useMemo(() => {
    const firstWeekday = (new Date(year, month, 1).getDay() + 6) % 7; // Mon=0
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    return {
      blanks: Array.from({ length: firstWeekday }),
      days: Array.from({ length: daysInMonth }, (_, i) => i + 1),
    };
  }, [year, month]);

  const isToday = (d: number) =>
    d === today.getDate() &&
    month === today.getMonth() &&
    year === today.getFullYear();

  return (
    <div className="bg-white border border-black rounded-xl p-4 font-mono">
      <div className="flex items-center justify-between mb-3">
        <button
          onClick={() => setView(new Date(year, month - 1, 1))}
          className="inline-grid place-items-center w-8 h-8 rounded-md border border-black"
          aria-label="Previous month"
        >
          &lt;
        </button>
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold">{monthName}</span>
          <span className="text-sm font-semibold">{year}</span>
        </div>
        <button
          onClick={() => setView(new Date(year, month + 1, 1))}
          className="inline-grid place-items-center w-8 h-8 rounded-md border border-black"
          aria-label="Next month"
        >
          &gt;
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center text-xs mb-2">
        {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((d) => (
          <div key={d} className="py-1 font-semibold">
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1 text-center text-xs">
        {/* пустые ячейки до 1-го числа */}
        {blanks.map((_, i) => (
          <div key={`b${i}`} />
        ))}

        {days.map((d) => {
          const base =
            "py-2 rounded-md border border-black bg-white transition";
          const active = isToday(d)
            ? "bg-[#ff4fa8]/20 ring-2 ring-offset-2 ring-[#ff4fa8]"
            : "";
          return (
            <div key={d} className={`${base} ${active}`} aria-current={isToday(d) ? "date" : undefined}>
              {d}
            </div>
          );
        })}
      </div>
    </div>
  );
}
