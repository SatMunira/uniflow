import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import ifCls from "@/components/ui/InputField/InputField.module.scss";

type Option = { value: string; label?: string } | string;

export default function SelectField({
  id,
  label,
  value,
  options,
  onChange,
  className = "",
}: {
  id: string;
  label: string;
  value: string;
  options: Option[];
  onChange: (v: string) => void;
  className?: string;
}) {
  const wrapRef = useRef<HTMLLabelElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const popRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState<{ top: number; left: number; width: number }>({ top: 0, left: 0, width: 260 });

  const norm = (o: Option) => (typeof o === "string" ? { value: o, label: o } : { value: o.value, label: o.label ?? o.value });
  const items = options.map(norm);

  const place = () => {
    const el = btnRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const gap = 8;
    const desiredWidth = Math.max(220, r.width); 
    let left = Math.round(r.left);
    const overflowRight = left + desiredWidth + 8 - window.innerWidth;
    if (overflowRight > 0) left = Math.max(8, left - overflowRight);
    setPos({ top: Math.round(r.bottom + gap), left, width: desiredWidth });
  };

  useLayoutEffect(() => { if (open) place(); }, [open]);
  useEffect(() => {
    if (!open) return;
    const onScroll = () => place();
    const onResize = () => place();
    window.addEventListener("scroll", onScroll, true);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll, true);
      window.removeEventListener("resize", onResize);
    };
  }, [open]); 

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      const t = e.target as Node;
      if (!wrapRef.current?.contains(t) && !popRef.current?.contains(t)) setOpen(false);
    };
    const onEsc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onEsc);
    };
  }, [open]);

  const filled = Boolean(value);

  return (
    <label ref={wrapRef} htmlFor={id} className={[ifCls.field, filled && ifCls.filled, className].filter(Boolean).join(" ")}>
      <button
        id={id}
        ref={btnRef}
        type="button"
        className={ifCls.input}
        style={{ textAlign: "left" }}
        onClick={() => setOpen(v => !v)}
      >
        {items.find(i => i.value === value)?.label ?? "—"}
      </button>
      <span className={ifCls.label}>{label}</span>

      {open &&
        createPortal(
          <div
            ref={popRef}
            role="listbox"
            style={{
              position: "fixed",
              top: pos.top,
              left: pos.left,
              width: pos.width,
              zIndex: 999999,
              background: "#fff",
              border: "1px solid rgba(0,0,0,.15)",
              borderRadius: 12,
              boxShadow: "0 14px 32px rgba(0,0,0,.22)",
              padding: 6,
              maxHeight: 260,
              overflow: "auto",
              fontFamily: 'var(--font-mono, "Anonymous Pro", ui-monospace, monospace)',
            }}
          >
            {items.map((opt) => {
              const active = opt.value === value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  role="option"
                  aria-selected={active}
                  onClick={() => { onChange(opt.value); setOpen(false); }}
                  style={{
                    display: "block",
                    width: "100%",
                    textAlign: "left",
                    padding: "10px 12px",
                    borderRadius: 8,
                    fontWeight: active ? 800 : 600,
                    background: active ? "#B0A4E4" : "transparent",
                    color: active ? "#fff" : "#000",
                  }}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>,
          document.body
        )}
    </label>
  );
}
