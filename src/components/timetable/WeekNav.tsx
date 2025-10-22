import { useMemo } from "react";
import { Chip } from "@/components/common/Chip/Chip";
import {  Calendar, Hash } from "lucide-react";
import {  endOfWeek, format, getISOWeek, startOfWeek } from "date-fns";
import { enUS } from "date-fns/locale";
import type { Locale } from "date-fns";
import type { WeekCycle } from "@/entities/schedule";
import cls from "./TimeTable.module.scss";                     

export function WeekNav({
  value,
  weekStartsOn = 1,
  locale = enUS,
  showCycleChip = true,
  cycle = "A",
}: {
  value: Date;
  onChange: (next: Date) => void;
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  locale?: Locale;
  showCycleChip?: boolean;
  cycle?: WeekCycle;
}) {
  const range = useMemo(() => {
    const from = startOfWeek(value, { weekStartsOn });
    const to = endOfWeek(value, { weekStartsOn });
    return `${format(from, "dd MMM yyyy", { locale })} – ${format(to, "dd MMM yyyy", { locale })}`;
  }, [value, weekStartsOn, locale]);

  const kw = useMemo(() => getISOWeek(value), [value]);

  return (
    <>

      {/* Пилюля даты как на макете */}
      <Chip muted className={cls.rangeChip}>
        <span className={cls.calBox}>
          <Calendar className={cls.calIcon} />
        </span>
        {range}
      </Chip>

      <Chip>
        <Hash className="size-4 mr-1" />
        KW{kw}
      </Chip>

      {showCycleChip && <Chip>Z{cycle === "WEEKLY" ? "∞" : cycle}</Chip>}
    </>
  );
}
