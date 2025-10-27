import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { transformOptions } from "@/lib/helper";
import { Roles } from "@/constant";
import { createUserMutationFn, editUserMutationFn } from "@/lib/api";
import {
  MutationFunction,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";
import {
  createUserSchema,
  TCreateUserSchema,
  editUserSchema,
  TEditUserSchema,
} from "@/validation/auth.validation";
import { Loader } from "lucide-react";
import { UserType } from "@/types/api.type";

export default function UserForm(props: {
  onClose: () => void;
  user?: UserType;
}) {
  const { onClose, user } = props;

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: user
      ? (editUserMutationFn as MutationFunction<void, TEditUserSchema>)
      : (createUserMutationFn as MutationFunction<void, TCreateUserSchema>),
  });

  const userSchema = user ? editUserSchema : createUserSchema;
  type TUserSchema = typeof user extends undefined
    ? TCreateUserSchema
    : TEditUserSchema;

  const form = useForm<TUserSchema>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: user ? user.name : "",
      email: user ? user.email : "",
      password: "",
      role: user ? (user.role.name as keyof typeof Roles) : Roles.MEMBER,
    },
  });

  const userRoleList = Object.values(Roles);
  const roleOptions = transformOptions(userRoleList);

  const onSubmit = (values: TUserSchema) => {
    if (isPending) return;

    let payload;

    if (user) {
      payload = {
        ...values,
        role: values.role,
        _id: user._id,
      } as TUserSchema & { _id: string };
    } else {
      payload = {
        ...values,
        role: values.role,
      } as TUserSchema;
    }

    mutate(payload, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["all-users"],
        });

        toast.success("User created successfully");
        onClose();
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };

  return (
    <div className="w-full h-auto max-w-full">
      <div className="h-full">
        <Form {...form}>
          <form className="space-y-3" onSubmit={form.handleSubmit(onSubmit)}>
            {/* {name} */}
            <div>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="dark:text-[#f1f7feb5] text-sm">
                      Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Jhon Smith"
                        className="!h-[48px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* {email} */}
            <div>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="dark:text-[#f1f7feb5] text-sm">
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="example@gmail.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* {password} */}
            <div>
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="dark:text-[#f1f7feb5] text-sm">
                      Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="********"
                        className="!h-[48px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* {Role} */}
            <div>
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl className="w-full">
                        <SelectTrigger>
                          <SelectValue
                            className="!text-muted-foreground !capitalize"
                            placeholder="Select a role"
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {roleOptions?.map((role) => (
                          <SelectItem
                            className="!capitalize"
                            key={role.value}
                            value={role.value}
                          >
                            {role.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button
              className="flex place-self-end  h-[40px] text-white font-semibold"
              type="submit"
              disabled={isPending}
            >
              {isPending && <Loader className="animate-spin" />}
              Create
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
