import { Plus, Tag } from "lucide-react";

export default function LabelsInput() {
  return (
    <div className="flex items-center gap-2">
      <button className="flex items-center gap-2 px-3 py-2 border border-black rounded-md hover:bg-gray-50 transition">
        <Tag size={16} strokeWidth={2} />
        <span className="text-sm font-mono">Labels</span>
      </button>
      <button className="h-[40px] w-[40px] rounded-md bg-gray-200 hover:bg-gray-300 transition flex items-center justify-center">
        <Plus size={16} className="text-gray-600" />
      </button>
    </div>
  );
}
