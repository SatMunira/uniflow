import { Upload } from "lucide-react";

interface FileUploadInputProps {
  fileName: string;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function FileUploadInput({
  fileName,
  onFileChange,
}: FileUploadInputProps) {
  return (
    <div className="w-full flex border border-black rounded-md overflow-hidden font-mono">
      <input
        type="text"
        value={fileName}
        readOnly
        className="px-3 py-2 text-sm outline-none w-3/5"
        placeholder="No file chosen"
      />
      <label className="w-2/5 bg-black text-white cursor-pointer hover:bg-gray-800 transition flex items-center justify-center gap-[3px]">
        <Upload size={16} strokeWidth={3} />
        <span className="text-xs">Choose a file</span>
        <input type="file" onChange={onFileChange} className="hidden" />
      </label>
    </div>
  );
}
