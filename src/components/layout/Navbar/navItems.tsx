import {
  CalendarDays, Grid2X2, BookOpen, CheckSquare, ListTodo,
  Timer, User, LogOut,
} from "lucide-react";


export type NavItem = {
  to: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  section?: "top" | "bottom";
};

export const NAV_ITEMS: NavItem[] = [
  { to: "/timetable", label: "Timetable", icon: CalendarDays, section: "top" },
  { to: "/board",     label: "Kanban",    icon: Grid2X2,      section: "top" },
  { to: "/library",   label: "Library",   icon: BookOpen,     section: "top" },
  { to: "/tasks",     label: "Tasks",     icon: CheckSquare,  section: "top" },
  { to: "/notes",     label: "Notes",     icon: ListTodo,     section: "top" },
  { to: "/pomodoro",  label: "Pomodoro",  icon: Timer,        section: "top" },

  { to: "/profile",   label: "Profile",   icon: User,         section: "bottom" },
  { to: "/logout",    label: "Logout",    icon: LogOut,       section: "bottom" },
];
