import React from "react";
import type { TaskEntity } from "../types/task-entity";
import { statusOptions, statusLabels } from "../utils/task-utils";

interface TaskFormProps {
  form: TaskEntity;
  editing: TaskEntity | null;
  onFormChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onFormSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
}

export const TaskForm: React.FC<TaskFormProps> = ({
  form,
  editing,
  onFormChange,
  onFormSubmit,
  onCancel,
}) => {
  return (
    <form className="task-form" onSubmit={onFormSubmit}>
      <input
        name="name"
        type="text"
        placeholder="Task name"
        value={form.name}
        onChange={onFormChange}
        required
      />
      <input
        name="priority"
        type="number"
        min={1}
        max={10}
        value={form.priority}
        onChange={onFormChange}
        required
      />
      <select name="status" value={form.status} onChange={onFormChange}>
        {statusOptions.map((s) => (
          <option key={s} value={s}>
            {statusLabels[s]}
          </option>
        ))}
      </select>
      <button type="submit">
        {editing ? "Update" : "Add"} Task
      </button>
      {editing && (
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      )}
    </form>
  );
};
