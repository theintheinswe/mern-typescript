import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import UserForm from "@/components/user/user-form";
import { UserType } from "@/types/api.type";

import React, { useState } from "react";

type CreateTaskDialog = {
  title: string;
  user?: UserType;
  children: React.ReactNode;
};

const UserDialog = ({ title, user, children }: CreateTaskDialog) => {
  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <Dialog modal={true} open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="sm:max-w-lg border-0 ">
          <DialogTitle>
            {title}
            <DialogDescription>Organize and manage user</DialogDescription>
          </DialogTitle>

          <UserForm onClose={onClose} user={user} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserDialog;
