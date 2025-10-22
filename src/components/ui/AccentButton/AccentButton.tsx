import type { ReactNode, ButtonHTMLAttributes } from "react";
import cls from "./AccentButton.module.scss";

type Variant = "solid" | "outline";

type Props = {
  children: ReactNode;
  className?: string;
  variant?: Variant;
} & Pick<ButtonHTMLAttributes<HTMLButtonElement>, "onClick" | "disabled" | "type" | "aria-label">;

export function AccentButton({
  children,
  className = "",
  variant = "solid",
  type = "button",
  ...rest
}: Props) {
  const classes = [cls.btn, cls[`btn--${variant}`], className].filter(Boolean).join(" ");
  return (
    <button type={type} className={classes} {...rest}>
      {children}
    </button>
  );
}
