import CreateTaskDialog from "@/components/task/create-task-dialog";
import TaskTable from "@/components/task/task-table";

export default function Tasks() {
  return (
    <div className="w-full h-full flex-col space-y-8 pt-3">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">All Tasks</h2>
          <p className="text-muted-foreground">
            Here&apos;s the list of tasks for this workspace!
          </p>
        </div>
      </div>
      <CreateTaskDialog dialogTitle="Create Task" />
      <div>
        <TaskTable />
      </div>
    </div>
  );
}
