import { Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

/**
 * ProtectedRoute - защищает маршруты от неавторизованных пользователей
 * Если пользователь не авторизован, перенаправляет на /login
 */
export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const user = useAuthStore((state) => state.token);
  const location = useLocation();

  if (!user) {
    // Сохраняем путь, куда пользователь пытался попасть
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
