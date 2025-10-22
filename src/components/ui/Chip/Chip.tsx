import type { ReactNode } from "react";
import cls from "./Chip.module.scss";

export function Chip({
  children,
  onClick,
  active = false,
  muted = false,
  className = "",
}: {
  children: ReactNode;
  onClick?: () => void;
  active?: boolean;
  muted?: boolean;
  className?: string;
}) {
  const classes = [
    cls.chip,
    active && cls["chip--active"],
    muted && cls["chip--muted"],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button type="button" onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
