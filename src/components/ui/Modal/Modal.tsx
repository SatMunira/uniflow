import React, { useEffect, useRef } from "react";
import cls from "./Modal.module.scss";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: React.ReactNode;

  width?: string;  
  height?: string;  

  headerBg?: string;
  headerColor?: string;
  contentBg?: string;
  footerBg?: string;
  footerHeight?: string;
 
  children?: React.ReactNode;
  footer?: React.ReactNode;

  disableBackdropClose?: boolean;
};

export function Modal({
  isOpen,
  onClose,
  title,
  width = "1728px",
  height = "1117px",
  headerBg = "#B0A4E4",
  headerColor = "#000",
  contentBg = "#FEFFEF",
  footerBg = "#FEFFEF",
  footerHeight = "93px",
  children,
  footer,
  disableBackdropClose = false,
}: ModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const styleVars: React.CSSProperties = {
    // размеры
    ["--modal-w" as any]: width,
    ["--modal-h" as any]: height,
    ["--footer-h" as any]: footerHeight,
    // цвета
    ["--hdr-bg" as any]: headerBg,
    ["--hdr-color" as any]: headerColor,
    ["--content-bg" as any]: contentBg,
    ["--ftr-bg" as any]: footerBg,
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (disableBackdropClose) return;
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div className={cls.backdrop} onMouseDown={handleBackdropClick} aria-hidden>
      <div
        className={cls.modal}
        role="dialog"
        aria-modal="true"
        aria-label={typeof title === "string" ? title : undefined}
        style={styleVars}
        ref={dialogRef}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <header className={cls.header}>
          <div className={cls.title}>
            {title}
          </div>
        </header>

        <div className={cls.body}>
          {children}
        </div>

        <footer className={cls.footer}>
          {footer}
        </footer>
      </div>
    </div>
  );
}

export default Modal;