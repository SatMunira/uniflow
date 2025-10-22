import { createBrowserRouter } from "react-router-dom";
import AppShell from "./AppShell";
import TimetablePage from "@/pages/schedule/TimeTablePage";
import BoardPage from "@/pages/board/BoardPage";
import { Page, PageSection } from "@/components/layout/Page";
import { PageHeader } from "@/components/layout/PageHeader";

const Blank = ({ title }: { title: string }) => (
  <Page>
    <PageHeader title={title}/>
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
    element: <AppShell />,
    children: [
      { index: true, element: <Blank title="Home" /> },
      { path: "timetable", element: <TimetablePage /> },
      { path: "board", element: <BoardPage /> },
      { path: "library", element: <Blank title="Library" /> },
      { path: "tasks", element: <Blank title="Tasks" /> },
      { path: "notes", element: <Blank title="Notes" /> },
      { path: "pomodoro", element: <Blank title="Pomodoro" /> },
      { path: "profile", element: <Blank title="Profile" /> },
      { path: "logout", element: <Blank title="Logout" /> },
    ],
  },
]);
