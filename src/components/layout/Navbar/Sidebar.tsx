import cls from "./Sidebar.module.scss";
import { NAV_ITEMS } from "./navItems";
import { SidebarItem } from "./SidebarItem";

export function Sidebar() {
  const top = NAV_ITEMS.filter(i => i.section !== "bottom");
  const bottom = NAV_ITEMS.filter(i => i.section === "bottom");

  return (
    <aside className={cls.sidebar}>
      <div className={cls.navTop}>
        {top.map(it => <SidebarItem key={it.to} {...it} />)}
      </div>
      <div className={cls.navBottom}>
        {bottom.map(it => <SidebarItem key={it.to} {...it} />)}
      </div>
    </aside>
  );
}
