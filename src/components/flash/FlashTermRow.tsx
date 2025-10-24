import type { FlashTerm } from "@/mocks/flashTerms";
import { Trash2 } from "lucide-react";

export function FlashTermRow({
    term,
    showBack,
    onDelete,
}: {
    term: FlashTerm;
    showBack: boolean;
    onDelete?: (id: string) => void;
}) {
    return (
        <div
            className="
        relative rounded-xl border border-black/15 bg-white
        shadow-[0_6px_14px_rgba(0,0,0,0.12)]
      "
        >
            <div className="grid grid-cols-2">
                <div className="p-3 md:p-4 border-r border-black/10 text-[13px] leading-snug font-mono text-black/90">
                    {term.front}
                </div>
                <div className="p-3 md:p-4 text-[13px] leading-snug font-mono text-black/90">
                    {showBack ? term.back : <span className="opacity-50">••• hidden</span>}
                </div>
            </div>

            <button
                aria-label="Delete term"
                onClick={() => onDelete?.(term.id)}
                className="
          absolute right-3 top-1/2 -translate-y-1/2
          text-rose-500 hover:text-rose-600
        "
            >
                <Trash2 className="h-5 w-5" strokeWidth={2.2} />
            </button>
        </div>
    );
}