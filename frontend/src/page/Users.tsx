import UserDialog from "@/components/user/user-dialog";
import UserTable from "@/components/user/user-table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function Uers() {
  return (
    <div className="w-full h-full flex-col space-y-8 pt-3">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">All Users</h2>
          <p className="text-muted-foreground">
            Here&apos;s the list of users.
          </p>
        </div>
      </div>
      <UserDialog title="Create Task">
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create User
        </Button>
      </UserDialog>
      {/* {User Table} */}
      <div>
        <UserTable />
      </div>
    </div>
  );
}
