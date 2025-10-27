import TableSkeleton from "@/components/skeleton-loaders/table-skeleton";
import useAuth from "@/hooks/use-auth";
import { Navigate, Outlet, useLocation } from "react-router";
import { isAuthRoute } from "./common/routePaths";

const AuthRoute = () => {
  const location = useLocation();
  const { data: authData, isLoading } = useAuth();
  const user = authData?.user;

  console.log(" AuthRoute >>", user);

  const _isAuthRoute = isAuthRoute(location.pathname);

  if (isLoading && !_isAuthRoute)
    return <TableSkeleton columns={6} rows={10} />;

  if (!user) return <Outlet />;

  return <Navigate to="/tasks" replace />;
};

export default AuthRoute;
