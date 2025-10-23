import React, { useMemo, useRef, useState } from "react";
import cls from "./WeekCalender.module.scss";

export type SlotInfo = {
  start: Date;
  end: Date;
  dayIndex: number; // 0..(days-1)
  rowIndex: number; // 0..(rows-1)
};

export type WeekCalendarProps = {
  startDate?: Date;
  days?: number;
  hourStart?: number;
  hourEnd?: number;
  stepMinutes?: number;
  locale?: string;
  showNowIndicator?: boolean; // оставил проп, но теперь линия следует за курсором
  onSlotClick?: (slot: SlotInfo) => void;
  renderCell?: (slot: SlotInfo) => React.ReactNode;
  className?: string;
  onPrevWeek?: () => void;
  onNextWeek?: () => void;
  showNavArrows?: boolean;
};

function startOfDay(d: Date) {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}
function addDays(d: Date, n: number) {
  const x = new Date(d);
  x.setDate(x.getDate() + n);
  return x;
}
function addMinutes(d: Date, n: number) {
  return new Date(d.getTime() + n * 60_000);
}

export const WeekCalendar: React.FC<WeekCalendarProps> = ({
  startDate,
  days = 7,
  hourStart = 8,
  hourEnd = 20,
  stepMinutes = 30,
  locale = "en-US",
  showNowIndicator = true,
  onSlotClick,
  renderCell,
  className = "",
  onPrevWeek,
  onNextWeek,
  showNavArrows = true,
}) => {
  // базовая неделя от понедельника
  const weekStart = useMemo(() => {
    const now = startDate ? new Date(startDate) : new Date();
    const day = now.getDay(); // 0..6 (вс..сб)
    const shiftToMonday = (day + 6) % 7;
    return addDays(startOfDay(now), -shiftToMonday);
  }, [startDate]);

  // индекс сегодня в диапазоне (для дефолтного активного дня)
  const todayIndex = useMemo(() => {
    const today = startOfDay(new Date());
    for (let i = 0; i < days; i++) {
      if (+startOfDay(addDays(weekStart, i)) === +today) return i;
    }
    return 0;
  }, [weekStart, days]);

  const [activeDay, setActiveDay] = useState<number>(todayIndex);

  const rows = useMemo(() => {
    const totalMinutes = (hourEnd - hourStart) * 60;
    return Math.ceil(totalMinutes / stepMinutes);
  }, [hourStart, hourEnd, stepMinutes]);

  const dayPartsFmt = useMemo(
    () => new Intl.DateTimeFormat(locale, { weekday: "short", day: "2-digit" }),
    [locale]
  );
  const hourFmt = useMemo(
    () => new Intl.DateTimeFormat(locale, { hour: "numeric" }),
    [locale]
  );
  const hoverLabelFmt = useMemo(
    () => new Intl.DateTimeFormat(locale, { hour: "numeric", minute: "2-digit" }),
    [locale]
  );

  // hover-индикатор (едет за мышкой)
  const gridRef = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState<{ visible: boolean; topPct: number; minutes: number }>({
    visible: false,
    topPct: 0,
    minutes: hourStart * 60,
  });

  const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));

  const onGridMouseMove: React.MouseEventHandler<HTMLDivElement> = (e) => {
    const el = gridRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const y = clamp(e.clientY - rect.top, 0, rect.height);
    const pct = (y / rect.height) * 100;

    const total = (hourEnd - hourStart) * 60;
    let mins = hourStart * 60 + Math.round((y / rect.height) * total);

    // прилипание к 5 минутам (если нужно — оставь; если нет — закомментируй)
    mins = Math.round(mins / 5) * 5;

    setHover({ visible: true, topPct: pct, minutes: mins });
  };

  const onGridMouseLeave: React.MouseEventHandler<HTMLDivElement> = () => {
    setHover((h) => ({ ...h, visible: false }));
  };

  const hoverStyle: React.CSSProperties = hover.visible ? { top: `${hover.topPct}%` } : { display: "none" };
  const hoverDate = useMemo(() => new Date(2000, 0, 1, 0, hover.minutes), [hover.minutes]);

  return (
    <div
      className={[cls.calendar, className].filter(Boolean).join(" ")}
      style={{ "--rows": String(rows), "--days": String(days) } as React.CSSProperties}
    >
      {/* Шапка */}
      <div className={cls.header}>
        <div className={cls.headerGutter}>
          {showNavArrows && (
            <div className={cls.navArrows} role="group" aria-label="Change week">
              <button
                type="button"
                className={cls.navBtn}
                aria-label="Previous week"
                onClick={onPrevWeek}
              >
                ←
              </button>
              <button
                type="button"
                className={cls.navBtn}
                aria-label="Next week"
                onClick={onNextWeek}
              >
                →
              </button>
            </div>
          )}
        </div>
        {Array.from({ length: days }).map((_, i) => {
          const d = addDays(weekStart, i);
          const parts = dayPartsFmt.formatToParts(d);
          const wd = (parts.find((p) => p.type === "weekday")?.value || "").toLocaleUpperCase(locale);
          const day = parts.find((p) => p.type === "day")?.value || "";
          const isActive = i === activeDay;

          return (
            <button
              key={i}
              type="button"
              onClick={() => setActiveDay(i)}
              className={[cls.headerCell, isActive && cls.isActive].filter(Boolean).join(" ")}
              title={d.toDateString()}
            >
              <span className={cls.headerLabel}>
                <span className={cls.weekday}>{wd}</span>
                <span className={cls.dot}>&nbsp;</span>
                <span className={cls.dayNum}>{day}</span>
              </span>
            </button>
          );
        })}
      </div>
      <div className={cls.bodyScroll}>
        {/* Левая колонка — часы */}
        <div className={cls.times}>
          {Array.from({ length: hourEnd - hourStart + 1 }).map((_, i) => {
            const h = hourStart + i;
            const label = hourFmt.format(new Date(2000, 0, 1, h));
            return (
              <div key={h} className={cls.timeRow} aria-hidden>
                <span>{label}</span>
              </div>
            );
          })}

          {/* badge со временем под курсором */}
          <div className={cls.nowBadge} style={hoverStyle}>
            {hoverLabelFmt.format(hoverDate)}
          </div>
        </div>

        {/* Основная сетка */}
        <div
          ref={gridRef}
          className={cls.grid}
          role="grid"
          aria-label="Week calendar grid"
          onMouseMove={onGridMouseMove}
          onMouseLeave={onGridMouseLeave}
        >
          <div className={cls.bodyGutter} aria-hidden />

          {Array.from({ length: days }).map((_, dayIndex) => {
            const dayDate = addDays(weekStart, dayIndex);
            return (
              <div key={dayIndex} className={cls.dayColumn} aria-label={dayDate.toDateString()}>
                {Array.from({ length: rows }).map((__, rowIndex) => {
                  const slotStart = addMinutes(new Date(dayDate.setHours(hourStart, 0, 0, 0)), rowIndex * stepMinutes);
                  const slotEnd = addMinutes(slotStart, stepMinutes);
                  const slot: SlotInfo = { start: slotStart, end: slotEnd, dayIndex, rowIndex };

                  return (
                    <button
                      key={rowIndex}
                      type="button"
                      className={cls.cell}
                      onClick={onSlotClick ? () => onSlotClick(slot) : undefined}
                      aria-label={`${slotStart.toLocaleString(locale)} — ${slotEnd.toLocaleTimeString(locale)}`}
                    >
                      {renderCell ? renderCell(slot) : null}
                    </button>
                  );
                })}
              </div>
            );
          })}

          {/* тонкая линия hover через всю сетку */}
          {showNowIndicator && <div className={cls.hoverIndicator} style={hoverStyle} />}

          {/* толстая линия — только в активной колонке */}
          {showNowIndicator && (
            <div className={cls.activeColOverlay} style={{ gridColumn: `${activeDay + 2} / ${activeDay + 3}` }}>
              <div className={cls.hoverIndicatorThick} style={hoverStyle} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
