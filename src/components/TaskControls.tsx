import React from "react";
import type { TaskEntity } from "../types/task-entity";

interface TaskControlsProps {
  filter: string;
  sortBy: keyof TaskEntity;
  sortDir: "asc" | "desc";
  onFilterChange: (value: string) => void;
  onSortToggle: () => void;
  onSortByChange: (sortBy: keyof TaskEntity) => void;
}

export const TaskControls: React.FC<TaskControlsProps> = ({
  filter,
  sortBy,
  sortDir,
  onFilterChange,
  onSortToggle,
  onSortByChange,
}) => {
  return (
    <div className="controls">
      <input
        type="text"
        placeholder="Filter by name..."
        value={filter}
        onChange={(e) => onFilterChange(e.target.value)}
      />
      <button onClick={onSortToggle}>
        Sort: {sortBy} ({sortDir})
      </button>
      <select
        value={sortBy}
        onChange={(e) => onSortByChange(e.target.value as keyof TaskEntity)}
      >
        <option value="key">Key</option>
        <option value="name">Name</option>
        <option value="priority">Priority</option>
        <option value="status">Status</option>
      </select>
    </div>
  );
};
