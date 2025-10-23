import DropdownMenu from "@/components/ui/DropdownMenu/DropdownMenu";
import fileIcon from "../../../assets/file-icon.svg";
import type { MaterialItem } from "@/entities/library";

interface FileTableRowProps {
  item: MaterialItem;
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
          <span>{item.name}</span>
        </div>
      </td>
      <td className="py-4 px-4">
        <div>{item.dateAdded}</div>
      </td>
      <td className="py-4 px-4">
        <div
          className="rounded-full text-white text-center w-full"
          style={{ backgroundColor: item.tag.color }}
        >
          {item.tag.name}
        </div>
      </td>
      <td className="py-4 px-4">
        <DropdownMenu
          items={[
            {
              label: "Download",
              onClick: () => onDownload(item.name),
            },
            {
              label: "Preview",
              onClick: () => onPreview(item.name),
            },
            {
              label: "Delete",
              labelColor: "#EB171A",
              onClick: () => onDelete(item.name),
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
