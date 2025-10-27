import { getColumns } from "./table/columns";
import { DataTable } from "./table/table";

import useGetAllUsers from "@/hooks/api/use-get-all-users";
import { UserType } from "@/types/api.type";

const UserTable = () => {
  const columns = getColumns();

  const { data, isLoading } = useGetAllUsers();

  const users: UserType[] = data?.users || [];

  return (
    <div className="w-full relative">
      <DataTable isLoading={isLoading} data={users} columns={columns} />
    </div>
  );
};
export default UserTable;
