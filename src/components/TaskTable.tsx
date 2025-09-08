import React from "react";
import type { TaskEntity } from "../types/task-entity";
import { statusLabels } from "../utils/task-utils";

interface TaskTableProps {
  tasks: TaskEntity[];
  onEdit: (task: TaskEntity) => void;
  onDelete: (key: string) => void;
}

export const TaskTable: React.FC<TaskTableProps> = ({
  tasks,
  onEdit,
  onDelete,
}) => {
  return (
    <table className="task-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Priority</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {tasks.length === 0 ? (
          <tr>
            <td colSpan={4}>No tasks found.</td>
          </tr>
        ) : (
          tasks.map((task) => (
            <tr key={task.key}>
              <td>{task.name}</td>
              <td>{task.priority}</td>
              <td>{statusLabels[task.status]}</td>
              <td>
                <button onClick={() => onEdit(task)}>Edit</button>
                <button onClick={() => onDelete(task.key)}>Delete</button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};
