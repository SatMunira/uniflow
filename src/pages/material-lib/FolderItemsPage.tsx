import { Page } from "@/components/layout/Page";
import { PageHeader } from "@/components/layout/PageHeader";
import SearchBar from "@/components/ui/SearchBar/SearchBar";
import FloatingButton from "@/components/ui/FloatingButton/FloatingButton";
import FileTable from "./components/FileTable";
import { useAddFileForm } from "./components/AddFileForm";
import { libFoldersMock } from "@/mocks/libFolders";
import { useParams } from "react-router-dom";
import { useCallback } from "react";

export default function FolderItemsPage() {
  const { folderName } = useParams<{ folderName: string }>();
  const folder = libFoldersMock.find((f) => f.name === folderName);
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

  if (!folder) {
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
        title={folder.name}
        backButton="/library"
        actions={<SearchBar placeholder={"Search a file..."} />}
      />

      <FileTable
        items={folder.items}
        onDownload={handleDownload}
        onPreview={handlePreview}
        onDelete={handleDelete}
      />

      <FloatingButton position="bottom-right" items={formItems} title={"Add a file"} />
    </Page>
  );
}
