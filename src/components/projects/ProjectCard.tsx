import { MemberAvatars } from "./MemberAvatars";
import type { Project } from "@/entities/projects";

export function ProjectCard({
  project,
  onClick,
}: { project: Project; onClick?: () => void }) {
  const gradient =
    project.gradient ?? "from-[#BCAAF3] via-[#9B6BFF] to-[#7C3AED]";

  return (
    <button onClick={onClick} className="text-left w-full">
    
      <div className="h-48 flex flex-col rounded-[18px] border-[1.5px] border-black bg-white shadow-[0_6px_18px_rgba(0,0,0,0.12)]">
        <div className={`h-28 rounded-t-[18px] bg-gradient-to-r ${gradient} px-6 pt-6 pb-2 flex items-center`}>
          <h3 className="text-black font-mono text-lg leading-tight">
            {project.title}
          </h3>
        </div>
        <div className="border-t-2 border-black" />

    
        <div className="h-12 flex items-center justify-end px-4">
          <MemberAvatars
            members={project.members}
            extraCount={project.extraCount}
          />
        </div>
      </div>
    </button>
  );
}
