import { useState, useMemo, useEffect } from "react";
import { Page } from "@/components/layout/Page";
import { PageHeader } from "@/components/layout/PageHeader";
import { Toolbar } from "@/components/layout/Toolbar";
import { WeekNav } from "@/pages/schedule/WeekNav";
import type { WeekCycle } from "@/entities/schedule";
import { AccentButton } from "@/components/ui/AccentButton/AccentButton";
import { Plus, TextAlignStart, Upload } from "lucide-react";
import { WeekCalendar } from "@/components/ui/Calender/WeekCalendar";
import { addDays } from "date-fns";
import { generateOccurrencesForWeekView } from "@/data/schedule/generateWeek";
import type { CalendarEvent } from "@/components/ui/Calender/WeekCalendar";
import { toggleAttended } from "@/data/schedule/generateWeek";
import Modal from "@/components/ui/Modal/Modal";
import { InputField } from "@/components/ui/InputField/InputField";
import { X, Check, FolderOpen } from "lucide-react";
import SubtleButton from "@/components/ui/SubtleButton/SubtleButton";
import { TimeField } from "@/components/ui/TimeField/TimeField";
import SelectField from "@/components/ui/SelectField/SelectField";
import DropdownMenu from "@/components/ui/DropdownMenu/DropdownMenu";
import { useSubjectsWithSchedules } from "@/hooks/useSubjects";
import type { Subject } from "@/entities/schedule";
import { ImportScheduleModal } from "@/components/schedule/ImportScheduleModal";

export default function TimetablePage() {
  const [anchor, setAnchor] = useState(new Date("2025-10-21"));
  const [viewCycle, setViewCycle] = useState<WeekCycle>("WEEKLY");

  const { subjects, loading, error } = useSubjectsWithSchedules(anchor);

  const colorOf = new Map<string, string>(
    subjects.map((s: Subject) => [s.id, s.color ?? "#7c3aed"])
  );

  const [occs, setOccs] = useState(() =>
    generateOccurrencesForWeekView(subjects, anchor, viewCycle)
  );
  useEffect(() => {
    const next = generateOccurrencesForWeekView(subjects, anchor, viewCycle);
    setOccs(next);
  }, [subjects, anchor, viewCycle]);
  const [isNewOpen, setIsNewOpen] = useState(false);
  const [isImportOpen, setIsImportOpen] = useState(false);

  const [eventModalOpen, setEventModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);

  const [form, setForm] = useState({
    title: "",
    date: "2025-10-21",
    start: "10:00",
    end: "11:00",
    zyklus: "Z1",
  });

  const events: CalendarEvent[] = useMemo(() => {
    const fresh = generateOccurrencesForWeekView(subjects, anchor, viewCycle);

    const attendedById = new Map<string, boolean>(
      occs.map((o) => [o.id, !!o.attended])   // явный boolean
    );

    return fresh.map((o) => ({
      id: o.id,
      title: o.title,
      start: o.start,
      end: o.end,
      attended: attendedById.get(o.id) ?? false,
      color: colorOf.get(o.subjectId) ?? "#7c3aed",  // строка, не {}
    }));
  }, [subjects, anchor, viewCycle, occs]);


  { loading && <div className="px-4 py-2 font-mono text-sm">Loading…</div> }
  { error && <div className="px-4 py-2 font-mono text-sm text-red-600">{error}</div> }

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

  const [desc, setDesc] = useState("");
  const [attachments, setAttachments] = useState<UIAttachment[]>([
    {
      id: "a1",
      kind: "PDF",
      name: "Wissenshaft.pdf",
      addedAgo: "12 minutes ago",
      downloadUrl: "/api/files/a1/download",
    },
  ]);

  type UIAttachment = {
    id: string;
    kind: "PDF" | "IMG" | "DOC" | "OTHER";
    name: string;
    addedAgo: string;
    downloadUrl?: string;
  };

  const handleAttachmentDownload = (att: UIAttachment) => {
    const a = document.createElement("a");
    a.href = att.downloadUrl || "#";
    a.download = att.name;
    a.rel = "noopener";
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  const handleAttachmentDelete = (attId: string) => {
    setAttachments(prev => prev.filter(a => a.id !== attId));
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
          <div className="flex items-center gap-3">
            <AccentButton variant="outline" className="gap-2" onClick={() => setIsImportOpen(true)}>
              <Upload className="size-4" />
              Import
            </AccentButton>
            <AccentButton variant="outline" className="gap-2" onClick={() => setIsNewOpen(true)}>
              <Plus className="size-4" />
              New
            </AccentButton>
          </div>
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
          onEventClick={(ev) => {
            setSelectedEvent(ev);
            setEventModalOpen(true);
          }}
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
          <div className="contents">
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
            <InputField
              id="subject"
              label="Subject name"
              fieldSize="md"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: (e.target as HTMLInputElement).value })}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <TimeField
                id="start"
                label="Starting time"
                value={form.start}
                stepMinutes={5}
                onChange={(v) => setForm({ ...form, start: v })}
              />
              <TimeField
                id="end"
                label="Ending time"
                value={form.end}
                stepMinutes={5}
                onChange={(v) => setForm({ ...form, end: v })}
              />
            </div>

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

            <SelectField
              id="zyklus"
              label="Zyklus"
              value={form.zyklus}
              options={["Z1", "Z2", "Z3"]}
              onChange={(v) => setForm({ ...form, zyklus: v })}
            />
          </form>
        </div>
      </Modal>
      <Modal
        isOpen={eventModalOpen}
        onClose={() => setEventModalOpen(false)}
        title={selectedEvent ? selectedEvent.title : "Subject"}
        width="960px"
        height="560px"
        footerHeight="0px"
        headerBg="#B0A4E4"
        headerColor="#000"
        contentBg="#FEFFEF"
        footer={undefined}
      >
        <div className="px-6 md:px-10 lg:px-12 py-6 font-mono text-black">
          {/* ===== Description ===== */}
          <section className="space-y-3 font-mono">
            <div className="flex items-center gap-4 my-4">
              <TextAlignStart className="size-5" />
              <h3 className="text-m font-normal">Description</h3>
            </div>

            <textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="Add a more detailed description..."
              className="
        w-full min-h-[160px]
        rounded-[10px] border border-black/50
        px-4 py-3 text-base leading-relaxed
        placeholder:text-black/30
        bg-white
      "
            />

            <div className="flex items-center gap-3 pt-1">
              <AccentButton
                type="button"
                onClick={() => {/* TODO: save desc */ }}
                className="px-4 py-2 rounded-lg font-semibold bg-[#FF4E8A] text-white w-24 justify-center"
              >
                Save
              </AccentButton>
              <SubtleButton
                type="button"
                onClick={() => setDesc("")}
                className="px-4 py-2 rounded-lg font-semibold bg-black/10 text-black w-24 justify-center"
              >
                Cancel
              </SubtleButton>
            </div>
          </section>

          {/* ===== Attachments ===== */}
          <section className="mt-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FolderOpen className="size-5" />
                <h3 className="text-m font-normal">Attachements</h3>
              </div>

              <button
                type="button"
                onClick={() => {/* TODO: open file picker */ }}
                className="px-5 py-1 rounded-lg font-normal text-white bg-[#B0A4E4] w-20 justify-center"
              >
                Add
              </button>
            </div>

            <div className="mt-6 space-y-6">
              {attachments.map((att) => (
                <div key={att.id} className="grid grid-cols-[88px_1fr_auto] items-center gap-8">
                  <div
                    className="inline-grid place-items-center w-[88px] h-[44px]
                     rounded-lg border border-[#BABABA] bg-[#E9EADA]
                     text-sm font-extrabold"
                  >
                    {att.kind}
                  </div>

                  <div className="min-w-0">
                    <div className="font-semibold font-mono text-sm truncate">
                      {att.name}
                    </div>
                    <div className="text-black/50 font-mono font-semibold text-xs mt-1">
                      added {att.addedAgo}
                    </div>
                  </div>

                  <DropdownMenu
                    items={[
                      {
                        label: "Download",
                        onClick: () => handleAttachmentDownload(att),
                      },
                      {
                        label: "Delete",
                        labelColor: "#EB171A",
                        onClick: () => handleAttachmentDelete(att.id),
                      },
                    ]}
                    trigger={
                      <div className="w-10 py-2 bg-[#F4F4F4] rounded-2xl flex flex-row justify-center items-center border border-gray-400 gap-[2px] hover:bg-gray-200">
                        <span className="w-1 h-1 bg-black rounded-full"></span>
                        <span className="w-1 h-1 bg-black rounded-full"></span>
                        <span className="w-1 h-1 bg-black rounded-full"></span>
                      </div>
                    }
                  />
                </div>
              ))}
            </div>
          </section>

        </div>

      </Modal>

      {/* Import Schedule Modal */}
      <ImportScheduleModal
        isOpen={isImportOpen}
        onClose={() => setIsImportOpen(false)}
        onSuccess={() => {
          // Reload subjects to get new schedules
          window.location.reload();
        }}
      />
    </Page>
  );
}