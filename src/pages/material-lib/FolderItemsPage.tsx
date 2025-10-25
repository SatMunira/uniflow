import { Page } from "@/components/layout/Page";
import { PageHeader } from "@/components/layout/PageHeader";
import SearchBar from "@/components/ui/SearchBar/SearchBar";
import FloatingButton from "@/components/ui/FloatingButton/FloatingButton";
import FileTable from "./components/FileTable";
import { useAddFileForm } from "./components/AddFileForm";
import { useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { getFilesBySubjectId, type FileItem } from "@/api/files";

export default function FolderItemsPage() {
  const { folderName } = useParams<{ folderName: string }>();

  const [files, setFiles] = useState<FileItem[]>([]);

  useEffect(() => {
    const fetchFiles = async () => {
      if (folderName) {
        try {
          const data = await getFilesBySubjectId(folderName);
          setFiles(data);
        } catch (err) {
          console.error(err);
        }
      }
    };

    fetchFiles();
  }, [folderName]);

  const { formItems } = useAddFileForm();

  const handleDownload = useCallback((fileName: string) => {
    console.log("Download:", fileName);
    // TODO: Implement download logic
  }, []);

  const handlePreview = useCallback((fileName: string) => {
    console.log("Preview:", fileName);
    // TODO: Implement preview logic
  }, []);

  const handleDelete = useCallback((fileName: string) => {
    console.log("Delete:", fileName);
    // TODO: Implement delete logic
  }, []);

  if (!files) {
    return (
      <Page>
        <PageHeader title="Folder not found" />
        <div className="p-4">
          <p>Folder "{folderName}" not found.</p>
        </div>
      </Page>
    );
  }

  return (
    <Page>
      <PageHeader
        title={files[0]?.subject?.name ?? "Subject"}
        backButton="/library"
        actions={<SearchBar placeholder={"Search a file..."} />}
      />

      <FileTable
        items={files}
        onDownload={handleDownload}
        onPreview={handlePreview}
        onDelete={handleDelete}
      />

      <FloatingButton
        position="bottom-right"
        items={formItems}
        title={"Add a file"}
      />
    </Page>
  );
}
