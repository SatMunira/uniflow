import React from "react";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import ifCls from "@/components/ui/InputField/InputField.module.scss";

export function TimeField({
  id,
  label,
  value,
  onChange,
  stepMinutes = 5,
  startHour = 0,
  endHour = 23,
  className = "",
}: {
  id: string;
  label: string;
  value: string; // "HH:MM"
  onChange: (v: string) => void;
  stepMinutes?: number;
  startHour?: number;
  endHour?: number;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLLabelElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const popRef = useRef<HTMLDivElement>(null);

  const [pos, setPos] = useState<{ top: number; left: number; width: number }>({
    top: 0, left: 0, width: 260,
  });

  // списки
  const hours = useMemo(() => {
    const a: string[] = [];
    for (let h = startHour; h <= endHour; h++) a.push(String(h).padStart(2, "0"));
    return a;
  }, [startHour, endHour]);

  const minutes = useMemo(() => {
    const a: string[] = [];
    for (let m = 0; m < 60; m += stepMinutes) a.push(String(m).padStart(2, "0"));
    return a;
  }, [stepMinutes]);

  const [hStr, mStr] = (value || "00:00").split(":");
  const selH = hours.includes(hStr) ? hStr : hours[0];
  const selM = minutes.includes(mStr) ? mStr : minutes[0];

  // позиционирование портального поповера (fixed)
  const place = () => {
    const el = btnRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const gap = 8;
    const desiredWidth = Math.max(260, Math.min(320, r.width));
    let left = Math.round(r.left);
    // если не влезает вправо — сдвигаем влево
    const overflowRight = left + desiredWidth + 8 - window.innerWidth;
    if (overflowRight > 0) left = Math.max(8, left - overflowRight);
    setPos({
      top: Math.round(r.bottom + gap),
      left,
      width: desiredWidth,
    });
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
  }, [open]); // eslint-disable-line

  // закрытие по клику вне (учитываем портал) / ESC
  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      const t = e.target as Node;
      if (
        !wrapRef.current?.contains(t) &&
        !popRef.current?.contains(t)
      ) setOpen(false);
    };
    const onEsc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onEsc);
    };
  }, [open]);

  const apply = (h: string, m: string) => {
    onChange(`${h}:${m}`);
    setOpen(false);
  };

  const filled = Boolean(value);

  return (
    <label
      ref={wrapRef}
      htmlFor={id}
      className={[ifCls.field, filled && ifCls.filled, className].filter(Boolean).join(" ")}
    >
      <button
        id={id}
        ref={btnRef}
        type="button"
        className={ifCls.input}
        style={{ textAlign: "left" }}     // ← слева
        onClick={() => setOpen(v => !v)}
      >
        {value || "00:00"}
      </button>
      <span className={ifCls.label}>{label}</span>

      {open && createPortal(
        <Popover
          ref={popRef}
          pos={pos}
          hours={hours}
          minutes={minutes}
          selH={selH}
          selM={selM}
          onPick={apply}
        />,
        document.body
      )}
    </label>
  );
}

// -------- Popover ----------
const Popover = React.forwardRef<HTMLDivElement, {
  pos: { top: number; left: number; width: number };
  hours: string[];
  minutes: string[];
  selH: string;
  selM: string;
  onPick: (h: string, m: string) => void;
}>(({ pos, hours, minutes, selH, selM, onPick }, ref) => {
  const hListRef = useRef<HTMLDivElement>(null);
  const mListRef = useRef<HTMLDivElement>(null);

  // автоскролл к активным
  useEffect(() => {
    const scrollTo = (wrap: HTMLDivElement | null, items: string[], sel: string) => {
      if (!wrap) return;
      const idx = Math.max(0, items.indexOf(sel));
      const rowH = 36;
      wrap.scrollTop = Math.max(0, idx * rowH - rowH * 2);
    };
    scrollTo(hListRef.current, hours, selH);
    scrollTo(mListRef.current, minutes, selM);
  }, [hours, minutes, selH, selM]);

  return (
    <div
      ref={ref}
      role="dialog"
      style={{
        position: "fixed",
        top: pos.top,
        left: pos.left,
        width: Math.max(260, pos.width),
        zIndex: 999999,
        background: "#fff",
        border: "1px solid rgba(0,0,0,.15)",
        borderRadius: 12,
        boxShadow: "0 14px 32px rgba(0,0,0,.22)",
        padding: 8,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",     // ← верх по левому краю
          gap: 8,
          fontFamily: 'var(--font-mono, "Anonymous Pro", ui-monospace, monospace)',
        }}
        onMouseDown={(e) => e.preventDefault()} // чтобы клик не блурил кнопку
      >
        {/* Часы */}
        <div
          ref={hListRef}
          style={{
            maxHeight: 224,
            overflow: "auto",
            border: "1px solid rgba(0,0,0,.1)",
            borderRadius: 8,
            minWidth: 110,
          }}
        >
          {hours.map(h => {
            const active = h === selH;
            return (
              <button
                key={h}
                type="button"
                onClick={() => onPick(h, selM)}
                style={{
                  display: "block",
                  width: "100%",
                  textAlign: "left",
                  padding: "8px 12px",
                  lineHeight: "20px",
                  fontWeight: active ? 800 : 600,
                  background: active ? "#B0A4E4" : "transparent",
                  color: active ? "#fff" : "#000",
                }}
              >
                {h}
              </button>
            );
          })}
        </div>

        {/* Минуты */}
        <div
          ref={mListRef}
          style={{
            maxHeight: 224,
            overflow: "auto",
            border: "1px solid rgba(0,0,0,.1)",
            borderRadius: 8,
            minWidth: 110,
          }}
        >
          {minutes.map(m => {
            const active = m === selM;
            return (
              <button
                key={m}
                type="button"
                onClick={() => onPick(selH, m)}
                style={{
                  display: "block",
                  width: "100%",
                  textAlign: "left",
                  padding: "8px 12px",
                  lineHeight: "20px",
                  fontWeight: active ? 800 : 600,
                  background: active ? "#B0A4E4" : "transparent",
                  color: active ? "#fff" : "#000",
                }}
              >
                {m}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
});
