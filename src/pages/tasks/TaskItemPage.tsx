import { useParams } from "react-router-dom";
import { Page } from "@/components/layout/Page";
import { PageHeader } from "@/components/layout/PageHeader";
import TaskSection from "./components/TaskSection";
import { useTaskManagement } from "./hooks/useTaskManagement";
import FloatingButton from "@/components/ui/FloatingButton/FloatingButton";
import { Calendar } from "lucide-react";

export default function TaskItemPage() {
  const { subjectSlug } = useParams<{ subjectSlug: string }>();
  const { subject, handleToggleTask } = useTaskManagement(subjectSlug);

  // Loading or not found state
  if (!subject) {
    return (
      <Page>
        <PageHeader title="Subject not found" backButton="/tasks" />
        <div className="p-4">
          <p>Subject "{subjectSlug}" not found.</p>
        </div>
      </Page>
    );
  }

  const todoTasks = subject.getTasksByStatus(false);
  const completedTasks = subject.getTasksByStatus(true);

  return (
    <Page>
      <PageHeader title={subject.name} backButton="/tasks" />

      <div className="pb-4">
        <TaskSection
          title="To Do"
          tasks={todoTasks}
          onToggle={handleToggleTask}
          isCompleted={false}
          emptyMessage="All tasks completed!"
          emptyEmoji="🎉"
        />

        <TaskSection
          title="Completed"
          tasks={completedTasks}
          onToggle={handleToggleTask}
          isCompleted={true}
          emptyMessage="No completed tasks yet"
        />
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
                  className="bg-white px-2 py-2 border border-black rounded-md mb-3 outline-0"
                />
                <label className="font-mono text-xs mb-1">Description</label>
                <input
                  type="text"
                  className="bg-white px-2 py-2 border border-black rounded-md mb-3 outline-0"
                />
                <label className="font-mono text-xs mb-1">Due Date</label>
                <div className="bg-white px-2 py-2 border border-black rounded-md mb-3 flex flex-row items-center">
                  <input
                    type="text"
                    className="outline-0 w-full"
                  />
                  <Calendar size={16}/>
                </div>
                <button className="bg-accent px-2 py-2 text-white font-mono rounded-md">
                  Create
                </button>
              </div>
            ),
          },
        ]}
        title={"Add task"}
      />
    </Page>
  );
}
