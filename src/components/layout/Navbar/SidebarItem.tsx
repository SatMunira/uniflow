import { NavLink, useNavigate } from "react-router-dom";
import cls from "./Sidebar.module.scss";
import { useAuthStore } from "@/store/authStore";

export function SidebarItem({ icon: Icon, label, to }: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  to: string;
}) {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);

  // Handle logout click
  const handleLogoutClick = (e: React.MouseEvent) => {
    e.preventDefault();
    logout();
    navigate("/login");
  };

  // If this is the logout item, render as a button
  if (to === "/logout") {
    return (
      <button onClick={handleLogoutClick} className={cls.item}>
        <div className={cls.item}>
          <div className={cls.iconWrap}>
            <Icon className={cls.icon} />
          </div>
          <div className={cls.pill}>{label}</div>
        </div>
      </button>
    );
  }

  // Otherwise render as NavLink
  return (
    <NavLink to={to} end className={cls.item}>
      {({ isActive }) => (
        <div className={cls.item} data-active={isActive ? "true" : undefined}>
          <div className={cls.iconWrap}>
            <Icon className={cls.icon} />
          </div>
          <div className={cls.pill}>{label}</div>
        </div>
      )}
    </NavLink>
  );
}
