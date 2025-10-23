import type { Folder } from "@/entities/library";
import FolderIcon from "../../../assets/folder-icon.svg";
import { Link } from "react-router-dom";

export function FolderItem({ folder }: { folder : Folder }) {
  return (
    <Link to={"/library/"+folder.name} className="h-56 p-4 border border-black shadow-[0_4px_4px_rgba(0,0,0,0.25)] bg-white flex flex-col w-full items-center justify-center rounded-xl font-mono cursor-pointer hover:bg-gray-200 transition">
      <img className="h-2/5" src={FolderIcon} />
      <span className="h-1/4 font-semibold text-md tracking-tight text-center my-4">{folder.name}</span>
      <span className="text-sm">{folder.filesCount} files</span>
    </Link>
  );
}
