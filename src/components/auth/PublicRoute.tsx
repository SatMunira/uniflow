import { Navigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";

interface PublicRouteProps {
  children: React.ReactNode;
}

/**
 * PublicRoute - для страниц login/register
 * Если пользователь уже авторизован, перенаправляет на главную страницу
 */
export function PublicRoute({ children }: PublicRouteProps) {
  const token = useAuthStore((state) => state.token);

  if (token) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
