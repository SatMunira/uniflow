import FileTableRow from "./FileTableRow";
import type { FileItem } from "@/api/files";

interface FileTableProps {
  items: FileItem[];
  onDownload: (fileName: string) => void;
  onPreview: (fileName: string) => void;
  onDelete: (fileName: string) => void;
}

const TABLE_HEADERS = ["Name", "Date added", "Tags", "Actions"];

export default function FileTable({
  items,
  onDownload,
  onPreview,
  onDelete,
}: FileTableProps) {
  return (
    <div className="bg-white w-full border border-black p-10 rounded-md flex-1 flex flex-col min-h-0 mb-4">
      <div className="flex-1 overflow-auto">
        <table className="w-full table-auto text-left font-mono">
          <thead className="text-[#6D6D6D] text-md sticky top-0 bg-white">
            <tr>
              {TABLE_HEADERS.map((header) => (
                <th key={header} className="py-4 px-4">
                  <div>{header}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-sm font-semibold">
            {items.map((item) => (
              <FileTableRow
                key={item.id}
                item={item}
                onDownload={onDownload}
                onPreview={onPreview}
                onDelete={onDelete}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
