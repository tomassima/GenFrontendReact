import { TaskStatus } from "./task-status";


export type TaskEntity = {
  key: string;
  name: string;
  priority: number;
  status: TaskStatus;
};