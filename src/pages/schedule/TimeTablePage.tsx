// src/pages/timetable/TimetablePage.tsx
import { useState } from "react";
import { Page } from "@/components/layout/Page";
import { PageHeader } from "@/components/layout/PageHeader";
import { Toolbar } from "@/components/layout/Toolbar";
import { EmptyState } from "@/components/common/EmptyState";
import { Button } from "@/components/ui/Button";
import { Calendar, Rows3 } from "lucide-react";
import { CycleSelect } from "@/components/timetable/CycleSelect";
import type { WeekCycle } from "@/entities/schedule";
import { WeekNav } from "@/components/timetable/WeekNav";

export default function TimetablePage() {

  const [anchor, setAnchor] = useState(new Date("2025-10-21"));
  const [cycle, setCycle] = useState<WeekCycle>("A");

  return (
    <Page>
      <PageHeader title="Timetable" titleClassName="font-mono h-tight"/>

      <Toolbar
        className="py-4"
        left={<WeekNav value={anchor} onChange={setAnchor} cycle={cycle} />}
        right={
          <>
            <CycleSelect value={cycle} onChange={setCycle} />
            <Button variant="outline" className="gap-2">
              <Rows3 className="size-4" />
              Grid density
            </Button>
          </>
        }
      />

      {/* Пока пустая сетка → отдаём EmptyState.
          ТУТ потом вставишь саму timetable-сетку. */}
      <div className="py-8">
        <EmptyState
          title="Сетка расписания скоро тут"
          description="Добавим колонки Mon–Sun, тайм-слоты, текущую линию времени и бейджи attended."
          actions={<Button>Add subject</Button>}
          icon={<Calendar className="size-10 opacity-70" />}
        />
      </div>
    </Page>
  );
}
