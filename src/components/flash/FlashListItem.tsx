import { Link } from "react-router-dom";
import type { FlashSet } from "@/mocks/flashSet";

export function FlashListItem({ set }: { set: FlashSet }) {
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
                    <span>{set.termsCount} terms</span>
                    <span className="opacity-50">|</span>
                    <span className="inline-flex items-center gap-2">
                        <span className="inline-flex size-4 items-center justify-center rounded-full bg-pink-200 border border-black/10" />
                        {set.author.username}
                    </span>
                </div>

                <div className="text-xl font-mono">{set.title}</div>
            </div>

            <div className="absolute right-2 top-1/2 -translate-y-1/2">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-violet-700 text-white text-sm font-bold border-2 border-black/20 shadow">
                    {set.author.initial}
                </span>
            </div>
        </Link>
    );
}
