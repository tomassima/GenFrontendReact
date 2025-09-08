import type { TaskEntity } from "../types/task-entity";
import { API_CONFIG } from "../config/api-config";

const API_BASE_URL = API_CONFIG.baseUrl;

export const taskApi = {
  async getAllTasks(): Promise<TaskEntity[]> {
    const response = await fetch(`${API_BASE_URL}/task`);
    if (response.status === 204) return [];
    if (!response.ok) throw new Error('Failed to fetch tasks');
    return await response.json();
  },

  async createOrUpdateTask(task: TaskEntity): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/task`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    });
    if (!response.ok) throw new Error('Failed to save task');
  },

  async deleteTask(key: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/task?key=${encodeURIComponent(key)}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error('Failed to delete task');
  },
};
