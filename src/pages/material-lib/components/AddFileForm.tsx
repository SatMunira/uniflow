import { useState } from "react";
import type { FloatingButtonItem } from "@/components/ui/FloatingButton/FloatingButton";
import FileUploadInput from "./FileUploadInput";
import LabelsInput from "./LabelsInput";
import CreateButton from "./CreateButton";

export function useAddFileForm() {
  const [fileName, setFileName] = useState("Hui.jpg");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  const formItems: FloatingButtonItem[] = [
    {
      label: "Add File",
      input: <FileUploadInput fileName={fileName} onFileChange={handleFileChange} />,
    },
    {
      label: "Labels",
      input: <LabelsInput />,
    },
    {
      label: "create button",
      input: <CreateButton />,
    },
  ];

  return { formItems };
}
