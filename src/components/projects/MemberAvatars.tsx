import { User } from "lucide-react";
import type { ProjectMember } from "@/entities/projects";

const COLORS = [
    "bg-violet-300",
    "bg-pink-300",
    "bg-sky-300",
    "bg-indigo-300",
    "bg-green-300",
];

const Z = ["z-60", "z-40", "z-30", "z-20", "z-10"];

export function MemberAvatars({
    members,
    extraCount = 0,
}: { members: ProjectMember[]; extraCount?: number }) {
    const visible = members.slice(0, 5);

    return (
        <div className="flex items-center">
            {visible.map((m, idx) => {
                const color = COLORS[idx % COLORS.length];
                const z = Z[idx] ?? "z-0";
                return (
                    <span
                        key={m.id}
                        className={`inline-flex items-center justify-center w-7 h-7 ${color} ${z}
    -ml-1 first:ml-0 last:mr-2  /* было -ml-3, добавили last:mr-2 */
    rounded-full ring-2 ring-white shadow`}
                        title={m.name}
                    >
                        <User className="w-4 h-4 text-black" />
                    </span>
                );
            })}
            {extraCount > 0 && (
                <span className="ml-1 text-base text-black/90">+{extraCount}</span>
            )}
        </div>
    );
}
