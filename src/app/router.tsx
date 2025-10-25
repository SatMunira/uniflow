import { createBrowserRouter } from "react-router-dom";
import AppShell from "./AppShell";
import TimetablePage from "@/pages/schedule/TimeTablePage";
import ProjectsPage from "@/pages/board/ProjectsPage";
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
import FlashListPage from "@/pages/flash/FlashListPage";
import FlashSetPage from "@/pages/flash/FlashSetPage";
import FlashReviewPage from "@/pages/flash/FlashReviewPage";
import DashboardPage from "@/pages/dashboard/Dashboard";
import FlashReviewResultPage from "@/pages/flash/FlashReviewResultPage";
import ProfileModalRoute from "@/pages/profile/ProfileModalRoute";

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
      { index: true, element: <DashboardPage /> },
      { path: "timetable", element: <TimetablePage /> },
      { path: "board", element: <ProjectsPage /> },
      { path: "library", element: <MaterialLibPage /> },
      { path: "library/:folderName", element: <FolderItemsPage /> },
      { path: "tasks", element: <TasksPage /> },
      { path: "tasks/:subjectSlug", element: <TaskItemPage /> },
      { path: "notes", element: <Blank title="Notes" /> },
      { path: "pomodoro", element: <PomodoroPage /> },
      { path: "logout", element: <Blank title="Logout" /> },
      { path: "projects/:id", element: <KanbanPage /> },
      { path: "flash", element: <FlashListPage /> },
      { path: "/flash/:id", element: <FlashSetPage /> },
      { path: "flash/:id/review", element: <FlashReviewPage /> },
      { path: "flash/:id/results", element: <FlashReviewResultPage /> },
      { path: "profile", element: <ProfileModalRoute /> },
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
