import FolderIcon from "../../../assets/folder-icon.svg";
import { Link } from "react-router-dom";
import type { Subject } from "@/api/subjects";

export function FolderItem({ subject }: { subject : Subject }) {
  return (
    <Link to={"/library/"+subject.id} className="h-56 p-4 border border-black shadow-[0_4px_4px_rgba(0,0,0,0.25)] bg-white flex flex-col w-full items-center justify-center rounded-xl font-mono cursor-pointer hover:bg-gray-200 transition">
      <img className="h-2/5" src={FolderIcon} />
      <span className="h-1/4 font-semibold text-md tracking-tight text-center my-4">{subject.name}</span>
      <span className="text-sm">{subject._count.files} files</span>
    </Link>
  );
}
