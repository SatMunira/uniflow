import { Page } from "@/components/layout/Page";
import { PageHeader } from "@/components/layout/PageHeader";
import { FolderItem } from "./components/FolderItem";
import { libFoldersMock } from "../../mocks/libFolders";
import FloatingButton from "@/components/ui/FloatingButton/FloatingButton";
export default function MaterialLibPage() {
  return (
    <Page>
      <PageHeader title={"Material Library"} />
      <div className="w-full h-full grid grid-cols-5 gap-4">
        {libFoldersMock.map((folder) => (
          <FolderItem key={folder.name} folder={folder} />
        ))}
      </div>
      <FloatingButton items={[
        {label : "Create folder", input: (
          <div className="flex flex-col">
            <label className="font-mono text-xs mb-1">Title</label>
            <input type="text" className="bg-white px-2 py-2 border border-black rounded-md mb-3"/>
            <button className="bg-accent px-2 py-2 text-white font-mono rounded-md">Create</button>
          </div>
        )}
      ]} title={"Create Folder"}/>
    </Page>
  );
}
