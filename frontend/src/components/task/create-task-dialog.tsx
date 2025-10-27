import { useState } from "react";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import CreateTaskForm from "./create-task-form";
type CreateTaskDialog = { dialogTitle: string; taskId?: string };

const CreateTaskDialog = ({ dialogTitle, taskId }: CreateTaskDialog) => {
  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => {
    setIsOpen(false);
  };
  return (
    <div>
      <Dialog modal={true} open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          {taskId ? (
            <span>Edit Task</span>
          ) : (
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Task
            </Button>
          )}
        </DialogTrigger>
        <DialogContent className="sm:max-w-lg border-0 ">
          <DialogTitle>
            {dialogTitle}
            <DialogDescription>Organize and manage tasks</DialogDescription>
          </DialogTitle>

          <CreateTaskForm onClose={onClose} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateTaskDialog;
