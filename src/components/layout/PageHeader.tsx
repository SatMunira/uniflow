// src/components/layout/PageHeader.tsx
import type { ReactNode } from "react";
import arrowLeft from "../../assets/arrow-left.svg";
import { Link } from "react-router-dom";

export function PageHeader({
  title,
  subtitle,
  actions,
  backButton,
  sticky = true,
  titleClassName = "font-mono h-tight", // ← ДЕФОЛТ: Anonymous Pro
  subtitleClassName = "",
}: {
  title: string;
  subtitle?: ReactNode;
  backButton?: string;
  actions?: ReactNode;
  sticky?: boolean;
  titleClassName?: string;
  subtitleClassName?: string;
}) {
  return (
    <header
      className={`${sticky ? "sticky top-0 bg-[#FEFFEF]/60 backdrop-blur" : ""} py-5`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex gap-4 items-center">
            {backButton ? (
            <Link to={backButton}>
              <img className="h-6" src={arrowLeft} />
            </Link>
          ) : null}
          <h1
            className={`text-2xl font-semibold tracking-tight ${titleClassName}`}
          >
            {title}
          </h1>
          </div>
          {subtitle ? (
            <div
              className={`mt-1 text-sm text-muted-foreground ${subtitleClassName}`}
            >
              {subtitle}
            </div>
          ) : null}
        </div>
        {actions ? <div className="shrink-0 w-1/2">{actions}</div> : null}
      </div>
    </header>
  );
}
