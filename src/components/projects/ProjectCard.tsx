import { MemberAvatars } from "./MemberAvatars";
import type { Project } from "@/entities/projects";
import * as React from "react";

type Props = {
  project: Project;
  onClick?: () => void; // ты сюда передаёшь navigate(`/projects/${id}`)
};

export function ProjectCard({ project, onClick }: Props) {
  const gradient = project.gradient ?? "from-[#BCAAF3] via-[#9B6BFF] to-[#7C3AED]";

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`Open "${project.title}" board`}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick?.();
        }
      }}
      className="text-left w-full cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-black/40 rounded-[18px]"
    >
      <div className="h-48 flex flex-col rounded-[18px] border-[1.5px] border-black bg-white shadow-[0_6px_18px_rgba(0,0,0,0.12)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.15)] transition-shadow">
        {/* Фиолетовая шапка с текстом */}
        <div className={`h-28 rounded-t-[18px] bg-gradient-to-r ${gradient} px-6 pt-6 pb-2 flex items-center`}>
          <h3 className="select-text text-black font-mono text-lg leading-tight">
            {project.title}
          </h3>
        </div>

        {/* Тонкая линия-разделитель */}
        <div className="border-t-[1.5px] border-black" />

        {/* Нижняя белая часть с аватарками справа */}
        <div className="h-12 flex items-center justify-end px-4">
          <MemberAvatars
            members={project.members}
            extraCount={project.extraCount}
          />
        </div>
      </div>
    </div>
  );
}
