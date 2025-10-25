import { Page } from "@/components/layout/Page";
import { PageHeader } from "@/components/layout/PageHeader";
import { ProgressBar } from "./components/ProgressBar";
import { Link } from "react-router-dom";
import FloatingButton from "@/components/ui/FloatingButton/FloatingButton";
import { useEffect, useState } from "react";
import { getSubjects, type Subject } from "@/api/subjects";

export default function TasksPage() {

  const [subjects, setSubject] = useState<Subject[]>();

  useEffect(()=>{
    const fetchSubjects = async() => {
      try {
        const data = await getSubjects();
        setSubject(data);
      } catch {
        console.log("ERROR")
      }
    };
    
    fetchSubjects();
  },[])


  return (
    <Page>
      <PageHeader title={"Tasks Tracker"} />
      <div className="w-full grid grid-cols-4 gap-5">
        {subjects && subjects.map((subject) => (
          <Link
            to={`/tasks/${subject.id}`}
            key={subject.id}
            className="bg-white border border-black font-mono px-4 py-6 flex flex-col gap-4 rounded-md hover:shadow-lg transition-shadow"
          >
            <span className="text-xs">
              {`${subject._count.tasks} tasks left`}
            </span>
            <span className="h-2/3 text-md font-semibold">
              {subject.name}
            </span>
            <ProgressBar percentage={50} />
          </Link>
        ))}
      </div>
      <FloatingButton
        items={[
          {
            label: "title",
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
        title={"Create subject"}
      />
    </Page>
  );
}
