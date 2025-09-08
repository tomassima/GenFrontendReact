export const TaskStatus = {
  NotStarted: 0,
  InProgress: 1,
  Completed: 2,
} as const;

export type TaskStatus = typeof TaskStatus[keyof typeof TaskStatus];