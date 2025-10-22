// src/components/timetable/WeekNav.tsx
import { useMemo, useState, useRef, useEffect } from "react";
import { Chip } from "@/components/ui/Chip/Chip";
import { Calendar } from "lucide-react";
import {
  addDays, addMonths, endOfWeek, format, getISOWeek,
  isSameDay, isSameMonth, startOfMonth, startOfWeek
} from "date-fns";
import { enUS } from "date-fns/locale";
import type { Locale } from "date-fns";
import type { WeekCycle } from "@/entities/schedule";
import { getCycleForDate } from "@/data/schedule/generateWeek";
import cls from "./TimeTable.module.scss";

export function WeekNav({
  value,
  onChange,
  onChangeViewCycle,       
  viewCycle = "WEEKLY",    
  weekStartsOn = 1,
  locale = enUS,
  showCycleChip = true,
}: {
  value: Date;
  onChange: (next: Date) => void;
  onChangeViewCycle: (next: WeekCycle) => void;
  viewCycle?: WeekCycle;
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  locale?: Locale;
  showCycleChip?: boolean;
}) {
  const [openCal, setOpenCal] = useState(false);
  const [openCycle, setOpenCycle] = useState(false);
  const [monthAnchor, setMonthAnchor] = useState(startOfMonth(value));
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDown = (e: MouseEvent | TouchEvent) => {
      const el = wrapRef.current;
      if (!el) return;
      const target = e.target as Node;
      if (!el.contains(target)) {
        setOpenCal(false);
        setOpenCycle(false);
      }
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("touchstart", onDown, { passive: true });
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("touchstart", onDown);
    };
  }, []);

  const range = useMemo(() => {
    const from = startOfWeek(value, { weekStartsOn });
    const to = endOfWeek(value, { weekStartsOn });
    return `${format(from, "dd MMM yyyy", { locale })} – ${format(to, "dd MMM yyyy", { locale })}`;
  }, [value, weekStartsOn, locale]);

  const kw = useMemo(() => getISOWeek(value), [value]);
  const actualZ = getCycleForDate(value); 

  const monthStart = startOfMonth(monthAnchor);
  const gridStart = startOfWeek(monthStart, { weekStartsOn });
  const days: Date[] = useMemo(() => {
    const arr: Date[] = [];
    let d = gridStart;
    for (let i = 0; i < 42; i++) { arr.push(d); d = addDays(d, 1); }
    return arr;
  }, [gridStart]);

  const selectDay = (d: Date) => { onChange(d); setOpenCal(false); };

  return (
    <div ref={wrapRef} className={cls.weekNavWrap}>
      <Chip muted className={cls.rangeChip} onClick={() => { setOpenCal(v => !v); setOpenCycle(false); }}>
        <span className={cls.calBox}><Calendar className={cls.calIcon} /></span>
        {range}
      </Chip>

      <Chip>KW{kw}</Chip>
   
      {showCycleChip && (
        <Chip onClick={() => { setOpenCycle(v => !v); setOpenCal(false); }}>
          <strong style={{ marginRight: 8 }}>Z{actualZ === "Z1" ? "1" : "2"}</strong>
          <span className={cls.vSep} aria-hidden="true" />
          <span className="opacity-70">
            {viewCycle === "WEEKLY" ? "all" : viewCycle}
          </span>
        </Chip>
      )}

      {openCal && (
        <div className={cls.popover} role="dialog" aria-label="Pick a date">
          <div className={cls.popHeader}>
            <button type="button" className={cls.navBtn} onClick={() => setMonthAnchor(m => addMonths(m, -1))}>‹</button>
            <div className={cls.monthLabel}>{format(monthAnchor, "LLLL yyyy", { locale })}</div>
            <button type="button" className={cls.navBtn} onClick={() => setMonthAnchor(m => addMonths(m, 1))}>›</button>
          </div>

          <div className={cls.weekdayRow}>
            {Array.from({ length: 7 }).map((_, i) => {
              const d = addDays(startOfWeek(new Date(), { weekStartsOn }), i);
              return <div key={i} className={cls.weekdayCell}>{format(d, "EE", { locale })}</div>;
            })}
          </div>

          <div className={cls.daysGrid}>
            {days.map((d) => {
              const outside = !isSameMonth(d, monthAnchor);
              const selected = isSameDay(d, value);
              return (
                <button
                  key={d.toISOString()}
                  type="button"
                  onClick={() => selectDay(d)}
                  className={[
                    cls.day,
                    outside && cls.dayOutside,
                    selected && cls.daySelected,
                  ].filter(Boolean).join(" ")}
                >
                  <span className="tabular-nums">{format(d, "d")}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {openCycle && (
        <div className={cls.popover} role="listbox" aria-label="Pick cycle" style={{ padding: 8 }}>
          <div className={cls.cycleList}>
            <button type="button" className={cls.cycleItem} onClick={() => { onChangeViewCycle("WEEKLY"); setOpenCycle(false); }}>
              Show: WEEKLY (all)
            </button>
            <button type="button" className={cls.cycleItem} onClick={() => { onChangeViewCycle("Z1"); setOpenCycle(false); }}>
              Show: Z1 (odd weeks)
            </button>
            <button type="button" className={cls.cycleItem} onClick={() => { onChangeViewCycle("Z2"); setOpenCycle(false); }}>
              Show: Z2 (even weeks)
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
