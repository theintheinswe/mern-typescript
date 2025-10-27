import { getAllUsersQueryFn } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

const useGetAllUsers = () => {
  const query = useQuery({
    queryKey: ["all-users"],
    queryFn: () => getAllUsersQueryFn(),
    staleTime: Infinity,
  });
  return query;
};

export default useGetAllUsers;
