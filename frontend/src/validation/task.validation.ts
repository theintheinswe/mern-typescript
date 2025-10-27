import { z } from "zod";
import { TaskPriorityEnum, TaskStatusEnum } from "@/constant";

const optionSchema = z.object({
  label: z.string(),
  value: z.string(),
  disable: z.boolean().optional(),
});

const Task = z
  .object({
    title: z.string().trim().min(1).max(255),
    description: z.string().trim().optional(),
    priority: z.nativeEnum(TaskPriorityEnum, {
      required_error: "Task is required",
    }),
    status: z.nativeEnum(TaskStatusEnum, {
      required_error: "Task is required",
    }),
    assignedTo: z.array(optionSchema).optional(),
    dueDate: z.date().optional(),
  })
  .strict();

export const taskIdSchema = z.string().trim().min(1).max(255);

export const createTaskSchema = Task;
export type TCreateTaskSchema = z.infer<typeof createTaskSchema>;

export const updateTaskSchema = Task.extend({
  _id: taskIdSchema,
});
