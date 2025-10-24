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
  const user = useAuthStore((state) => state.user);

  if (user) {
    // Если пользователь уже авторизован, перенаправляем на главную
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
