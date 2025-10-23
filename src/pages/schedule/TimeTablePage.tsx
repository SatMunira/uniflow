import { useState, useMemo } from "react";
import { Page } from "@/components/layout/Page";
import { PageHeader } from "@/components/layout/PageHeader";
import { Toolbar } from "@/components/layout/Toolbar";
import { WeekNav } from "@/pages/schedule/WeekNav";
import type { WeekCycle } from "@/entities/schedule";
import { AccentButton } from "@/components/ui/AccentButton/AccentButton";
import { Plus } from "lucide-react";
import { WeekCalendar } from "@/components/ui/Calender/WeekCalendar";
import { addDays } from "date-fns";
import { generateOccurrencesForWeekView } from "@/data/schedule/generateWeek";
import { subjectsMock } from "@/mocks/subjects";
import type { CalendarEvent } from "@/components/ui/Calender/WeekCalendar";
import { toggleAttended } from "@/data/schedule/generateWeek";

export default function TimetablePage() {
  const [anchor, setAnchor] = useState(new Date("2025-10-21"));
  const [viewCycle, setViewCycle] = useState<WeekCycle>("WEEKLY");

  const [occs, setOccs] = useState(() =>
    generateOccurrencesForWeekView(subjectsMock, anchor, viewCycle)
  );

  const events: CalendarEvent[] = useMemo(() => {
    const fresh = generateOccurrencesForWeekView(subjectsMock, anchor, viewCycle);
    const map = new Map(occs.map(o => [o.id, o.attended]));
    const byId = fresh.map(o => ({ ...o, attended: map.get(o.id) ?? o.attended }));

    const colorOf = new Map(subjectsMock.map(s => [s.id, s.color]));
    return byId.map(o => ({
      id: o.id,
      title: o.title,
      start: o.start,
      end: o.end,
      attended: o.attended,
      color: colorOf.get(o.subjectId) || "#7c3aed",
    }));
  }, [anchor, viewCycle, occs]);

  const handleToggleAttend = (id: string) => {
    setOccs(prev => {
      const next = [...prev];
      toggleAttended(next, id);
      return next;
    });
  };

  return (
    <Page>
      <PageHeader title="Timetable" titleClassName="font-mono h-tight" />

      <Toolbar
        className="py-4"
        left={
          <WeekNav
            value={anchor}
            onChange={(d) => {
              setAnchor(d);
            }}
            viewCycle={viewCycle}
            onChangeViewCycle={setViewCycle}
            showCycleChip
          />
        }
        right={
          <AccentButton variant="outline" className="gap-2" onClick={() => console.log("Create new subject")}>
            <Plus className="size-4" />
            New
          </AccentButton>
        }
      />

      <div className="py-2">
        <WeekCalendar
          startDate={anchor}
          hourStart={8}
          hourEnd={19}
          stepMinutes={30}
          locale="en-US"
          onPrevWeek={() => setAnchor(a => addDays(a, -7))}
          onNextWeek={() => setAnchor(a => addDays(a, +7))}
          events={events}
          onToggleAttend={handleToggleAttend}
        />
      </div>
    </Page>
  );
}