import { useState } from "react";
import { Page } from "@/components/layout/Page";
import { PageHeader } from "@/components/layout/PageHeader";
import { Toolbar } from "@/components/layout/Toolbar";
import { WeekNav } from "@/pages/schedule/WeekNav";
import type { WeekCycle } from "@/entities/schedule";
import { AccentButton } from "@/components/ui/AccentButton/AccentButton";
import { Plus } from "lucide-react";
import { WeekCalendar } from "@/components/ui/Calender/WeekCalendar";
import { addDays } from "date-fns";

export default function TimetablePage() {
  const [anchor, setAnchor] = useState(new Date("2025-10-21"));
  const [viewCycle, setViewCycle] = useState<WeekCycle>("WEEKLY");

  return (
    <Page>
      <PageHeader title="Timetable" titleClassName="font-mono h-tight" />

      <Toolbar
        className="py-4"
        left={
          <WeekNav
            value={anchor}
            onChange={setAnchor}
            viewCycle={viewCycle}
            onChangeViewCycle={setViewCycle}
            showCycleChip
          />
        }
        right={
          <AccentButton
            variant="outline"
            className="gap-2"
            onClick={() => {
              console.log("Create new subject");
            }}
          >
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
          onSlotClick={(slot) => {
            console.log("Click slot:", slot.start, "→", slot.end);
            // тут позже откроешь модалку «создать запись»
          }}
        />
      </div>

    </Page>
  );
}
