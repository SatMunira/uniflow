import React, { useMemo, useRef, useState } from "react";
import cls from "./WeekCalender.module.scss";
import { CheckCircle, Circle } from 'lucide-react';

export type SlotInfo = {
  start: Date;
  end: Date;
  dayIndex: number; 
  rowIndex: number; 
};

export type CalendarEvent = {
  id: string;
  title: string;
  start: Date;
  end: Date;
  color?: string;
  attended?: boolean;
};

export type WeekCalendarProps = {
  startDate?: Date;
  days?: number;
  hourStart?: number;
  hourEnd?: number;
  stepMinutes?: number;
  locale?: string;
  showNowIndicator?: boolean; 
  onSlotClick?: (slot: SlotInfo) => void;
  renderCell?: (slot: SlotInfo) => React.ReactNode;
  className?: string;
  onPrevWeek?: () => void;
  onNextWeek?: () => void;
  showNavArrows?: boolean;
  events?: CalendarEvent[];                 
  onToggleAttend?: (id: string) => void;   
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
  events = [],
  onToggleAttend,
}) => {

  const weekStart = useMemo(() => {
    const now = startDate ? new Date(startDate) : new Date();
    const day = now.getDay(); // 0..6 (вс..сб)
    const shiftToMonday = (day + 6) % 7;
    return addDays(startOfDay(now), -shiftToMonday);
  }, [startDate]);

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

    mins = Math.round(mins / 5) * 5;

    setHover({ visible: true, topPct: pct, minutes: mins });
  };

  const onGridMouseLeave: React.MouseEventHandler<HTMLDivElement> = () => {
    setHover((h) => ({ ...h, visible: false }));
  };

  const hoverStyle: React.CSSProperties = hover.visible ? { top: `${hover.topPct}%` } : { display: "none" };
  const hoverDate = useMemo(() => new Date(2000, 0, 1, 0, hover.minutes), [hover.minutes]);

  const minutesFromDayStart = (d: Date) => d.getHours() * 60 + d.getMinutes();
  const dayDiff = (a: Date, b: Date) =>
    Math.floor((startOfDay(a).getTime() - startOfDay(b).getTime()) / 86_400_000);

  const eventsByDay = useMemo(() => {
    const res: Array<
      Array<CalendarEvent & { _topPct: number; _heightPct: number }>
    > = Array.from({ length: days }, () => []);

    const dayStartMin = hourStart * 60;
    const dayEndMin = hourEnd * 60;
    const totalMin = dayEndMin - dayStartMin;

    for (const ev of events) {
      const dIndex = dayDiff(ev.start, weekStart);
      if (dIndex < 0 || dIndex >= days) continue;

      const evStartMin = Math.max(dayStartMin, minutesFromDayStart(ev.start));
      const evEndMin = Math.min(dayEndMin, minutesFromDayStart(ev.end));
      if (evEndMin <= evStartMin) continue; 

      const topPct = ((evStartMin - dayStartMin) / totalMin) * 100;
      const heightPct = ((evEndMin - evStartMin) / totalMin) * 100;

      res[dIndex].push({ ...ev, _topPct: topPct, _heightPct: heightPct });
    }

    for (const dayList of res) {
      dayList.sort((a, b) => +a.start - +b.start);
      const columns: CalendarEvent[][] = [];
      for (const e of dayList) {
        let placed = false;
        for (const col of columns) {
          const last = col[col.length - 1] as any;
          if (+last.end <= +e.start) {
            col.push(e);
            placed = true;
            break;
          }
        }
        if (!placed) columns.push([e]);
      }

      const colsCount = columns.length || 1;
      columns.forEach((col, i) => {
        for (const e of col as any[]) {
          e._colLeftPct = (i / colsCount) * 100 + 1;     
          e._colWidthPct = (1 / colsCount) * 100 - 2;   
        }
      });
    }
    return res as Array<
      Array<
        CalendarEvent & {
          _topPct: number;
          _heightPct: number;
          _colLeftPct: number;
          _colWidthPct: number;
        }
      >
    >;
  }, [events, days, hourStart, hourEnd, weekStart]);

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

          <div className={cls.nowBadge} style={hoverStyle}>
            {hoverLabelFmt.format(hoverDate)}
          </div>
        </div>

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
            const dayEvents = eventsByDay[dayIndex] ?? [];
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
                <div className={cls.eventsLayer} aria-hidden>
                  {dayEvents.map((ev) => {
                    const attended = !!ev.attended;
                    return (
                      <div
                        key={ev.id}
                        className={[cls.event, attended && cls['event--attended']].filter(Boolean).join(' ')}
                        style={{
                          top: `${ev._topPct}%`,
                          height: `${ev._heightPct}%`,
                          left: `${ev._colLeftPct}%`,
                          width: `${ev._colWidthPct}%`,
                        }}
                        title={`${ev.title}`}
                      >
                        <div className={cls.eventHead}>
                          {ev.start.toLocaleTimeString(locale, { hour: 'numeric', minute: '2-digit' })} —{' '}
                          {ev.end.toLocaleTimeString(locale, { hour: 'numeric', minute: '2-digit' })}
                        </div>

                        <div className={cls.eventTitle}>{ev.title}</div>

                        <div className={cls.eventFoot}>
                          {attended ? (
                            <span className={cls.attendedBadge}>
                              <CheckCircle className="size-4" aria-hidden />
                              attended
                            </span>
                          ) : (
                            <button
                              type="button"
                              className={cls.attendBtn}
                              onClick={onToggleAttend ? () => onToggleAttend(ev.id) : undefined}
                            >
                              <Circle className="size-4" aria-hidden />
                              mark attended
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}

          {showNowIndicator && <div className={cls.hoverIndicator} style={hoverStyle} />}

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
