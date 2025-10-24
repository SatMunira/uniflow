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
import Modal from "@/components/ui/Modal/Modal";
import { InputField } from "@/components/ui/InputField/InputField";
import { X, Check } from "lucide-react";
import SubtleButton from "@/components/ui/SubtleButton/SubtleButton";

export default function TimetablePage() {
  const [anchor, setAnchor] = useState(new Date("2025-10-21"));
  const [viewCycle, setViewCycle] = useState<WeekCycle>("WEEKLY");

  const [occs, setOccs] = useState(() =>
    generateOccurrencesForWeekView(subjectsMock, anchor, viewCycle)
  );

  const [isNewOpen, setIsNewOpen] = useState(false);
  const [form, setForm] = useState({
    title: "",
    date: "2025-10-21",
    start: "10:00",
    end: "11:00",
  });

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

  const handleCreate = () => {
    setIsNewOpen(false);
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
          <AccentButton variant="outline" className="gap-2" onClick={() => setIsNewOpen(true)}>
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
      <Modal
        isOpen={isNewOpen}
        onClose={() => setIsNewOpen(false)}
        title="Add a new subject to the timetable"
        width="960px"
        height="460px"
        footerHeight="60px"
        headerBg="#B0A4E4"
        headerColor="#000"
        contentBg="#FEFFEF"
        footerBg="#FEFFEF"
        footer={
          <div className="contents"> {/* grid задаёт .footer */}
            {/* Left: Cancel */}
            <div>
              <SubtleButton
                variant="outline"
                onClick={() => setIsNewOpen(false)}
                className="
          inline-flex items-center justify-center gap-5
          rounded-full px-32 py-2 text-lg font-mono cancel-button
        "
              >
                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full border border-black/50">
                  <X className="w-8 h-6" />
                </span>
                Cancel
              </SubtleButton>
            </div>

            {/* Right: Save */}
            <div>
              <AccentButton
                onClick={handleCreate}
                className="
          inline-flex items-center justify-center gap-5
          rounded-full px-10 py-3 text-lg font-mono
        "
              >
                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full border border-white/70">
                  <Check className="w-8 h-6" />
                </span>
                Save
              </AccentButton>
            </div>
          </div>
        }


      >
        <div className="px-8 md:px-12 lg:px-16">
          <form
            className="grid gap-6 p-8 md:p-8 font-mono"
            onSubmit={(e) => {
              e.preventDefault();
              handleCreate();
            }}
          >
            {/* Title */}
            <InputField
              id="subject"
              label="Subject name"
              fieldSize="md"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: (e.target as HTMLInputElement).value })}
            />

            {/* 2 колонки — Start / End */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <InputField
                id="start"
                label="Starting time"
                fieldSize="md"
                type="time"
                value={form.start}
                onChange={(e) => setForm({ ...form, start: (e.target as HTMLInputElement).value })}
              />
              <InputField
                id="end"
                label="Ending time"
                fieldSize="md"
                type="time"
                value={form.end}
                onChange={(e) => setForm({ ...form, end: (e.target as HTMLInputElement).value })}

              />
            </div>

            {/* Ab/Bis KW — если нужны тоже как у тайтла */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                id="ab-kw"
                label="Ab KW"
                fieldSize="md"
                inputMode="numeric"
                pattern="[0-9]*"
              />
              <InputField
                id="bis-kw"
                label="Bis KW"
                fieldSize="md"
                inputMode="numeric"
                pattern="[0-9]*"
              />
            </div>

            <InputField
              id="zyklus"
              label="Zyklus"
              fieldSize="md"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: (e.target as HTMLInputElement).value })}
            />

            {/* Zyklus — временно как простой текст, позже сделаем такой же SelectField со всплывающим лейблом */}
            {/* <InputField id="zyklus" label="Zyklus" fieldSize="md" /> */}
          </form>
        </div>
      </Modal>

    </Page>
  );
}