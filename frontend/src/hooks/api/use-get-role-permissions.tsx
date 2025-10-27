/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "@tanstack/react-query";
import { getRolePermissionsQueryFn } from "@/lib/api";
import { CustomError } from "@/types/custom-error.type";

const useGetRolePermissionsQuery = (isAuthenticated: boolean) => {
  const query = useQuery<any, CustomError>({
    queryKey: ["rolePermissions"],
    queryFn: () => getRolePermissionsQueryFn(),
    staleTime: 0,
    retry: 2,
    enabled: !!isAuthenticated,
  });

  return query;
};

export default useGetRolePermissionsQuery;
