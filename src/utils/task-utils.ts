import type { TaskEntity } from "../types/task-entity";
import { TaskStatus } from "../enums/task-status";

export const statusOptions = [TaskStatus.NotStarted, TaskStatus.InProgress, TaskStatus.Completed];

export const statusLabels = {
  [TaskStatus.NotStarted]: "Not Started",
  [TaskStatus.InProgress]: "In Progress",
  [TaskStatus.Completed]: "Completed",
};

export const sortTasks = (tasks: TaskEntity[], sortBy: keyof TaskEntity, sortDir: "asc" | "desc") => {
  return [...tasks].sort((a, b) => {
    if (a[sortBy] < b[sortBy]) return sortDir === "asc" ? -1 : 1;
    if (a[sortBy] > b[sortBy]) return sortDir === "asc" ? 1 : -1;
    return 0;
  });
};

export const filterTasks = (tasks: TaskEntity[], filter: string) => {
  return tasks.filter((t) =>
    t.name.toLowerCase().includes(filter.toLowerCase())
  );
};
