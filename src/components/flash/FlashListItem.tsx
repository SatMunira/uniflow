import { Link } from "react-router-dom";
import type { SubjectWithFlashcards } from "@/api/subjectWithFlashcards";

export function FlashListItem({ set }: { set: SubjectWithFlashcards }) {




    return (
        <Link
            to={`/flash/${set.id}`}
            className="group relative block rounded-lg border border-black/10 bg-white shadow-sm hover:shadow-md transition-shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-black/15"
        >
            {/* розовая линия показывается на hover и focus */}
            <div
                className="pointer-events-none absolute left-0 right-0 -bottom-[2px] h-[4px]
             bg-[#ff007a] rounded-full opacity-0 transition-opacity
             group-hover:opacity-100 group-focus-visible:opacity-100"
            />
            <div className="px-5 py-4">
                <div className="mb-2 flex items-center gap-3 text-xs text-black/70 font-mono">
                    <span>{set._count.flashcards} terms</span>
                    <span className="opacity-50">|</span>
                    <span className="inline-flex items-center gap-2">
                        <span className="inline-flex size-4 items-center justify-center rounded-full bg-pink-200 border border-black/10" />
                        {set.code}
                    </span>
                </div>

                <div className="text-xl font-mono">{set.name}</div>
            </div>

            
        </Link>
    );
}
