import { createBrowserRouter } from "react-router-dom";
import AppShell from "./AppShell";

const Dummy: React.FC<{ txt: string }> = ({ txt }) => (
  <div className="grid place-items-center h-dvh ">
    <div className="text-3xl">{txt}</div>
  </div>
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppShell />,
    children: [
      { index: true, element: <Dummy txt="Home" /> },
      { path: "timetable", element: <Dummy txt="Timetable" /> },
      { path: "board", element: <Dummy txt="Kanban" /> },
      { path: "library", element: <Dummy txt="Library" /> },
      { path: "tasks", element: <Dummy txt="Tasks" /> },
      { path: "notes", element: <Dummy txt="Notes" /> },
      { path: "pomodoro", element: <Dummy txt="Pomodoro" /> },
      { path: "profile", element: <Dummy txt="Profile" /> },
      { path: "logout", element: <Dummy txt="Logout" /> },
    ],
  },
]);
