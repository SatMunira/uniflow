import { Page } from "@/components/layout/Page";
import { PageHeader } from "@/components/layout/PageHeader";
import { ProgressBar } from "./components/ProgressBar";
import { subjectTasksMock } from "@/mocks/subjectTask";
import { Link } from "react-router-dom";
import FloatingButton from "@/components/ui/FloatingButton/FloatingButton";

export default function TasksPage() {
  return (
    <Page>
      <PageHeader title={"Tasks Tracker"} />
      <div className="w-full grid grid-cols-4 gap-5">
        {subjectTasksMock.map((subjectTasks) => (
          <Link
            to={`/tasks/${subjectTasks.slug}`}
            key={subjectTasks.id}
            className="bg-white border border-black font-mono px-4 py-6 flex flex-col gap-4 rounded-md hover:shadow-lg transition-shadow"
          >
            <span className="text-xs">
              {subjectTasks.getTimeUntilNextDeadline()}
            </span>
            <span className="h-2/3 text-md font-semibold">
              {subjectTasks.name}
            </span>
            <ProgressBar percentage={subjectTasks.completionPercentage} />
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
