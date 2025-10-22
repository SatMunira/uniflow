import { useState } from "react";
import { Page } from "@/components/layout/Page"; 
import { PageHeader } from "@/components/layout/PageHeader";
import { Toolbar } from "@/components/layout/Toolbar";
import { WeekNav } from "@/pages/schedule/WeekNav";
import type { WeekCycle } from "@/entities/schedule";
import { AccentButton } from "@/components/ui/AccentButton/AccentButton";
import { Plus } from "lucide-react";

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

    </Page>
  );
}
