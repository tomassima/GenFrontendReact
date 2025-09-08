import type { TaskStatus } from "../enums/task-status";

export type TaskEntity = {
  key: string;
  name: string;
  priority: number;
  status: TaskStatus;
};