import { Outlet } from "react-router-dom";
import { Sidebar } from "@/components/layout/Navbar/Sidebar";
import { BrandBadge } from "@/components/layout/Navbar/BrandBadge";
import cls from "@/components/layout/Navbar/Sidebar.module.scss";

export default function AppShell() {
  return (
    <div className="flex h-dvh bg-background text-foreground">
      {/* левая рельса */}
      <div className={cls.rail}>
        <BrandBadge />
        <Sidebar />
      </div>

      {/* контент скроллится тут */}
      <main className="flex-1 min-w-0 overflow-auto grid place-items-center">
        <Outlet />
      </main>
    </div>
  );
}
