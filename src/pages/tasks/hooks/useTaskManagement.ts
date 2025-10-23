import { useState, useEffect, useCallback } from "react";
import type { Subject } from "@/entities/subjectTasks";
import { getSubjectBySlug } from "@/mocks/subjectTask";

export function useTaskManagement(subjectSlug: string | undefined) {
  const [subject, setSubject] = useState<Subject | null>(null);
  const [updateTrigger, setUpdateTrigger] = useState(0);

  useEffect(() => {
    if (!subjectSlug) return;
    const loadedSubject = getSubjectBySlug(subjectSlug);
    setSubject(loadedSubject || null);
  }, [subjectSlug]);

  const handleToggleTask = useCallback(
    (taskId: string) => {
      if (!subject) return;

      const task = subject.tasks.find((t) => t.id === taskId);
      if (task) {
        task.toggleCompleted();
        // Force re-render by incrementing trigger
        setUpdateTrigger((prev) => prev + 1);
      }
    },
    [subject]
  );

  return {
    subject,
    handleToggleTask,
    updateTrigger, // This forces re-render when changed
  };
}
