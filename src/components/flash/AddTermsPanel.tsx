import * as React from "react";
import { Trash2 } from "lucide-react";

export type Draft = { id: string; front: string; back: string };

type AddTermsPanelProps = {
  open: boolean;
  onClose: () => void;
  onSave?: (items: Array<{ front: string; back: string }>) => void;
};

export function AddTermsPanel({ open, onClose, onSave }: AddTermsPanelProps) {
  const [drafts, setDrafts] = React.useState<Draft[]>([]);

  React.useEffect(() => {
    if (!open) return;
    // стартуем с одной строкой
    setDrafts([{ id: crypto.randomUUID().slice(0, 6), front: "", back: "" }]);
  }, [open]);

  if (!open) return null;

  function addRow() {
    setDrafts((d) => [...d, { id: crypto.randomUUID().slice(0, 6), front: "", back: "" }]);
  }

  function removeRow(id: string) {
    setDrafts((d) => d.filter((x) => x.id !== id));
  }

  function patchRow(id: string, patch: Partial<Draft>) {
    setDrafts((d) => d.map((x) => (x.id === id ? { ...x, ...patch } : x)));
  }

  function save() {
    const ready = drafts
      .map((d) => ({ front: d.front.trim(), back: d.back.trim() }))
      .filter((d) => d.front && d.back);

    if (ready.length && onSave) onSave(ready);
    onClose();
  }

  return (
    <div className="mt-6 space-y-4">
      {drafts.map((d, idx) => (
        <div
          key={d.id}
          className="
            relative rounded-xl border border-black/15 bg-white p-5
            shadow-[0_6px_14px_rgba(0,0,0,0.12)]
          "
        >
          {/* номер слева сверху */}
          <div className="mb-3 font-mono text-lg">{idx + 1}</div>

          {/* два поля рядом */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <input
                value={d.front}
                onChange={(e) => patchRow(d.id, { front: e.target.value })}
                className="h-11 w-full rounded-lg bg-neutral-100 px-3 font-mono outline-none focus:ring-2 focus:ring-black/10"
              />
              <div className="mt-1 text-xs font-mono text-black/60">Term</div>
            </div>
            <div>
              <input
                value={d.back}
                onChange={(e) => patchRow(d.id, { back: e.target.value })}
                className="h-11 w-full rounded-lg bg-neutral-100 px-3 font-mono outline-none focus:ring-2 focus:ring-black/10"
              />
              <div className="mt-1 text-xs font-mono text-black/60">Definition</div>
            </div>
          </div>

          {/* красная корзина */}
          <button
            onClick={() => removeRow(d.id)}
            className="absolute right-4 top-4 text-rose-500 hover:text-rose-600"
            aria-label="Delete draft"
            title="Delete"
          >
            <Trash2 className="h-5 w-5" strokeWidth={2.2} />
          </button>
        </div>
      ))}

      {/* нижняя панель кнопок */}
      <div className="flex items-center justify-between">
        <button
          onClick={addRow}
          className="rounded-full border border-black px-6 py-2 font-mono shadow-sm hover:bg-black/5"
        >
          Add card
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="rounded-full border border-black/20 bg-white px-6 py-2 font-mono hover:bg-black/5"
          >
            Cancel
          </button>
          <button
            onClick={save}
            className="rounded-full bg-[#a78bfa] px-6 py-2 font-mono text-white shadow hover:brightness-105"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
