import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../hooks/hooks";


const ProtectedRoute = () => {
    const { accessToken, user } = useAppSelector((state) => state.auth);

    if (!accessToken) return <Navigate to='/auth/login' replace />;

    // if (user?.roles && !user?.roles.includes('Admin')) {
    //     return <Navigate to='/unauthorized' replace />;
    // };

    if (!user) return null;

    if (!user.roles.includes('Admin')) {
        return <Navigate to='/unauthorized' replace />;
    };

    return <Outlet />;
};

export default ProtectedRoute;