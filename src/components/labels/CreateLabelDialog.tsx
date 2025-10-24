import * as React from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  onCreate: (payload: { title: string; color: string }) => void;
  initial?: { title?: string; color?: string };
};

const COLORS = [
  "#CFFAE1","#F4EE9E","#F7E2A3","#FFD6D6","#EAD4FF",
  "#73E2B1","#EBD057","#FFA31A","#FF6B6B","#B083FF",
  "#0F8B6F","#9E7712","#C05A11","#E84E4E","#8E3ED9",
  "#BFD7FF","#D1F0FF","#CDEDBD","#FFD7EC","#D9DBDF",
  "#6EA5FF","#7EC7E4","#81C784","#EF8FBF","#7A7E87",
  "#1F64F2","#187AA2","#5A8A3A","#B14F8A","#595959",
];

export function CreateLabelDialog({ open, onClose, onCreate, initial }: Props) {
  const [title, setTitle] = React.useState(initial?.title ?? "");
  const [color, setColor] = React.useState(initial?.color ?? COLORS[0]);
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [open]);

  React.useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (!open) return;
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  function submit() {
    const t = title.trim();
    if (!t) return inputRef.current?.focus();
    onCreate({ title: t, color });
    onClose();
  }

  return (
    <div
      aria-modal="true"
      role="dialog"
      className="fixed inset-0 z-[100] flex items-center justify-center"
      onMouseDown={(e) => {
        // клик по фону — закрыть
        if (e.target === e.currentTarget) onClose();
      }}
    >

      <div className="absolute inset-0 bg-black/40" />


      <div className="relative w-[480px] max-w-[92vw] rounded-2xl bg-white shadow-xl">
    
        <div className="flex items-center justify-between px-5 py-4">
          <button
            onClick={onClose}
            aria-label="Back"
            className="text-2xl leading-none px-1 -ml-1"
          >
            ‹
          </button>
          <h2 className="font-mono text-2xl">Create label</h2>
          <button
            onClick={onClose}
            aria-label="Close"
            className="text-2xl leading-none px-1 -mr-1"
          >
            ×
          </button>
        </div>

        <div className="px-6 pb-6">

          <label className="block text-sm mb-2">Title</label>
          <input
            ref={inputRef}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder=""
            className="mb-6 w-full h-11 rounded-xl border border-black/20 px-3 outline-none focus:ring-2 focus:ring-black/20"
          />


          <div className="mb-3 text-sm">Select a color</div>
          <div className="grid grid-cols-5 gap-3">
            {COLORS.map((c) => {
              const selected = c === color;
              return (
                <button
                  key={c}
                  type="button"
                  onClick={() => setColor(c)}
                  aria-label={`color ${c}`}
                  className="h-10 rounded-lg border border-black/10"
                  style={{
                    backgroundColor: c,
                    boxShadow: selected ? "0 0 0 3px rgba(0,0,0,0.35) inset" : "none",
                  }}
                />
              );
            })}
          </div>

          <div className="mt-6 h-px bg-black/10" />

          <div className="flex items-center justify-end gap-3 px-1 pt-4">
            <button
              onClick={submit}
              className="rounded-xl bg-[#ff007a] px-5 py-2.5 text-white font-mono text-lg shadow hover:brightness-110"
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
