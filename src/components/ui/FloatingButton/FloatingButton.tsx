import { useState, useRef, useEffect, type ReactNode } from "react";
import { createPortal } from "react-dom";

export interface FloatingButtonItem {
  label: string;
  icon?: ReactNode;
  onClick?: () => void;
  input?: ReactNode;
}

interface FloatingButtonProps {
  items: FloatingButtonItem[];
  title: string;
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left";
}

export default function FloatingButton({
  items,
  title,
  position = "bottom-right",
}: FloatingButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && buttonRef.current && dropdownRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const dropdownWidth = 380;
      const gap = 16; // gap between button and dropdown

      const top = rect.top - gap;
      const left = position.includes("right")
        ? rect.right - dropdownWidth
        : rect.left;

      setDropdownPosition({ top, left });
    }
  }, [isOpen, items.length, position]);

  const getPositionClasses = () => {
    const positions = {
      "bottom-right": "bottom-16 right-24",
      "bottom-left": "bottom-6 left-6",
      "top-right": "top-6 right-6",
      "top-left": "top-6 left-6",
    };
    return positions[position];
  };

  return (
    <>
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed ${getPositionClasses()} w-14 h-14 bg-accent text-white rounded-full shadow-lg hover:bg-gray-800 transition-all duration-300 flex items-center justify-center z-50 ${
          isOpen ? "rotate-45" : ""
        }`}
        aria-label="Toggle menu"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 5V19M5 12H19"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {isOpen &&
        createPortal(
          <div
            ref={dropdownRef}
            className="fixed w-96 bg-white border px-2 py-3 border-gray-300 rounded-lg shadow-xl z-[9999] overflow-hidden"
            style={{
              top: `${dropdownPosition.top}px`,
              left: `${dropdownPosition.left}px`,
              transform: "translateY(-100%)",
            }}
          >
            <div className="font-mono text-center font-extralight">{title}</div>

            {items.map((item, index) => (
              <div
                key={index}
                className=""
              >
                {item.input ? (
                  <div className="p-2">{item.input}</div>
                ) : (
                  <button
                    onClick={() => {
                      item.onClick?.();
                      setIsOpen(false);
                    }}
                    className="w-full text-left px-4 py-3 hover:bg-gray-100 transition-colors flex items-center gap-3"
                  >
                    {item.icon && (
                      <span className="flex-shrink-0">{item.icon}</span>
                    )}
                    <span className="font-medium">{item.label}</span>
                  </button>
                )}
              </div>
            ))}
          </div>,
          document.body
        )}
    </>
  );
}
