import { Navigate, Outlet } from "react-router-dom";
import { authService } from "../services/authService";

// Защищенный маршрут для авторизованных пользователей
export const ProtectedRoute = () => {
    const user = authService.getCurrentUser();
    return user ? <Outlet /> : <Navigate to="/login" replace />;
};

// Защищенный маршрут для администраторов
export const AdminRoute = () => {
    const user = authService.getCurrentUser();
    return user?.role === 'admin' ? <Outlet /> : <Navigate to="/" replace />;
};