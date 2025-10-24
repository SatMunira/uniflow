import { createBrowserRouter } from "react-router-dom";
import AppShell from "./AppShell";
import TimetablePage from "@/pages/schedule/TimeTablePage";
import BoardPage from "@/pages/board/BoardPage";
import { Page, PageSection } from "@/components/layout/Page";
import { PageHeader } from "@/components/layout/PageHeader";
import MaterialLibPage from "@/pages/material-lib/MaterialLibPage";
import FolderItemsPage from "@/pages/material-lib/FolderItemsPage";
import TasksPage from "@/pages/tasks/TasksPage";
import TaskItemPage from "@/pages/tasks/TaskItemPage";
import PomodoroPage from "@/pages/pomodoro/PomodoroPage";
import KanbanPage from "@/pages/board/KanbanPage";
import LoginPage from "@/pages/login-page/LoginPage";
import RegisterPage from "@/pages/register-page/RegisterPage";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { PublicRoute } from "@/components/auth/PublicRoute";

const Blank = ({ title }: { title: string }) => (
  <Page>
    <PageHeader title={title} />
    <PageSection>
      <div className="rounded-xl border border-dashed p-10 text-center text-sm text-muted-foreground">
        Пусто. Контент добавим позже.
      </div>
    </PageSection>
  </Page>
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <AppShell />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Blank title="Home" /> },
      { path: "timetable", element: <TimetablePage /> },
      { path: "board", element: <BoardPage /> },
      { path: "library", element: <MaterialLibPage /> },
      { path: "library/:folderName", element: <FolderItemsPage /> },
      { path: "tasks", element: <TasksPage /> },
      { path: "tasks/:subjectSlug", element: <TaskItemPage /> },
      { path: "notes", element: <Blank title="Notes" /> },
      { path: "pomodoro", element: <PomodoroPage /> },
      { path: "profile", element: <Blank title="Profile" /> },
      { path: "logout", element: <Blank title="Logout" /> },
      { path: "projects/:id", element: <KanbanPage /> },
    ],
  },
  {
    path: "/login",
    element: (
      <PublicRoute>
        <LoginPage />
      </PublicRoute>
    ),
  },
  {
    path: "/register",
    element: (
      <PublicRoute>
        <RegisterPage />
      </PublicRoute>
    ),
  },
]);
