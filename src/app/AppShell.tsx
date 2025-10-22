import { Outlet } from "react-router-dom";
import { Sidebar } from "@/components/layout/Sidebar";

export default function AppShell() {
  return (
    <div className="flex h-dvh bg-background text-foreground">
      <Sidebar />
      <main className="flex-1 min-w-0">
        <Outlet />
      </main>
    </div>
  );
}
