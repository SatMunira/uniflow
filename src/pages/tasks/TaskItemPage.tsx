import { useParams } from "react-router-dom";
import { Page } from "@/components/layout/Page";
import { PageHeader } from "@/components/layout/PageHeader";
import TaskSection from "./components/TaskSection";
import FloatingButton from "@/components/ui/FloatingButton/FloatingButton";
import { Calendar } from "lucide-react";
import { getTasksBySubjectId, type Task } from "@/api/tasks";
import { useEffect, useMemo, useState } from "react";

export default function TaskItemPage() {
  const { subjectSlug } = useParams<{ subjectSlug: string }>();
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      if (subjectSlug) {
        try {
          const data = await getTasksBySubjectId(subjectSlug);
          setTasks(data);
        } catch (err) {
          console.log(err);
        }
      }
    };

    fetchTasks();
  }, [subjectSlug]);

  const todoTasks = useMemo(
    () => tasks.filter((task) => task.status !== "DONE"),
    [tasks]
  );
  const completedTasks = useMemo(
    () => tasks.filter((task) => task.status === "DONE"),
    [tasks]
  );

  const handleToggleTask = (taskId: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId
          ? { ...task, status: task.status === "DONE" ? "TODO" : "DONE" }
          : task
      )
    );
  };

  // Loading or not found state
  if (!tasks) {
    return (
      <Page>
        <PageHeader title="Subject not found" backButton="/tasks" />
        <div className="p-4">
          <p>Subject not found.</p>
        </div>
      </Page>
    );
  }

  return (
    <Page>
      <PageHeader
        title={tasks[0]?.subject?.name ?? "Subject"}
        backButton="/tasks"
      />

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
                  <input type="text" className="outline-0 w-full" />
                  <Calendar size={16} />
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
