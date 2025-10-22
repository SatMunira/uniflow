import { NavLink } from "react-router-dom";
import cls from "./Sidebar.module.scss";

export function SidebarItem({ icon: Icon, label, to }: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  to: string;
}) {
  return (
    <NavLink to={to} end className={cls.item}>
      {({ isActive }) => (
        <div className={cls.item} data-active={isActive ? "true" : undefined}>
          <div className={cls.iconWrap}>
            <Icon className={cls.icon} />
          </div>
          <div className={cls.pill}>{isActive ? label : null}</div>
        </div>
      )}
    </NavLink>
  );
}
