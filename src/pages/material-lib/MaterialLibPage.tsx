import { Page } from "@/components/layout/Page";
import { PageHeader } from "@/components/layout/PageHeader";
import { FolderItem } from "./components/FolderItem";
import FloatingButton from "@/components/ui/FloatingButton/FloatingButton";
import { getSubjects, type Subject } from "@/api/subjects";
import { useState, useEffect } from "react";
export default function MaterialLibPage() {


  const [subjects, setSubject] = useState<Subject[]>();

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const data = await getSubjects();
        setSubject(data);
      } catch {
        console.log("ERROR");
      }
    };

    fetchSubjects();
  }, []);

  return (
    <Page>
      <PageHeader title={"Material Library"} />
      <div className="w-full h-full grid grid-cols-5 grid-rows-3 gap-4">
        {subjects && subjects.map((subject) => (
          <FolderItem key={subject.name} subject={subject} />
        ))}
      </div>
      <FloatingButton
        items={[
          {
            label: "Create folder",
            input: (
              <div className="flex flex-col">
                <label className="font-mono text-xs mb-1">Title</label>
                <input
                  type="text"
                  className="bg-white px-2 py-2 border border-black rounded-md mb-3"
                />
                <button className="bg-accent px-2 py-2 text-white font-mono rounded-md">
                  Create
                </button>
              </div>
            ),
          },
        ]}
        title={"Create Folder"}
      />
    </Page>
  );
}
