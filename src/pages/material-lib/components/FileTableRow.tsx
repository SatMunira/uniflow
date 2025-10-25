import DropdownMenu from "@/components/ui/DropdownMenu/DropdownMenu";
import fileIcon from "../../../assets/file-icon.svg";
import type { FileItem } from "@/api/files";

interface FileTableRowProps {
  item: FileItem;
  onDownload: (fileName: string) => void;
  onPreview: (fileName: string) => void;
  onDelete: (fileName: string) => void;
}

export default function FileTableRow({
  item,
  onDownload,
  onPreview,
  onDelete,
}: FileTableRowProps) {
  return (
    <tr>
      <td className="py-4 px-4">
        <div className="flex flex-row items-center gap-4">
          <img src={fileIcon} className="h-8" alt="file icon" />
          <span>{item.fileName}</span>
        </div>
      </td>
      <td className="py-4 px-4">
        <div>{item.dateCreated}</div>
      </td>
      <td className="py-4 px-4 flex gap-2">
        {item.labels &&
          item.labels.map((label) => (
            <div
              key={label.id}
              className="rounded-full text-white text-center w-auto px-2 py-[3px]"
              style={{ backgroundColor: label.color }}
            >
              {label.name}
            </div>
          ))}
      </td>
      <td className="py-4 px-4">
        <DropdownMenu
          items={[
            {
              label: "Download",
              onClick: () => onDownload(item.fileName),
            },
            {
              label: "Preview",
              onClick: () => onPreview(item.fileName),
            },
            {
              label: "Delete",
              labelColor: "#EB171A",
              onClick: () => onDelete(item.fileName),
            },
          ]}
          trigger={
            <div className="w-10 py-2 bg-[#F4F4F4] rounded-2xl flex flex-row justify-center items-center border border-gray-400 gap-[2px] hover:bg-gray-200">
              <span className="w-1 h-1 bg-black rounded-full"></span>
              <span className="w-1 h-1 bg-black rounded-full"></span>
              <span className="w-1 h-1 bg-black rounded-full"></span>
            </div>
          }
        />
      </td>
    </tr>
  );
}
