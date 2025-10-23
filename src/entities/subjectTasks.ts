
export class Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  isCompleted: boolean;

  constructor(
    id: string,
    title: string,
    description: string,
    dueDate: string,
    isCompleted: boolean = false
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.isCompleted = isCompleted;
  }

  // Получить дату в читаемом формате
  getFormattedDate(): string {
    const date = new Date(this.dueDate);
    return date.toLocaleDateString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }

  // Проверить, просрочена ли задача
  isOverdue(): boolean {
    if (this.isCompleted) return false;
    return new Date(this.dueDate) < new Date();
  }

  // Получить количество дней до дедлайна
  getDaysUntilDue(): number {
    const today = new Date();
    const due = new Date(this.dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }

  // Переключить статус выполнения
  toggleCompleted(): void {
    this.isCompleted = !this.isCompleted;
  }
}

// entities/Subject.ts
import { slugify } from "@/utils/slugify";

export class Subject {
  id: string;
  name: string;
  tasks: Task[];

  constructor(id: string, name: string, tasks: Task[] = []) {
    this.id = id;
    this.name = name;
    this.tasks = tasks;
  }

  // Получить URL-friendly slug из названия предмета
  get slug(): string {
    return slugify(this.name);
  }

  // Получить общее количество задач
  get totalTasks(): number {
    return this.tasks.length;
  }

  // Получить количество завершенных задач
  get completedTasksCount(): number {
    return this.tasks.filter(task => task.isCompleted).length;
  }

  // Получить количество незавершенных задач
  get pendingTasksCount(): number {
    return this.tasks.filter(task => !task.isCompleted).length;
  }

  // Получить процент выполнения
  get completionPercentage(): number {
    if (this.totalTasks === 0) return 0;
    return Math.round((this.completedTasksCount / this.totalTasks) * 100);
  }

  // Получить просроченные задачи
  getOverdueTasks(): Task[] {
    return this.tasks.filter(task => task.isOverdue());
  }

  // Получить задачи на сегодня
  getTodayTasks(): Task[] {
    const today = new Date().toISOString().split('T')[0];
    return this.tasks.filter(task => task.dueDate === today);
  }

  // Получить задачи по статусу
  getTasksByStatus(completed: boolean): Task[] {
    return this.tasks.filter(task => task.isCompleted === completed);
  }

  // Получить ближайшие задачи (сортировка по дате)
  getUpcomingTasks(limit?: number): Task[] {
    const upcoming = this.tasks
      .filter(task => !task.isCompleted)
      .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());

    return limit ? upcoming.slice(0, limit) : upcoming;
  }

  // Получить ближайший дедлайн (самую близкую незавершенную задачу)
  getNextDeadline(): Task | null {
    const upcomingTasks = this.getUpcomingTasks(1);
    return upcomingTasks.length > 0 ? upcomingTasks[0] : null;
  }

  // Получить текст времени до ближайшего дедлайна
  getTimeUntilNextDeadline(): string {
    const nextTask = this.getNextDeadline();
    if (!nextTask) return "No upcoming tasks";

    const now = new Date();
    const deadline = new Date(nextTask.dueDate);
    const diffInMs = deadline.getTime() - now.getTime();
    const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInDays < 0) {
      const overdueDays = Math.abs(diffInDays);
      return `Overdue by ${overdueDays} ${overdueDays === 1 ? "day" : "days"}`;
    } else if (diffInDays === 0) {
      return "Due today";
    } else if (diffInDays === 1) {
      return "1 day left";
    } else {
      return `${diffInDays} days left`;
    }
  }
}