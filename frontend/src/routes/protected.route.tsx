import TableSkeleton from "@/components/skeleton-loaders/table-skeleton";
import useAuth from "@/hooks/use-auth";
import { Navigate, Outlet } from "react-router";

const ProtectedRoute = () => {
  const { data: authData, isLoading } = useAuth();
  const user = authData?.user;

  if (isLoading) {
    return <TableSkeleton columns={6} rows={10} />;
  }
  return user ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;
