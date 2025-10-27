import { z } from "zod";
import { TaskPriorityEnum, TaskStatusEnum } from "../enums/task.enum";
import { isValidId } from "../utils/util";

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
    assignedTo: z
      .array(z.string())
      .nullable()
      .optional()
      .refine((val) => {
        if (!val) return true;
        if (val.length < 1) return false;
        if (val.every((id) => isValidId(id))) return true;
      }, "Invalid assignedTo value. All IDs must be valid."),
    dueDate: z
      .string()
      .trim()
      .optional()
      .refine(
        (val) => {
          return !val || !isNaN(Date.parse(val));
        },
        {
          message: "Invalid date format. Please provide a valid date string.",
        }
      ),
  })
  .strict();

export const titleSchema = z.string().trim().min(1).max(255);
export const descriptionSchema = z.string().trim().optional();

// export const assignedToSchema = z
//   .array(z.string())
//   .nullable()
//   .optional()
//   .refine(
//     (val) => !val || val.every((id) => isValidId(id)),
//     "Invalid assignedTo value. All IDs must be valid."
//   );

// export const prioritySchema = z.enum(
//   Object.values(TaskPriorityEnum) as [string, ...string[]]
// );

// export const statusSchema = z.enum(
//   Object.values(TaskStatusEnum) as [string, ...string[]]
// );

// export const dueDateSchema = z
//   .string()
//   .trim()
//   .optional()
//   .refine(
//     (val) => {
//       return !val || !isNaN(Date.parse(val));
//     },
//     {
//       message: "Invalid date format. Please provide a valid date string.",
//     }
//   );

export const taskIdSchema = z.custom<string>(
  (val) => isValidId(val),
  "Not a valid Id"
);

export const createTaskSchema = Task;

export const updateTaskSchema = Task.extend({
  _id: taskIdSchema,
});
